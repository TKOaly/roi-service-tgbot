import moment from 'moment';
import { logger } from './Logger';
import { Job } from './models/Models';
import { getJobs } from './services/JobService';
import { isJob, isString } from './Validators';

/**
 * Parses Chat IDs.
 * @param chatIdArray Chat ID array
 */
export const parseChatIds = (chatIdString: string | undefined) => {
  if (!chatIdString) {
    return [];
  }
  const chatIdArray = JSON.parse(chatIdString);
  if (!Array.isArray(chatIdArray)) {
    return [];
  }
  if (!chatIdArray.every(isString)) {
    return [];
  }
  return Array.from<string>(chatIdArray);
};

/**
 * Removes expired jobs.
 * @param jobs Job array
 * @param applyDeadline Job apply deadline
 */
export const removeExpiredJobs = (jobs: Job[], applyDeadline: moment.Moment) => [
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

/**
 * Returns jobs from the current week.
 * @param jobs Jobs array
 * @param date Date
 */
export const getJobsAddedBetween = (jobs: Job[], rangeBegin: moment.Moment, rangeEnd: moment.Moment) => {
  logger.info(
    `getJobsAddedBetween(): Checking for new jobs between ${rangeBegin.toISOString()} - ${rangeEnd.toISOString()}`,
  );

  // Filters out the jobs that are not between the thresholds
  const filteredJobs = jobs.filter((job) => {
    const jobCreationTime = moment(job.created_at);

    return jobCreationTime.isAfter(rangeBegin) && jobCreationTime.isBefore(rangeEnd);
  });

  return filteredJobs;
};

/**
 * Fetches job data from the API, then returns those job postings that have been created last week
 * @param date Moment instance
 */
export const getNewJobPostings = async (date: moment.Moment) => {
  // Fetch jobs from the back-end
  const jobs = await getJobs();
  if (!jobs.every(isJob)) {
    logger.error('getNewJobPostings(): Malformed jobs returned from the back-end');
    return [];
  }
  // Get the time that was one day before
  const dayBefore = date.clone().subtract(1, 'days');

  // Get only the jobs added during the last 24 hours
  const addedSinceYesterday = getJobsAddedBetween(jobs, dayBefore, date);

  // Filter out postings past their deadline
  const ongoing = removeExpiredJobs([...addedSinceYesterday], date);

  return ongoing;
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
