require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("TelephoneAttack", () => {
  it("attacks", async () => {
    const [owner, attacker] = await ethers.getSigners();

    const Telephone = await ethers.getContractFactory("Telephone");
    const telephone = await Telephone.connect(owner).deploy();
    await telephone.deployed();

    const TelephoneAttack = await ethers.getContractFactory("TelephoneAttack");
    const telephoneAttack = await TelephoneAttack.connect(attacker).deploy();
    await telephoneAttack.deployed();

    expect(await telephone.owner()).to.equal(owner.address);

    await telephoneAttack.attack(telephone.address);

    expect(await telephone.owner()).to.equal(attacker.address);
  });
});
