import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import TelegramBot from "node-telegram-bot-api";

const jobFile = "jobs.json";

const bot = new TelegramBot(process.env.API_TOKEN, { polling: true });
