process.env.NODE_ENV = 'test';
import 'moment/locale/fi';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { expect } from 'chai';
import fs from 'fs';
import 'mocha';
import moment from 'moment';
import { getJobsAddedBetween, getNewJobPostings, parseChatIds, sortJobs } from '../src/Utils';
import { generateJob } from '../src/MessageUtils';
import { jobsApi, jobsApiByWeek, jobsApiNewJobs } from './JobData';

/**
 * Deletes a file if found on disk.
 * @param fileName Filename
 */
const setupWrite = (fileName: fs.PathLike) => {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
};

describe('FileUtils', () => {
  describe('parseChatIds()', () => {
    it("Parses Chat ID's correctly #1", async () => {
      const chatIds = parseChatIds('["12345", "67890"]');
      expect(chatIds).to.eql(['12345', '67890']);
    });
    it("Parses Chat ID's correctly #1", async () => {
      const chatIds = parseChatIds('12345');
      expect(chatIds).to.eql([]);
    });
    it("Parses Chat ID's correctly #3", async () => {
      const chatIds = parseChatIds('[1, 2, 3, 4, 5]');
      expect(chatIds).to.eql([]);
    });
  });
  describe('getNewJobPostings()', () => {
    it('Fetches job data from the API, then filters the new jobs correctly.', async () => {
      const mock = new MockAdapter(axios);
      // Mock API endpoint
      mock.onGet('jobs.json').reply(200, jobsApi);
      // Get new job postings between 2019-03-13 04:00:00 and 2019-03-14 04:00:00 (Yesterday's all new job postings)
      const difference = await getNewJobPostings(moment('2019-03-14 04:00:00'));
      expect(difference).to.eql([...jobsApiNewJobs]);
    });
    it('Returns an empty array if malformed jobs are returned from the backend', async () => {
      const mock = new MockAdapter(axios);
      // Mock API endpoint
      mock.onGet('jobs.json').reply(200, JSON.stringify([{ id: 1 }, { id: 2 }]));
      /// Get new job postings between 2019-03-11 00:00:00 and 2019-03-17 23:59:59 (Last week's all new job postings)
      const difference = await getNewJobPostings(moment('2019-03-18 04:00:00'));
      expect(difference).to.eql([]);
    });
  });

  describe('getJobsAddedBetween()', () => {
    it('Returns new jobs from last week #1', (done) => {
      const week = moment('2019-03-11 04:00:00');
      const difference = getJobsAddedBetween(jobsApi, week.clone().startOf('isoWeek'), week.endOf('isoWeek'));
      // This should return 3 jobs
      expect(difference).to.eql([...jobsApiByWeek]);
      done();
    });
    it('Returns new jobs from last week #2', (done) => {
      const week = moment('2019-02-26 04:00:00');
      const difference = getJobsAddedBetween(jobsApi, week.clone().startOf('isoWeek'), week.endOf('isoWeek'));
      // This should return one job from 2019-03-02
      expect(difference).to.eql([generateJob(1, '2019-03-02 12:00:00', '2019-03-02 12:00:00')]);
      done();
    });
  });

  describe('sortJobs()', () => {
    it('Sorts jobs correctly', async () => {
      const momentInstance = moment('2019-03-21 21:22:20');
      const jobs = [
        // Deadline in 26 hours
        generateJob(3, moment(momentInstance).toISOString(), moment(momentInstance).add('26', 'hours').toISOString()),
        // Deadline in 22 hours
        generateJob(4, moment(momentInstance).toISOString(), moment(momentInstance).add('22', 'hours').toISOString()),
        // Deadline in 12 hours
        generateJob(2, moment(momentInstance).toISOString(), moment(momentInstance).add('12', 'hours').toISOString()),
        // Deadline in 3 days
        generateJob(5, moment(momentInstance).toISOString(), moment(momentInstance).add('3', 'days').toISOString()),
        // Deadline not set
        generateJob(6, moment(momentInstance).toISOString()),
        // Deadline in 12 minutes
        generateJob(1, moment(momentInstance).toISOString(), moment(momentInstance).add('12', 'minutes').toISOString()),
      ];
      const expected = [
        // Deadline in 12 minutes
        generateJob(1, moment(momentInstance).toISOString(), moment(momentInstance).add('12', 'minutes').toISOString()),
        // Deadline in 12 hours
        generateJob(2, moment(momentInstance).toISOString(), moment(momentInstance).add('12', 'hours').toISOString()),
        // Deadline in 22 hours
        generateJob(4, moment(momentInstance).toISOString(), moment(momentInstance).add('22', 'hours').toISOString()),
        // Deadline in 26 hours
        generateJob(3, moment(momentInstance).toISOString(), moment(momentInstance).add('26', 'hours').toISOString()),
        // Deadline in 3 days
        generateJob(5, moment(momentInstance).toISOString(), moment(momentInstance).add('3', 'days').toISOString()),
        // Deadline not set
        generateJob(6, moment(momentInstance).toISOString()),
      ];
      expect([...jobs.sort(sortJobs)]).to.eql([...expected]);
    });
  });
});
