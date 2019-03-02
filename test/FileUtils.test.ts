import { expect } from "chai";
import "mocha";
import { join } from "path";
import { getChatIds } from "../src/FileUtils";

// const testChatIdFile = join(__dirname, "testChatIds.json");
const testChatIdFile = join(__dirname, "invalidChatIds.json");

// ["12345", "67890"]

describe("FileUtils", () => {
  it("Throws an error on a malformed ChatID file", (done) => {
    done();
  });
});
