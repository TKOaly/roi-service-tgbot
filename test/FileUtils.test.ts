process.env.NODE_ENV = "test";

import { expect } from "chai";
import fs from "fs";
import "mocha";
import { join } from "path";
import {
  fileExistsAsync,
  getChatIds,
  jobDifference,
  parseChatIds,
  readFileAsync,
  writeFileAsync,
} from "../src/FileUtils";
import {
  firstNewJob4,
  jobs1Api,
  jobs1Local,
  jobs2Api,
  jobs2Local,
  jobs3Api,
  jobs3Local,
  jobs4Api,
  jobs4Local,
  jobs5Api,
  jobs5Local,
  jobs6Api,
  jobs6Local,
  jobs7Api,
  jobs7Local,
  newJob2,
  secondNewJob4,
} from "./JobData";

const validIds = join(__dirname, "files", "testChatIds.json");
const invalidIds = join(__dirname, "files", "invalidChatIds.json");
const testFile = join(__dirname, "files", "testFile.txt");
const notExists = join(__dirname, "files", "notExists.txt");
const tmpTestFile = join(__dirname, "files", "tmp.txt");

describe("FileUtils", () => {
  describe("getChatIds()", () => {
    it("Returns an empty array on a malformed Chat ID file", async () => {
      const chatIds = await getChatIds(invalidIds);
      expect(chatIds).to.eql([]);
    });
    it("Returns an array of Chat IDs with the correct file", async () => {
      const chatIds = await getChatIds(validIds);
      expect(chatIds).to.eql(["12345", "67890"]);
    });
  });
  describe("parseChatIds()", () => {
    it("Parses Chat ID's correctly #1", async () => {
      const chatIds = parseChatIds(JSON.parse('["12345", "67890"]'));
      expect(chatIds).to.eql(["12345", "67890"]);
    });
    it("Parses Chat ID's correctly #1", async () => {
      const chatIds = parseChatIds(JSON.parse("12345"));
      expect(chatIds).to.eql([]);
    });
    it("Parses Chat ID's correctly #3", async () => {
      const chatIds = parseChatIds(JSON.parse("[1, 2, 3, 4, 5]"));
      expect(chatIds).to.eql([]);
    });
  });
  describe("jobDifference()", () => {
    it("If a new job posting is added, returns the new job", (done) => {
      const diff = jobDifference(jobs2Local, jobs2Api);
      expect(diff).to.eql([newJob2]);
      done();
    });
    it("If multiple new job postings are added, returns the new jobs", (done) => {
      const diff = jobDifference(jobs4Local, jobs4Api);
      expect(diff).to.eql([firstNewJob4, secondNewJob4]);
      done();
    });
    it("If a job is modified, returns an empty array", (done) => {
      const diff = jobDifference(jobs1Local, jobs1Api);
      expect(diff).to.eql([]);
      done();
    });
    it("If a job is removed, returns an empty array", (done) => {
      const diff = jobDifference(jobs3Local, jobs3Api);
      expect(diff).to.eql([]);
      done();
    });
    it("If the fetched data is the same as the locally stored, returns an empty array", (done) => {
      const diff = jobDifference(jobs5Local, jobs5Api);
      expect(diff).to.eql([]);
      done();
    });

    it("If more than 5 new jobs are available, return an empty array (spam safeguard)", (done) => {
      const diff = jobDifference(jobs6Local, jobs6Api);
      expect(diff).to.eql([]);
      done();
    });

    it("If more than 5 jobs are deleted, return an empty array (spam safeguard)", (done) => {
      const diff = jobDifference(jobs7Local, jobs7Api);
      expect(diff).to.eql([]);
      done();
    });
  });
  describe("readFileAsync()", () => {
    it("Reads file correctly", async () => {
      const res = await readFileAsync(testFile);
      expect(res.toString()).to.equal("Hello World\nTest 123");
    });
  });
  describe("writeFileAsync()", () => {
    beforeEach((done) => {
      // Setup (native funcs)
      setupWrite(tmpTestFile);
      done();
    });
    afterEach((done) => {
      setupWrite(tmpTestFile);
      done();
    });
    it("Writes to file correctly", async () => {
      const data = "Hello World\nTest 123";
      // Write asynchronously
      await writeFileAsync(tmpTestFile, data);
      // Read synchronously (native func)
      const res = fs.readFileSync(tmpTestFile);
      expect(res.toString()).to.equal(data);
    });
  });
  describe("fileExistsAsync()", () => {
    it("Returns true if file exists", async () => {
      const exists = await fileExistsAsync(testFile);
      expect(exists).to.equal(true);
    });
    it("Returns false if file does not exists", async () => {
      const exists = await fileExistsAsync(notExists);
      expect(exists).to.equal(false);
    });
  });
});

/**
 * Deletes a file if found on disk.
 * @param fileName Filename
 */
const setupWrite = (fileName: fs.PathLike) => {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
};
