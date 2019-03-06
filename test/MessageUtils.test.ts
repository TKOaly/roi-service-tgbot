import { expect } from "chai";
import "mocha";
import {
  canApply,
  generateJob,
  generateMessage,
  jobTitle,
  jobUrl,
} from "../src/MessageUtils";
import { Job } from "../src/models/Models";

const job1: Job = {
  id: 1,
  company: {
    id: 1,
    name: "Test company",
    logo: "test_company.png",
    sponsored: true,
    website: "example.com",
    created_at: "2019-01-01 12:00:00",
    updated_at: "2019-01-01 12:00:01",
  },
  description: "Job desc",
  title: "Job title",
  url: "example.com/job_1",
  begin: "2019-01-01 12:00:00",
  created_at: "2019-01-01 12:00:00",
  end: null,
  tags: [
    {
      id: 1,
      created_at: "2019-01-01 12:00:00",
      name: "frontend",
      updated_at: "2019-01-01 12:00:00",
    },
  ],
};

const job2: Job = {
  id: 22,
  company: {
    id: 1,
    name: "Test company 2",
    logo: "test_company.png",
    sponsored: true,
    website: "example.com",
    created_at: "2019-01-01 12:00:00",
    updated_at: "2019-01-01 12:00:01",
  },
  description: "Job desc",
  title: "Job title",
  url: "example.com/job_2",
  begin: "2019-01-01 12:00:00",
  created_at: "2019-01-01 12:00:00",
  end: "2019-01-27 12:00:00",
  tags: [
    {
      id: 1,
      created_at: "2019-01-01 12:00:00",
      name: "frontend",
      updated_at: "2019-01-01 12:00:00",
    },
  ],
};

describe("MessageUtils", () => {
  describe("jobTitle()", () => {
    it("Formats title correctly (bold)", (done) => {
      const title = jobTitle(job1, true);
      expect(title).to.equal("*Test company - Job title*");
      done();
    });
    it("Formats title correctly (non-bold) #1", (done) => {
      const title = jobTitle(job1, false);
      expect(title).to.equal("Test company - Job title");
      done();
    });
    it("Formats title correctly (non-bold) #2", (done) => {
      const title = jobTitle(job1);
      expect(title).to.equal("Test company - Job title");
      done();
    });
  });
  describe("canApply()", () => {
    it("Formats 'can apply' correctly", (done) => {
      const apply = canApply(job1);
      expect(apply).to.equal("Applications accepted until further notice");
      done();
    });
    it("Formats 'can apply' correctly", (done) => {
      const apply = canApply(job2);
      expect(apply).to.equal("Apply before 2019-01-27 12:00:00");
      done();
    });
  });
  describe("jobUrl()", () => {
    it("Formats URL correctly", (done) => {
      const urli = jobUrl(job1);
      expect(urli).to.equal("https://jobs.tko-aly.fi/jobs/1");
      done();
    });
  });
  describe("generateMessage()", () => {
    it("Generates Job listing correctly", (done) => {
      const msg = generateMessage([job1, job2]);
      expect(msg).to.equal(
        "*New jobs:*" +
          "\r\n" +
          "\r\n" +
          "*Test company - Job title*" +
          "\r\n" +
          "Applications accepted until further notice" +
          "\r\n" +
          "https://jobs.tko-aly.fi/jobs/1" +
          "\r\n" +
          "\r\n" +
          "*Test company 2 - Job title*" +
          "\r\n" +
          "Apply before 2019-01-27 12:00:00" +
          "\r\n" +
          "https://jobs.tko-aly.fi/jobs/22" +
          "\r\n",
      );
      done();
    });
  });
  describe("generateJob()", () => {
    it("Generates job correctly (no end date)", (done) => {
      const job = generateJob(55);
      expect(job).to.eql({
        id: 55,
        company: {
          id: 1,
          name: "Test company",
          logo: "test_company.png",
          sponsored: true,
          website: "example.com",
          created_at: "2019-01-01 13:00:00",
          updated_at: "2019-01-01 13:00:00",
        },
        description: "Job desc",
        title: "Test job " + 55,
        url: "example.com/job_" + 55,
        begin: "2019-01-01 13:00:00",
        created_at: "2019-01-01 13:00:00",
        end: null,
        tags: [
          {
            id: 1,
            created_at: "2019-01-01 13:00:00",
            name: "devops",
            updated_at: "2019-01-01 13:00:00",
          },
        ],
      });
      done();
    });
    it("Generates job correctly (end date set)", (done) => {
      const job = generateJob(55, true);
      expect(job).to.eql({
        id: 55,
        company: {
          id: 1,
          name: "Test company",
          logo: "test_company.png",
          sponsored: true,
          website: "example.com",
          created_at: "2019-01-01 13:00:00",
          updated_at: "2019-01-01 13:00:00",
        },
        description: "Job desc",
        title: "Test job " + 55,
        url: "example.com/job_" + 55,
        begin: "2019-01-01 13:00:00",
        created_at: "2019-01-01 13:00:00",
        end: "2019-01-27 13:00:00",
        tags: [
          {
            id: 1,
            created_at: "2019-01-01 13:00:00",
            name: "devops",
            updated_at: "2019-01-01 13:00:00",
          },
        ],
      });
      done();
    });
  });
});
