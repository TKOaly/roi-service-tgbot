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

export const canApply = (job: Job, momentInstance: moment.Moment) =>
  job.end !== null
    ? `Apply before: ${moment(job.end).format(
        "YYYY-MM-DD HH:mm:ss",
      )} (${daysLeft(job.end, momentInstance)} day(s) left)`
    : "Applications accepted until further notice";

export const daysLeft = (date: string, momentInstance: moment.Moment, precision = 1) =>
  moment
    .duration(moment(date).diff(momentInstance))
    .asDays()
    .toFixed(precision);

export const jobUrl = (job: Job) =>
  url.resolve("https://jobs.tko-aly.fi/", ["jobs", Number(job.id)].join("/"));

export const jobTitle = (job: Job, bold?: boolean) =>
  bold && bold === true
    ? `*${job.company.name} - ${job.title}*`
    : `${job.company.name} - ${job.title}`;

export const publishedDate = (time: string) =>
  `Published on: ${moment(time).format("YYYY-MM-DD HH:mm:ss")}`;

export const generateJob = (
  id: number,
  localDate: string,
  end?: boolean,
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
    end && Boolean(end) === true
      ? moment(localDate)
          .add(2, "weeks")
          .format("YYYY-MM-DD HH:mm:ss")
      : null,
  tags: [
    {
      id: 1,
      created_at: localDate,
      name: "devops",
      updated_at: localDate,
    },
  ],
});
