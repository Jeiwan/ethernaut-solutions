require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

const toWei = (value) => ethers.utils.parseEther(value.toString());

const fromWei = (value) =>
  ethers.utils.formatEther(
    typeof value === "string" ? value : value.toString()
  );

describe("NaughtCoinAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const NaughtCoin = await ethers.getContractFactory("NaughtCoin");
    const naughtCoin = await NaughtCoin.deploy(owner.address);
    await naughtCoin.deployed();

    const NaughtCoinAttack = await ethers.getContractFactory(
      "NaughtCoinAttack"
    );
    const naughtCoinAttack = await NaughtCoinAttack.deploy();
    await naughtCoinAttack.deployed();

    expect(await naughtCoin.balanceOf(owner.address)).to.equal(toWei(1000000));

    await naughtCoin.approve(naughtCoinAttack.address, toWei(1000000));

    await naughtCoinAttack.attack(naughtCoin.address);

    expect(await naughtCoin.balanceOf(owner.address)).to.equal(0);
    expect(await naughtCoin.balanceOf(naughtCoinAttack.address)).to.equal(
      toWei(1000000)
    );
  });
});
