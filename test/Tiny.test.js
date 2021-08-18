require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("Tiny", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const interface = ["function whatIsTheMeaningOfLife() returns (uint)"];

    const bytecode = "600a80600e600039806000f350fe602a60005260206000f3";

    const Tiny = new ethers.ContractFactory(interface, bytecode, owner);
    const tiny = await Tiny.deploy();
    await tiny.deployed();

    expect(await tiny.callStatic.whatIsTheMeaningOfLife()).to.equal(42);
  });
});
