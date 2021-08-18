// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./OwnableStub.sol";

contract AlienCodex is OwnableStub {
    bool public contact;
    bytes32[] public codex;

    constructor() public {
        setOwner(msg.sender);
    }

    modifier contacted() {
        require(contact, "not contact");
        _;
    }

    function make_contact() public {
        contact = true;
    }

    function record(bytes32 _content) public contacted {
        codex.push(_content);
    }

    function retract() public contacted {
        codex.length--;
    }

    function revise(uint256 i, bytes32 _content) public contacted {
        codex[i] = _content;
    }
}
