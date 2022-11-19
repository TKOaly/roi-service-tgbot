# roi-service-tgbot

## Introduction

A Telegram bot to broadcast Jobs service notifications

## Installation

1. Clone the repo
2. Run `npm install` to install project dependencies
3. Copy `.env.example` to `.env` and set `TELEGRAM_API_KEY`, `JOBS_BACKEND_URL` and `CHAT_IDS_JSON` environment variables. `CHAT_IDS_JSON` is where the bot will broadcast the job announcements, and the bot must already be on those channels.
4. Run `npm start` to start the Telegram Bot

This project has been tested with TypeScript `3.7.2` and Node.js `v18.12.1`.

## Log files

This Telegram bot saves logging information to two kinds of files: `error.log` and `combined.log`.
