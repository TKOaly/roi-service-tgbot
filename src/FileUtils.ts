import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { getJobs } from "./services/JobService";

export const jobFile = join("src", "data", "jobs.json");
export const chatIdFile = join("src", "data", "chats.json");

export const writeFileAsync = promisify(fs.writeFile);
export const readFileAsync = promisify(fs.readFile);
export const fileExistsAsync = promisify(fs.exists);

export const readChatIds = async () => {
  const chatIds = await readFileAsync(chatIdFile);
  const parsedChatIds = JSON.parse(chatIds.toString());
  return Array.isArray(parsedChatIds) ? (parsedChatIds as string[]) : [];
};

export const hasNewJobPostings = async () => {
  const jobs = await getJobs();
  const existingJobs = await readFileAsync(jobFile);
  // TODO
};
