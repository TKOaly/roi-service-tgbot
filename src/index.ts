import dotenv from "dotenv";
import cron from "node-cron";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";
import {
  chatIdFile,
  fetchNewJobPostings,
  fileExistsAsync,
  getChatIds,
  getNewJobPostings,
  jobFile,
} from "./FileUtils";
import { logger } from "./Logger";
import { generateJob, generateMessage } from "./MessageUtils";

if (!process.env.TELEGRAM_API_KEY) {
  throw new Error("Please define a Telegram API key.");
}

const everyMonday = "0 12 * * MON";
const everyMinute = "* * * * *";

const app = async (telegramApiKey: string) => {
  logger.info("app(): Starting Telegram bot", {
    NODE_ENV: process.env.NODE_ENV,
  });
  try {
    // Sync jobs.json
    await fetchNewJobPostings(jobFile);
    const bot = new TelegramBot(telegramApiKey, {
      polling: true,
    });

    // Returns the Chat ID of the user.
    bot.onText(/^\/getchatid$/, (msg, match) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "Your ChatID is: " + chatId);
    });

    // For debugging
    if (process.env.NODE_ENV === "development") {
      // Sends a test broadcast
      bot.onText(/^\/testbroadcast$/, (msg, match) => {
        const chatId = msg.chat.id;
        bot.sendMessage(
          chatId,
          generateMessage([generateJob(1, true), generateJob(2)]),
          {
            parse_mode: "Markdown",
          },
        );
      });
    }

    const exists = await fileExistsAsync(chatIdFile);
    if (!exists) {
      logger.warn("app(): Chat ID file does not exist", { chatIdFile });
    } else {
      logger.info("app(): Starting Chat ID check interval");
      const expression =
        process.env.NODE_ENV === "production" ? everyMonday : everyMinute;
      logger.info("app(): Setting Cronjob expression", { expression });
      // Set job check interval (jobCron is asynchronous)
      cron.schedule(expression, async () => await scheduledTask(bot));
    }
  } catch (err) {
    logger.error(err.toString());
  }
};

const scheduledTask = async (bot: TelegramBot) => {
  logger.info("scheduledTask(): Starting");
  // Checks for updated jobs
  const newJobs = await getNewJobPostings(jobFile);
  // If there are new job postings available
  if (newJobs.length > 0) {
    // Get available Chat IDs
    logger.info("scheduledTask(): Reading chat IDs to broadcast");
    const chatIds = await getChatIds(chatIdFile);
    // If there are chats that are configured, map them through
    if (chatIds.length > 0) {
      logger.info(`scheduledTask(): Detected ${newJobs.length} new jobs`);
      // Broadcast new jobs to every chat that has been configured in the chats.json
      await Promise.all(
        chatIds.map((chatId) => {
          logger.info("scheduledTask(): Sending job info to chat", { chatId });
          return bot.sendMessage(chatId, generateMessage(newJobs), {
            parse_mode: "Markdown",
          });
        }),
      );
    }
  } else {
    logger.info("scheduledTask(): No new jobs at the moment.");
  }
  // Fetch new job postings (and save them locally)
  await fetchNewJobPostings(jobFile);
};

app(process.env.TELEGRAM_API_KEY);
