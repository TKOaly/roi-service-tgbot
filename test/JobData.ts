import { generateJob } from '../src/MessageUtils';
import { Job } from '../src/models/Models';

export const jobsApi: Job[] = [
    generateJob(1, '2019-03-02 12:00:00', '2019-03-02 12:00:00'),
    generateJob(2, '2019-03-13 12:00:00', '2019-03-13 12:00:00'),
    generateJob(3, '2019-03-14 12:00:00', '2019-03-14 12:00:00'),
    generateJob(4, '2019-03-15 12:00:00'),
    generateJob(5, '2019-03-20 12:00:00'),
    generateJob(6, '2019-03-21 12:00:00', '2019-03-21 12:00:00'),
];

export const jobsApiNewJobs: Job[] = [
    generateJob(2, '2019-03-13 12:00:00', '2019-03-13 12:00:00'),
    generateJob(3, '2019-03-14 12:00:00', '2019-03-14 12:00:00'),
    generateJob(4, '2019-03-15 12:00:00'),
];
