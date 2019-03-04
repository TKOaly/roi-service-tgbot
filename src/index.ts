import dotenv from "dotenv";
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

if (!process.env.TELEGRAM_API_KEY) {
  throw new Error("Please define a Telegram API key.");
}

const app = async (telegramApiKey: string) => {
  try {
    // Sync jobs.json
    await fetchNewJobPostings(jobFile);

    logger.info("app(): Starting Telegram bot instance");
    const bot = new TelegramBot(telegramApiKey, {
      polling: true,
    });

    bot.onText(/^\/chatId$/, (msg, match) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "Your ChatID is: " + chatId);
    });

    const exists = await fileExistsAsync(chatIdFile);
    if (!exists) {
      logger.warn("app(): Chat ID file does not exist", { chatIdFile });
    } else {
      logger.info("app(): Starting Chat ID check interval");
      // Set job check interval
      setInterval(async () => {
        logger.info("app(): Reading chat IDs to broadcast");
        // Checks for updated jobs
        const newJobs = await getNewJobPostings(jobFile);
        // If there are new job postings available
        if (newJobs.length > 0) {
          await Promise.all(
            newJobs.map(async (newJob) => {
              logger.info("app(): Detected new job", {
                title: newJob.title,
                company: newJob.company,
                url: newJob.url,
              });
              const chatIds = await getChatIds(chatIdFile);
              if (chatIds.length > 0) {
                return chatIds.map((chatId) => {
                  logger.info("app(): Sending job info to chat", { chatId });
                  const canApply =
                    newJob.end !== null
                      ? "Apply before " + newJob.end
                      : "Applications accepted until further notice";
                  const jobUrl = "https://jobs.tko-aly.fi/jobs/" + newJob.id;
                  return bot.sendMessage(
                    chatId,
                    `*New job: ${newJob.company.name} - ${
                      newJob.title
                    }*\r\n${canApply}\r\n${jobUrl}`,
                    {
                      parse_mode: "Markdown",
                    },
                  );
                });
              }
            }),
          );
        } else {
          logger.info("app(): No new jobs at the moment.");
        }
        // Fetch new job postings (and save them locally)
        await fetchNewJobPostings(jobFile);
      }, 30000);
    }
  } catch (err) {
    logger.error(err.toString());
  }
};

app(process.env.TELEGRAM_API_KEY);
