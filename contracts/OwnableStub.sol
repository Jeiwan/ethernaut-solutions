pragma solidity ^0.5.0;

contract OwnableStub {
    address private owner;

    function getOwner() public view returns (address) {
        return owner;
    }

    function setOwner(address newOwner) internal {
        owner = newOwner;
    }
}
