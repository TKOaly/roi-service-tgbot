import { expect } from "chai";
import "mocha";
import { chatIdFile } from "../src/Constants";

describe("Constants", () => {
  it("Chat ID file is set correctly", (done) => {
    // 6/5
    expect(chatIdFile).to.equal("src/data/chats.json");
    done();
  });
});
