import { expect } from "chai";
import "mocha";
import { isCompany, isJob, isTag } from "../src/Validators";

describe("Validators", () => {
  it("Validates tag correctly #1", (done) => {
    const obj = {
      id: 1,
      name: "Hello",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:00",
    };
    expect(isTag(obj)).to.equal(true);
    done();
  });
  it("Validates tag correctly #2", (done) => {
    const obj = {
      name: "Hello",
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:00",
    };
    expect(isTag(obj)).to.equal(false);
    done();
  });

  it("Validates company correctly #1", (done) => {
    const obj = {
      id: 1,
      name: "Hello",
      website: "example.com",
      sponsored: false,
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:00",
      logo: null,
    };
    expect(isCompany(obj)).to.equal(true);
    done();
  });
  it("Validates company correctly #2", (done) => {
    const obj = {
      id: 1,
      name: "Hello",
      website: "example.com",
      sponsored: false,
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:00",
      logo: "testi.jpg",
    };
    expect(isCompany(obj)).to.equal(true);
    done();
  });
  it("Validates company correctly #3", (done) => {
    const obj = {
      id: 1,
      name: "Hello",
      website: "example.com",
      sponsored: false,
      created_at: "2019-01-01 12:00:00",
      updated_at: "2019-01-01 12:00:00",
    };
    expect(isCompany(obj)).to.equal(false);
    done();
  });
  it("Validates job correctly #1", (done) => {
    const obj = {
      id: 1,
      title: "Job title",
      company: {
        id: 1,
        name: "Hello",
        website: "example.com",
        sponsored: false,
        created_at: "2019-01-01 12:00:00",
        updated_at: "2019-01-01 12:00:00",
        logo: null,
      },
      tags: [],
      description: "Hello",
      begin: "2019-01-01 12:00:00",
      end: null,
      created_at: "2019-01-01 12:00:00",
      url: "example.com",
    };
    expect(isJob(obj)).to.equal(true);
    done();
  });
  it("Validates job correctly #2", (done) => {
    const obj = {
      id: 1,
      title: "Job title",
      company: {
        id: 1,
        name: "Hello",
        website: "example.com",
        sponsored: false,
        created_at: "2019-01-01 12:00:00",
        updated_at: "2019-01-01 12:00:00",
      },
      tags: [],
      description: "Hello",
      begin: "2019-01-01 12:00:00",
      end: null,
      created_at: "2019-01-01 12:00:00",
      url: "example.com",
    };
    expect(isJob(obj)).to.equal(false);
    done();
  });
  it("Validates job correctly #3", (done) => {
    const obj = {
      id: 1,
      title: "Job title",
      company: {
        id: 1,
        name: "Hello",
        website: "example.com",
        sponsored: false,
        created_at: "2019-01-01 12:00:00",
        updated_at: "2019-01-01 12:00:00",
        logo: null,
      },
      tags: [
        {
          id: 1,
          name: "Hello",
          created_at: "2019-01-01 12:00:00",
          updated_at: "2019-01-01 12:00:00",
        },
      ],
      description: "Hello",
      begin: "2019-01-01 12:00:00",
      end: null,
      created_at: "2019-01-01 12:00:00",
      url: "example.com",
    };
    expect(isJob(obj)).to.equal(true);
    done();
  });
  it("Validates job correctly #3", (done) => {
    const obj = {
      id: 1,
      title: "Job title",
      company: {
        id: 1,
        name: "Hello",
        website: "example.com",
        sponsored: false,
        created_at: "2019-01-01 12:00:00",
        updated_at: "2019-01-01 12:00:00",
        logo: null,
      },
      tags: [
        {
          id: "1",
          name: "Hello",
          created_at: "2019-01-01 12:00:00",
          updated_at: "2019-01-01 12:00:00",
        },
      ],
      description: "Hello",
      begin: "2019-01-01 12:00:00",
      end: null,
      created_at: "2019-01-01 12:00:00",
      url: "example.com",
    };
    expect(isJob(obj)).to.equal(false);
    done();
  });
});
