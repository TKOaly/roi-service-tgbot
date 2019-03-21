import moment from "moment";
import "moment/locale/fi";
import url from "url";
import { Job } from "./models/Models";

/**
 * Generates a formatted job message.
 * @param jobs Job array
 * @param currentDate Current date. Parses the date and adds the time range to the title
 */
export const generateMessage = (jobs: Job[], currentDate: moment.Moment) => {
  let str = "";
  str += `New career opportunities on the job board!\r\n`;
  jobs.forEach((job) => {
    str += `\r\n${jobTitle(job, true)}\r\n${publishedDate(
      job.created_at,
    )}\r\n${canApply(job, currentDate)}\r\n${jobUrl(job)}\r\n`;
  });
  return str;
};

export const canApply = (job: Job, currentDate: moment.Moment) =>
  job.end !== null
    ? `Applications accepted until: ${moment(job.end).format(
        "DD.MM.YYYY HH:mm:ss",
      )} (${getDeadline(moment(job.end), currentDate)})`
    : "Applications accepted until further notice";

/**
 * Returns the deadline as a formatted string for a Job.
 * @param jobDeadline Job deadline
 * @param currentDate Current date
 */
export const getDeadline = (
  jobDeadline: moment.Moment,
  currentDate: moment.Moment,
) => {
  const left = moment.duration(moment(jobDeadline).diff(currentDate)).asDays();
  // Today
  if (
    currentDate.isSame(jobDeadline, "day") &&
    currentDate.isSame(jobDeadline, "month") &&
    currentDate.isSame(jobDeadline, "year") &&
    left <= 1
  ) {
    return "Deadline today";
  }
  // Tomorrow
  if (
    !currentDate.isSame(jobDeadline, "day") &&
    currentDate.get("days") + 1 === jobDeadline.get("days") &&
    currentDate.isSame(jobDeadline, "month") &&
    currentDate.isSame(jobDeadline, "year")
  ) {
    return "Deadline tomorrow";
  }
  return `${Math.floor(left)} day(s) remaining`;
};

/**
 * Returns the Job board URL of the job.
 * @param job Job
 */
export const jobUrl = (job: Job) =>
  url.resolve("https://jobs.tko-aly.fi/", ["jobs", Number(job.id)].join("/"));

/**
 * Returns the Job title
 * @param job Job
 * @param bold Title in bold
 */
export const jobTitle = (job: Job, bold?: boolean) =>
  bold && bold === true
    ? `*${job.company.name}: ${job.title}*`
    : `${job.company.name}: ${job.title}`;

/**
 * Returns a formatted string of the job publishing date.
 * @param jobCreatedAt Job creation date
 */
export const publishedDate = (jobCreatedAt: string) =>
  `Published on: ${moment(jobCreatedAt).format("DD.MM.YYYY HH:mm:ss")}`;

/**
 * Generates a job.
 * @param id Job ID
 * @param localDate Current date
 * @param end Ending date
 */
export const generateJob = (
  id: number,
  localDate: string,
  end?: string,
): Job => ({
  id,
  company: {
    id: 1,
    name: "Test company",
    logo: "test_company.png",
    sponsored: true,
    website: "example.com",
    created_at: localDate,
    updated_at: localDate,
  },
  description: "Job desc",
  title: "Test job " + id,
  url: "example.com/job_" + id,
  begin: localDate,
  created_at: localDate,
  end:
    end && end !== undefined ? moment(end).format("YYYY-MM-DD HH:mm:ss") : null,
  tags: [
    {
      id: 1,
      created_at: localDate,
      name: "devops",
      updated_at: localDate,
    },
  ],
});
