require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("GatekeeperTwoAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const GatekeeperTwo = await ethers.getContractFactory("GatekeeperTwo");
    const gatekeeperTwo = await GatekeeperTwo.deploy();
    await gatekeeperTwo.deployed();

    const GatekeeperTwoAttack = await ethers.getContractFactory(
      "GatekeeperTwoAttack"
    );
    const gatekeeperTwoAttack = await GatekeeperTwoAttack.deploy(
      gatekeeperTwo.address
    );
    await gatekeeperTwoAttack.deployed();

    expect(await gatekeeperTwo.entrant()).to.equal(owner.address);
  });
});
