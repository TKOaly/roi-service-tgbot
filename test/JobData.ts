import { generateJob } from "../src/MessageUtils";
import { Job } from "../src/models/Models";

export const jobsApi: Job[] = [
  generateJob(1, "2019-03-02 12:00:00", true),
  generateJob(1, "2019-03-13 12:00:00", true),
  generateJob(2, "2019-03-14 12:00:00", true),
  generateJob(3, "2019-03-15 12:00:00"),
  generateJob(3, "2019-03-20 12:00:00"),
  generateJob(3, "2019-03-21 12:00:00", true),
];

export const jobsApiNewJobs: Job[] = [
  generateJob(1, "2019-03-13 12:00:00", true),
  generateJob(2, "2019-03-14 12:00:00", true),
  generateJob(3, "2019-03-15 12:00:00"),
];
