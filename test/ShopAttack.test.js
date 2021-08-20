require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("ShopAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const Shop = await ethers.getContractFactory("Shop");
    const shop = await Shop.connect(user).deploy();
    await shop.deployed();

    const ShopAttack = await ethers.getContractFactory("ShopAttack");
    const shopAttack = await ShopAttack.deploy();
    await shopAttack.deployed();

    await shopAttack.attack(shop.address);

    expect(await shop.price()).to.eq("1");
    expect(await shop.isSold()).to.eq(true);
  });
});
