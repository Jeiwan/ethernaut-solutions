require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

const getBalance = ethers.provider.getBalance;

describe("ForceAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const Force = await ethers.getContractFactory("Force");
    const force = await Force.deploy();
    await force.deployed();

    const ForceAttack = await ethers.getContractFactory("ForceAttack");
    const forceAttack = await ForceAttack.deploy(force.address);
    await forceAttack.deployed();

    await forceAttack.attack({ value: 1 });

    expect(await getBalance(force.address)).to.equal(1);
  });
});
