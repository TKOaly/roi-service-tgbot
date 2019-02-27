import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import TelegramBot from "node-telegram-bot-api";
import { join } from "path";
import { promisify } from "util";
import { logger } from "./Logger";
import { getJobs } from "./services/JobService";

const jobFile = "jobs.json";

if (!process.env.TELEGRAM_API_KEY) {
  throw new Error("Please define a Telegram API key.");
}

const writeFileAsync = promisify(fs.writeFile);

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
    const filepath = join("src", "data", jobFile);
    logger.info("Writing jobs to file", { jobFile: filepath });
    await writeFileAsync(filepath, JSON.stringify(jobs));
    logger.info("Wrote jobs to file", { jobFile: filepath });

    logger.info("Starting Telegram bot instance");
    const bot = new TelegramBot(telegramApiKey, {
      polling: true,
    });
  } catch (err) {
    logger.error(err.toString());
  }
};

app(process.env.TELEGRAM_API_KEY);
