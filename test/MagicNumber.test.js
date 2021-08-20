require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("MagicNumber", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const interface = ["function whatIsTheMeaningOfLife() returns (uint)"];

    const bytecode = "600a80600e600039806000f350fe602a60005260206000f3";

    const MagicNumber = new ethers.ContractFactory(interface, bytecode, owner);
    const magicNumber = await MagicNumber.deploy();
    await magicNumber.deployed();

    expect(await magicNumber.callStatic.whatIsTheMeaningOfLife()).to.equal(42);
  });
});
