require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("GatekeeperOneAttack", function () {
  it("attakcs", async () => {
    const [owner, user] = await ethers.getSigners();

    const GatekeeperOne = await ethers.getContractFactory("GatekeeperOne");
    const gatekeeperOne = await GatekeeperOne.deploy();
    await gatekeeperOne.deployed();

    const GatekeeperOneAttack = await ethers.getContractFactory(
      "GatekeeperOneAttack"
    );
    const gatekeeperOneAttack = await GatekeeperOneAttack.deploy();
    await gatekeeperOneAttack.deployed();

    await gatekeeperOneAttack.attack(gatekeeperOne.address, 24827, {
      gasLimit: 100000,
    });
  });
});
