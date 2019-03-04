import { expect } from "chai";
import "mocha";
import { join } from "path";
import { getChatIds } from "../src/FileUtils";

const validIds = join(__dirname, "testChatIds.json");
const invalidIds = join(__dirname, "invalidChatIds.json");

describe("FileUtils", () => {
  it("Returns an empty array on a malformed ChatID file", async () => {
    const chatIds = await getChatIds(invalidIds);
    expect(chatIds).to.eql([]);
  });
  it("Returns an array of Chat IDs with the correct file", async () => {
    const chatIds = await getChatIds(validIds);
    expect(chatIds).to.eql(["12345", "67890"]);
  });
});
