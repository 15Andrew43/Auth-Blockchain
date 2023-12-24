// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

library MyStringLibrary {
    function isEqual(
        string memory a,
        string memory b
    ) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
