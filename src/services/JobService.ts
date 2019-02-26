import customAxios from "../CustomAxios";
import { Job } from "../models/Models";

const getJobs = async () => {
  const jobs = await customAxios.withoutToken().get<Job[]>("jobs.json");
  return jobs.data;
};

export { getJobs };
