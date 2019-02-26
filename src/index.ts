import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import TelegramBot from "node-telegram-bot-api";

const jobFile = "jobs.json";

if (!process.env.TELEGRAM_API_KEY) {
  throw new Error("Please define a Telegram API key.");
}

const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });