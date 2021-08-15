require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

const getBalance = ethers.provider.getBalance;

const toWei = (value) => ethers.utils.parseEther(value.toString());

describe("ReentrancyAttack", function () {
  it("attacks", async () => {
    const [owner, attacker] = await ethers.getSigners();

    const Reentrancy = await ethers.getContractFactory("Reentrancy");
    const reentrancy = await Reentrancy.deploy();
    await reentrancy.deployed();

    await owner.sendTransaction({
      to: reentrancy.address,
      value: toWei(1),
    });

    const ReentrancyAttack = await ethers.getContractFactory(
      "ReentrancyAttack"
    );
    const reentrancyAttack = await ReentrancyAttack.connect(attacker).deploy();
    await reentrancyAttack.deployed();

    expect(await getBalance(reentrancy.address)).to.equal(toWei(1));

    await expect(() =>
      reentrancyAttack
        .connect(attacker)
        .attack(reentrancy.address, { value: toWei(1) })
    ).to.changeEtherBalance(attacker, toWei(1));

    expect(await getBalance(reentrancy.address)).to.equal(0);
  });
});
