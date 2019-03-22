import fs from "fs";
import { promisify } from "util";
import { getJobs } from "./services/JobService";

import _ from "lodash";
import moment from "moment";
import { logger } from "./Logger";
import { Job } from "./models/Models";
import { isJob, isString } from "./Validators";

/**
 * Writes a file asynchronously. Wrapped into a promise.
 */
export const writeFileAsync = promisify(fs.writeFile);
/**
 * Reads a file asynchronously. Wrapped into a promise.
 */
export const readFileAsync = promisify(fs.readFile);
/**
 *  Checks if a file exists asynchronously. Wrapped into a promise.
 */
export const fileExistsAsync = promisify(fs.exists);

/**
 * Returns Chat IDs.
 * @param chatIdFile Chat ID file
 */
export const getChatIds = async (chatIdFile: string) => {
  const fileChatIds = await readFileAsync(chatIdFile);
  const rawChatIds = JSON.parse(fileChatIds.toString());
  return parseChatIds(rawChatIds);
};

/**
 * Parses Chat IDs.
 * @param chatIdArray Chat ID array
 */
export const parseChatIds = (chatIdArray: any) => {
  if (!Array.isArray(chatIdArray)) {
    return [];
  }
  if (!chatIdArray.every(isString)) {
    return [];
  }
  return Array.from<string>(chatIdArray);
};

/**
 * Fetches job data from the API, then returns those job postings that have been created last week
 * @param date Moment instance
 */
export const getNewJobPostings = async (date: moment.Moment) => {
  // Fetch jobs from the back-end
  const jobs = await getJobs();
  if (!jobs.every(isJob)) {
    logger.error(
      "getNewJobPostings(): Malformed jobs returned from the back-end",
    );
    return [];
  }
  // Get the time that was one week ago
  const weekBefore = date.subtract(1, "week");
  // Filter out jobs that were added last week
  const filtered = getJobsFromWeek(jobs, weekBefore);
  return filtered;
};

/**
 * Returns jobs from the current week.
 * @param jobs Jobs array
 * @param date Date
 */
export const getJobsFromWeek = (jobs: Job[], date: moment.Moment) => {
  const start = moment(date.toISOString()).startOf("isoWeek");
  const end = moment(date.toISOString()).endOf("isoWeek");
  logger.info(
    `getJobsFromWeek(): Checking for new jobs between ${start.toISOString()} - ${end.toISOString()}`,
  );
  // Filters out the jobs that are not between the thresholds
  const filteredJobs = jobs.filter((job) => {
    const jobCreationTime = moment(job.created_at);
    const between =
      jobCreationTime.isAfter(start) && jobCreationTime.isBefore(end);
    return between;
  });
  const availableJobs = removeExpiredJobs([...filteredJobs], moment(date));
  return availableJobs;
};

/**
 * Sorts the job array.
 * Case a)
 * If both jobs have a deadline, sort them in an ascending order by the deadline.
 * Case b)
 * If both jobs do not have an ending date, sort them in an ascending order by the creation date.
 * Case c)
 * Otherwise, always sort the job last that has no ending date
 * @param jobA Job A
 * @param jobB Job B
 */
export const sortJobs = (jobA: Job, jobB: Job) => {
  // If both jobs have an ending date, sort them by its value
  if (jobA.end !== null && jobB.end !== null) {
    const jobAApplyDeadline = moment(jobA.end);
    const jobBApplyDeadline = moment(jobB.end);
    if (jobAApplyDeadline.isBefore(jobBApplyDeadline)) {
      return -1;
    } else if (jobBApplyDeadline.isBefore(jobAApplyDeadline)) {
      return 1;
    } else {
      return 0;
    }
  } else if (jobA.end === null && jobB.end === null) {
    // If both jobs don't have an end date set, sort the jobs by their creation date
    const aCreationDate = moment(jobA.created_at);
    const bCreationDate = moment(jobB.created_at);
    if (aCreationDate.isBefore(bCreationDate)) {
      return -1;
    } else if (bCreationDate.isBefore(aCreationDate)) {
      return 1;
    } else {
      return 0;
    }
  } else if (jobA.end === null && jobB.end !== null) {
    // Always sort the job last where there is no ending date
    return 1;
  } else if (jobA.end !== null && jobB.end === null) {
    // Always sort the job last where there is no ending date
    return -1;
  }
  return 0;
};

/**
 * Removes expired jobs.
 * @param jobs Job array
 * @param applyDeadline Job apply deadline
 */
export const removeExpiredJobs = (
  jobs: Job[],
  applyDeadline: moment.Moment,
) => [
  ...jobs.filter((job) => {
    // If no ending date is set, return as default
    if (job.end === null) {
      return true;
    }
    // If the ending date is same or before the current date, filter the job out
    if (moment(job.end).isSameOrBefore(applyDeadline)) {
      return false;
    }
    // In other cases, return as default
    return true;
  }),
];
