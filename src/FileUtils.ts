import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { getJobs } from "./services/JobService";

import _ from "lodash";
import { logger } from "./logger";
import { Job } from "./models/Models";
import { isJob, isString } from "./Validators";

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

/**
 * Fetches job data from the API, then compares the returned result with a locally cached version.
 * @param jobFilePath Job file location
 */
export const getNewJobPostings = async (jobFilePath: string) => {
  // Fetch jobs from the back-end
  const jobs = await getJobs();
  if (!jobs.every(isJob)) {
    logger.error(
      "getNewJobPostings(): Malformed jobs returned from the back-end",
    );
    return [];
  }
  // Read the local job file
  const existingJobs = await readFileAsync(jobFilePath);
  const parsed = JSON.parse(existingJobs.toString());
  // Check if the parsed data is an array
  if (!Array.isArray(parsed)) {
    logger.error(
      "getNewJobPostings(): Malformed array returned from the back-end",
    );
    return [];
  }
  // Validate the parsed data to make sure that it matches the API.
  if (!parsed.every(isJob)) {
    logger.error(
      "getNewJobPostings(): Malformed data returned from the back-end",
    );
    return [];
  }
  // Do a diff
  const diff = jobDifference(jobs, parsed);
  return diff;
};

/**
 * Calculates the job difference.
 * @param existingJobs Job set 1
 * @param fetchedJobs Job set 2
 */
export const jobDifference = (existingJobs: Job[], fetchedJobs: Job[]) => {
  // Use Lodash's differenceWith() function to calculate the difference
  const diff = _.differenceWith(existingJobs, fetchedJobs, _.isEqual);
  if (diff.length > 5) {
    logger.warn(
      `jobDifference(): Detected ${
        diff.length
      } changes in the job files - preventing broadcasting those as a spam prevention`,
    );
    return [];
  }
  if (diff.length > 0) {
    logger.info(
      `jobDifference(): Detected new jobs with IDs ${diff
        .map((obj) => obj.id)
        .join(",")}.`,
    );
  }
  return diff;
};

/**
 * Fetches the jobs from the API using HTTP and writes them to a file.
 * @param outputFile Output file to write the new job data.
 */
export const fetchNewJobPostings = async (outputFile: string) => {
  logger.info("fetchNewJobPostings(): Fetching jobs", {
    jobs_backend_url: process.env.JOBS_BACKEND_URL,
  });
  const jobs = await getJobs();
  if (!jobs.every(isJob)) {
    logger.error(
      "fetchNewJobPostings(): Malformed jobs returned from the back-end",
      {
        jobs_backend_url: process.env.JOBS_BACKEND_URL,
      },
    );
    return;
  }
  logger.info("fetchNewJobPostings(): Fetched jobs", {
    jobs_backend_url: process.env.JOBS_BACKEND_URL,
  });
  logger.info("fetchNewJobPostings(): Writing jobs to file", { outputFile });
  await writeFileAsync(outputFile, JSON.stringify(jobs));
  logger.info("fetchNewJobPostings(): Wrote jobs to file", { outputFile });
};
