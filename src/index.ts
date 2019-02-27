import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";
import {
  chatIdFile,
  fetchNewJobPostings,
  fileExistsAsync,
  getChatIds,
  getNewJobPostings,
} from "./FileUtils";
import { logger } from "./Logger";

if (!process.env.TELEGRAM_API_KEY) {
  throw new Error("Please define a Telegram API key.");
}

const app = async (telegramApiKey: string) => {
  try {
    // Sync jobs.json
    await fetchNewJobPostings();

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
      // Set job check interval
      setInterval(async () => {
        logger.info("Reading chat IDs to broadcast");
        // Checks for updated jobs
        const newJobs = await getNewJobPostings();
        // If there are new job postings available
        if (newJobs.length > 0) {
          await Promise.all(
            newJobs.map(async (newJob) => {
              logger.info("Detected new job", {
                title: newJob.title,
                company: newJob.company,
                url: newJob.url,
              });
              const chatIds = await getChatIds();
              if (chatIds.length > 0) {
                return chatIds.map((chatId) => {
                  logger.info("Sending job info to chat", { chatId });
                  return bot.sendMessage(
                    chatId,
                    `*New job: ${newJob.company} - ${
                      newJob.title
                    }*\r\nApply before ${newJob.end}`,
                    {
                      parse_mode: "Markdown",
                    },
                  );
                });
              }
            }),
          );
        } else {
          logger.info("No new jobs at the moment.");
        }
        // Fetch new job postings (and save them locally)
        await fetchNewJobPostings();
      }, 30000);
    }
  } catch (err) {
    logger.error(err.toString());
  }
};

app(process.env.TELEGRAM_API_KEY);
