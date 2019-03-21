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
  str += `New jobs that have been added between *${moment(currentDate)
    .subtract("1", "week")
    .startOf("isoWeek")
    .format("YYYY-MM-DD HH:mm:ss")}* and *${moment(currentDate)
    .subtract("1", "week")
    .endOf("isoWeek")
    .format("YYYY-MM-DD HH:mm:ss")}*\r\n`;
  jobs.forEach((job) => {
    str += `\r\n${jobTitle(job, true)}\r\n${publishedDate(
      job.created_at,
    )}\r\n${canApply(job)}\r\n${jobUrl(job)}\r\n`;
  });
  return str;
};

export const canApply = (job: Job) =>
  job.end !== null
    ? "Apply before: " + moment(job.end).format("YYYY-MM-DD HH:mm:ss")
    : "Applications accepted until further notice";

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
