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

export const getChatIds = async () => {
  const chatIds = await readFileAsync(chatIdFile);
  const parsedChatIds = JSON.parse(chatIds.toString());
  return Array.isArray(parsedChatIds) ? (parsedChatIds as string[]) : [];
};

export const getNewJobPostings = async () => {
  // Fetch jobs from the back-end
  const jobs = await getJobs();
  // Read the local job file
  const existingJobs = await readFileAsync(jobFile);
  // Do a diff
  const diff = _.differenceWith(
    jobs,
    JSON.parse(existingJobs.toString()),
    _.isEqual,
  );
  return diff;
};

export const fetchNewJobPostings = async () => {
  logger.info("Fetching jobs", {
    jobs_backend_url: process.env.JOBS_BACKEND_URL,
  });
  const jobs = await getJobs();
  logger.info("Fetched jobs", {
    jobs_backend_url: process.env.JOBS_BACKEND_URL,
  });
  logger.info("Writing jobs to file", { jobFile });
  await writeFileAsync(jobFile, JSON.stringify(jobs));
  logger.info("Wrote jobs to file", { jobFile });
};
