require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("AlienCodexAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const AlienCodex = await ethers.getContractFactory("AlienCodex");
    const alienCodex = await AlienCodex.connect(user).deploy();
    await alienCodex.deployed();

    const AlienCodexAttack = await ethers.getContractFactory(
      "AlienCodexAttack"
    );
    const alienCodexAttack = await AlienCodexAttack.deploy();
    await alienCodexAttack.deployed();

    expect(await alienCodex.getOwner()).to.equal(user.address);

    await alienCodexAttack.attack(alienCodex.address);

    expect(await alienCodex.getOwner()).to.equal(owner.address);
  });
});
