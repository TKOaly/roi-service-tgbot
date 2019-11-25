import customAxios from '../CustomAxios';
import { Job } from '../models/Models';

/**
 * Returns all jobs from the back-end.
 */
const getJobs = async () => {
    const jobs = await customAxios.withoutToken().get<Job[]>('jobs.json');
    return jobs.data;
};

export { getJobs };
