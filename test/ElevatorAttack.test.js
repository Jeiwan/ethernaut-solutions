require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");

describe("ElevatorAttack", function () {
  it("attacks", async () => {
    const [owner, user] = await ethers.getSigners();

    const Elevator = await ethers.getContractFactory("Elevator");
    const elevator = await Elevator.deploy();
    await elevator.deployed();

    const ElevatorAttack = await ethers.getContractFactory("ElevatorAttack");
    const elevatorAttack = await ElevatorAttack.deploy();
    await elevatorAttack.deployed();

    await elevatorAttack.attack(elevator.address);

    expect(await elevator.floor()).to.equal(31337);
    expect(await elevator.top()).to.equal(true);
  });
});
