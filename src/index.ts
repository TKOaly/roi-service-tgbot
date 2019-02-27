import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";
import {
  chatIdFile,
  fileExistsAsync,
  jobFile,
  readChatIds,
  writeFileAsync,
} from "./FileUtils";
import { logger } from "./Logger";
import { getJobs } from "./services/JobService";

if (!process.env.TELEGRAM_API_KEY) {
  throw new Error("Please define a Telegram API key.");
}

const app = async (telegramApiKey: string) => {
  try {
    // Sync jobs.json
    logger.info("Fetching jobs", {
      jobs_backend_url: process.env.JOBS_BACKEND_URL,
    });
    const jobs = await getJobs();
    logger.info("Fetched jobs", {
      jobs_backend_url: process.env.JOBS_BACKEND_URL,
    });
    logger.info("Writing jobs to file", { jobFile });
    await writeFileAsync(jobFile, JSON.stringify(jobs));
    logger.info("Wrote jobs to file", { jobFile });

    logger.info("Starting Telegram bot instance");
    const bot = new TelegramBot(telegramApiKey, {
      polling: true,
    });

    bot.onText(/^\/chatId$/, (msg, match) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "Your ChatID is: " + chatId);
    });

    const exists = await fileExistsAsync(chatIdFile);
    if (!exists) {
      logger.warn("Chat ID file does not exist", { chatIdFile });
    } else {
      logger.info("Starting Chat ID check interval");
      setInterval(async () => {
        logger.info("Reading chat IDs to broadcast");
        const chatIds = await readChatIds();
        if (chatIds.length > 0) {
          await Promise.all(
            chatIds.map((chatId) => {
              logger.info("Sending job info to chat", { chatId });
              return bot.sendMessage(chatId, "Hello world");
            }),
          );
        }
      }, 20000);
    }
  } catch (err) {
    logger.error(err.toString());
  }
};

app(process.env.TELEGRAM_API_KEY);
