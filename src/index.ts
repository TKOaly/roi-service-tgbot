import dotenv from 'dotenv';
import cron from 'node-cron';

import moment from 'moment';
import 'moment/locale/fi';

import TelegramBot from 'node-telegram-bot-api';
import { parseChatIds, getNewJobPostings, sortJobs } from './Utils';
import { logger } from './Logger';
import { generateJob, generateMessage } from './MessageUtils';
dotenv.config();

if (!process.env.TELEGRAM_API_KEY) {
    throw new Error('Please define a Telegram API key.');
}

if (!process.env.CHAT_IDS_JSON) {
    throw new Error('Please define CHAT_IDS_JSON');
}

const everyNoon = '0 12 * * *';
const everyMinute = '* * * * *';

const scheduledTask = async (bot: TelegramBot) => {
    logger.info('scheduledTask(): Starting');
    // Checks for updated jobs
    const newJobs = await getNewJobPostings(moment());
    // If there are new job postings available
    if (newJobs.length > 0) {
        // Get available Chat IDs
        logger.info('scheduledTask(): Reading chat IDs to broadcast');
        const chatIds = parseChatIds(process.env.CHAT_IDS_JSON);
        const currentDate = moment();
        // If there are chats that are configured, map them through
        if (chatIds.length > 0) {
            logger.info(`scheduledTask(): Detected ${newJobs.length} new jobs`);
            // Broadcast new jobs to every chat that has been configured in the chats.json
            await Promise.all(
                chatIds.map(chatId => {
                    logger.info('scheduledTask(): Sending job info to chat', { chatId });
                    return bot.sendMessage(chatId, generateMessage(newJobs.sort(sortJobs), currentDate), {
                        parse_mode: 'Markdown',
                    });
                }),
            );
        }
    } else {
        logger.info('scheduledTask(): No new jobs at the moment.');
    }
};

const app = async (telegramApiKey: string) => {
    logger.info('app(): Starting Telegram bot', {
        NODE_ENV: process.env.NODE_ENV,
    });
    try {
        const bot = new TelegramBot(telegramApiKey, {
            polling: true,
        });

        // Returns the Chat ID of the user.
        bot.onText(/^\/getchatid$/, (msg, match) => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, 'Your ChatID is: ' + chatId);
        });

        // For debugging
        if (process.env.NODE_ENV === 'development') {
            // Sends a test broadcast
            bot.onText(/^\/testbroadcast$/, (msg, match) => {
                const chatId = msg.chat.id;
                const jobs = [
                    // Deadline in 26 hours
                    generateJob(
                        3,
                        moment().toISOString(),
                        moment()
                            .add('26', 'hours')
                            .toISOString(),
                    ),
                    // Deadline in 22 hours
                    generateJob(
                        4,
                        moment().toISOString(),
                        moment()
                            .add('22', 'hours')
                            .toISOString(),
                    ),
                    // Deadline in 12 hours
                    generateJob(
                        2,
                        moment().toISOString(),
                        moment()
                            .add('12', 'hours')
                            .toISOString(),
                    ),
                    // Deadline in 22 hours
                    generateJob(
                        5,
                        moment().toISOString(),
                        moment()
                            .add('3', 'days')
                            .toISOString(),
                    ),
                    // Deadline not set
                    generateJob(6, moment().toISOString()),
                    // Deadline in 12 minutes
                    generateJob(
                        1,
                        moment().toISOString(),
                        moment()
                            .add('12', 'minutes')
                            .toISOString(),
                    ),
                ].sort(sortJobs);
                bot.sendMessage(
                    chatId,
                    generateMessage(
                        jobs,
                        // Current date
                        moment(),
                    ),
                    {
                        parse_mode: 'Markdown',
                    },
                );
            });
        }

        logger.info('app(): Starting Chat ID check interval');
        const expression = process.env.NODE_ENV === 'production' ? everyNoon : everyMinute;
        logger.info('app(): Setting Cronjob expression', { expression });
        // Set job check interval (jobCron is asynchronous)
        cron.schedule(expression, async () => await scheduledTask(bot));
    } catch (err) {
        logger.error(err.toString());
    }
};

app(process.env.TELEGRAM_API_KEY);
