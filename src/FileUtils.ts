import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { getJobs } from "./services/JobService";

import _ from "lodash";
import { logger } from "./logger";

export const jobFile = join("src", "data", "jobs.json");
export const chatIdFile = join("src", "data", "chats.json");

export const writeFileAsync = promisify(fs.writeFile);
export const readFileAsync = promisify(fs.readFile);
export const fileExistsAsync = promisify(fs.exists);

export const getChatIds = async (chatFile: string) => {
  const chatIds = await readFileAsync(chatFile);
  const parsedChatIds = JSON.parse(chatIds.toString());
  if (!Array.isArray(parsedChatIds)) {
    return [];
  }

  if (!parsedChatIds.every(isString)) {
    return [];
  }
  return Array.from<string>(parsedChatIds);
};

export const getNewJobPostings = async (path: string) => {
  // Fetch jobs from the back-end
  const jobs = await getJobs();
  // Read the local job file
  const existingJobs = await readFileAsync(path);
  // Do a diff
  const diff = _.differenceWith(
    jobs,
    JSON.parse(existingJobs.toString()),
    _.isEqual,
  );
  return diff;
};

export const fetchNewJobPostings = async (outputFile: string) => {
  logger.info("Fetching jobs", {
    jobs_backend_url: process.env.JOBS_BACKEND_URL,
  });
  const jobs = await getJobs();
  logger.info("Fetched jobs", {
    jobs_backend_url: process.env.JOBS_BACKEND_URL,
  });
  logger.info("Writing jobs to file", { outputFile });
  await writeFileAsync(outputFile, JSON.stringify(jobs));
  logger.info("Wrote jobs to file", { outputFile });
};
