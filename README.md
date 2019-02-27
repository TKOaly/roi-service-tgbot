# roi-service-tgbot

## Introduction

A Telegram bot to broadcast Jobs service notifications

## Installation

1. Clone the repo
2. Run `npm install` to install project dependencies
3. Copy `.env.example` to `.env` and set `TELEGRAM_API_KEY` and `JOBS_BACKEND_URL` environment variables
4. Copy `src/data/chats.template.json` to `src/data/chats.json` and set your Chat ID that the bot will broadcast new jobs
5. Run `npm start` to start the Telegram Bot

This project has been tested with TypeScript `3.3.3333` and Node.js `v10.1.0`.

## Log files

This Telegram bot saves logging information to two kinds of files: `error.log` and `combined.log`.
