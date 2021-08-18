require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("PreservationAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const LibraryContract = await ethers.getContractFactory("LibraryContract");
    const lib1 = await LibraryContract.connect(user).deploy();
    await lib1.deployed();

    const lib2 = await LibraryContract.connect(user).deploy();
    await lib2.deployed();

    const Preservation = await ethers.getContractFactory("Preservation");
    const preservation = await Preservation.connect(user).deploy(
      lib1.address,
      lib2.address
    );
    await preservation.deployed();

    const PreservationAttack = await ethers.getContractFactory(
      "PreservationAttack"
    );
    const preservationAttack = await PreservationAttack.deploy();
    await preservationAttack.deployed();

    expect(await preservation.owner()).to.equal(user.address);

    await preservationAttack.attack(preservation.address);

    expect(await preservation.timeZone1Library()).to.equal(
      preservationAttack.address
    );
    expect(await preservation.owner()).to.equal(owner.address);
  });
});
