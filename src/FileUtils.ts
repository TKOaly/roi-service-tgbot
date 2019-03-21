import fs from "fs";
import { promisify } from "util";
import { getJobs } from "./services/JobService";

import _ from "lodash";
import moment from "moment";
import { logger } from "./Logger";
import { Job } from "./models/Models";
import { isJob, isString } from "./Validators";

export const writeFileAsync = promisify(fs.writeFile);
export const readFileAsync = promisify(fs.readFile);
export const fileExistsAsync = promisify(fs.exists);

export const getChatIds = async (chatFile: string) => {
  const chatIds = await readFileAsync(chatFile);
  const rawChatIds = JSON.parse(chatIds.toString());
  return parseChatIds(rawChatIds);
};

export const parseChatIds = (data: any) => {
  if (!Array.isArray(data)) {
    return [];
  }
  if (!data.every(isString)) {
    return [];
  }
  return Array.from<string>(data);
};

/**
 * Fetches job data from the API, then returns those job postings that have been created last week
 * @param jobFilePath Job file location
 */
export const getNewJobPostings = async (momentInstance: moment.Moment) => {
  // Fetch jobs from the back-end
  const jobs = await getJobs();
  if (!jobs.every(isJob)) {
    logger.error(
      "getNewJobPostings(): Malformed jobs returned from the back-end",
    );
    return [];
  }
  // Get the time that was one week ago
  const weekBefore = momentInstance.subtract(1, "week");
  // Filter out jobs that were added last week
  const filtered = getJobsFromWeek(jobs, weekBefore);
  return filtered;
};

export const getJobsFromWeek = (jobs: Job[], time: moment.Moment) => {
  const start = moment(time.toISOString()).startOf("isoWeek");
  const end = moment(time.toISOString()).endOf("isoWeek");
  const filteredJobs = jobs.filter((job) => {
    const jobTime = moment(job.created_at);
    return jobTime.isAfter(start) && jobTime.isBefore(end);
  });
  return [...filteredJobs];
};
