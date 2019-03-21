import moment from "moment";
import url from "url";
import { Job } from "./models/Models";

/**
 * Generates a formatted job message.
 * @param jobs Job array
 */
export const generateMessage = (jobs: Job[]) => {
  let str = "";
  str += "*New jobs:*\r\n";
  jobs.forEach((job) => {
    str += `\r\n${jobTitle(job, true)}\r\n${canApply(job)}\r\n${jobUrl(
      job,
    )}\r\n`;
  });
  return str;
};

export const canApply = (job: Job) =>
  job.end !== null
    ? "Apply before " + job.end
    : "Applications accepted until further notice";

export const jobUrl = (job: Job) =>
  url.resolve("https://jobs.tko-aly.fi/", ["jobs", Number(job.id)].join("/"));

export const jobTitle = (job: Job, bold?: boolean) =>
  bold && bold === true
    ? `*${job.company.name} - ${job.title}*`
    : `${job.company.name} - ${job.title}`;

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
