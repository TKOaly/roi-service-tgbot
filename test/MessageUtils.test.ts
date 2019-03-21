import { expect } from "chai";
import "mocha";
import moment from "moment";
import "moment/locale/fi";
import {
  canApply,
  generateJob,
  generateMessage,
  getDeadline,
  jobTitle,
  jobUrl,
  publishedDate,
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
  end: "2019-02-27 12:00:00",
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
      expect(title).to.equal("*Test company: Job title*");
      done();
    });
    it("Formats title correctly (non-bold) #1", (done) => {
      const title = jobTitle(job1, false);
      expect(title).to.equal("Test company: Job title");
      done();
    });
    it("Formats title correctly (non-bold) #2", (done) => {
      const title = jobTitle(job1);
      expect(title).to.equal("Test company: Job title");
      done();
    });
  });
  describe("canApply()", () => {
    it("Formats 'can apply' correctly", (done) => {
      const mockDate = moment();
      const apply = canApply(job1, mockDate);
      expect(apply).to.equal("Applications accepted until further notice");
      done();
    });
    it("Formats 'can apply' correctly", (done) => {
      const mockDate = moment("2019-01-25 12:10:00");
      const apply = canApply(job2, mockDate);
      expect(apply).to.equal(
        "Applications accepted until: 27.02.2019 12:00:00 (32 day(s) remaining)",
      );
      done();
    });
  });
  describe("publishedDate()", () => {
    it("Formats 'published date' correctly", (done) => {
      const apply = publishedDate("2019-02-27 12:34:56");
      expect(apply).to.equal("Published on: 27.02.2019 12:34:56");
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
      const mockDate = moment("2019-02-01 12:00:00");
      const msg = generateMessage([job1, job2], mockDate);
      expect(msg).to.equal(
        "New career opportunities on the job board!" +
          "\r\n" +
          "\r\n" +
          "*Test company: Job title*" +
          "\r\n" +
          "Published on: 01.01.2019 12:00:00" +
          "\r\n" +
          "Applications accepted until further notice" +
          "\r\n" +
          "https://jobs.tko-aly.fi/jobs/1" +
          "\r\n" +
          "\r\n" +
          "*Test company 2: Job title*" +
          "\r\n" +
          "Published on: 01.01.2019 12:00:00" +
          "\r\n" +
          "Applications accepted until: 27.02.2019 12:00:00 (26 day(s) remaining)" +
          "\r\n" +
          "https://jobs.tko-aly.fi/jobs/22" +
          "\r\n",
      );
      done();
    });
  });
  describe("generateJob()", () => {
    it("Generates job correctly (no end date)", (done) => {
      const job = generateJob(55, "2019-01-01 13:00:00");
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
      const job = generateJob(55, "2019-01-01 13:00:00", "2019-01-15 13:00:00");
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
        end: "2019-01-15 13:00:00",
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
  describe("daysLeft()", () => {
    it("Returns 'Deadline today' correctly #1", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-08 12:01:00");
      const res = getDeadline(deadline, today);
      expect(res).to.equal("Deadline today");
    });
    it("Returns 'Deadline today' correctly #2", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-08 23:59:59");
      const res = getDeadline(deadline, today);
      expect(res).to.equal("Deadline today");
    });
    it("Returns 'Deadline today' correctly #3", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-09 00:00:00");
      const res = getDeadline(deadline, today);
      expect(res).to.not.equal("Deadline today");
    });
    it("Returns 'Deadline tomorrow' correctly #1", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-09 00:00:00");
      const res = getDeadline(deadline, today);
      expect(res).to.equal("Deadline tomorrow");
    });
    it("Returns 'Deadline tomorrow' correctly #2", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-09 12:00:00");
      const res = getDeadline(deadline, today);
      expect(res).to.equal("Deadline tomorrow");
    });
    it("Returns 'Deadline tomorrow' correctly #3", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-12 12:00:00");
      const res = getDeadline(deadline, today);
      expect(res).to.not.equal("Deadline today");
    });
    it("Returns '2 day(s) remaining' correctly #1", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-10 12:00:00");
      const res = getDeadline(deadline, today);
      expect(res).to.equal("2 day(s) remaining");
    });
    it("Returns '2 day(s) remaining' correctly #2", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-10 12:00:10");
      const res = getDeadline(deadline, today);
      expect(res).to.equal("2 day(s) remaining");
    });
    it("Returns '2 day(s) remaining' correctly #3", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-10 12:01:00");
      const res = getDeadline(deadline, today);
      // Uses flooring in the return value
      expect(res).to.equal("2 day(s) remaining");
    });
    it("Returns '3 day(s) remaining' correctly #1", () => {
      const today = moment("2019-01-08 12:00:00");
      const deadline = moment("2019-01-11 12:00:00");
      const res = getDeadline(deadline, today);
      // Uses flooring in the return value
      expect(res).to.equal("3 day(s) remaining");
    });
  });
});
