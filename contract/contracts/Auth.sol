// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./MyStringLibrary.sol";

contract Auth {
    using MyStringLibrary for string;

    struct User {
        string login;
        bytes password;
    }

    address owner;

    mapping(address => mapping(string => User[])) users;
    mapping(address => string[]) sites;

    event NewUser(string site, string login, bytes password);
    event changeSite(string oldSiteName, string newSiteName);
    event changeLogin(string site, string oldLogin, string newLogin);
    event changePassword(string site, string login, bytes newPassword);

    modifier isAuth(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) {
        require(
            msg.sender == verifySignature(message, v, r, s),
            "you can not change someone else's state"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function verifySignature(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal pure returns (address) {
        bytes32 signature = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", message)
        );
        address signer = ecrecover(signature, v, r, s);
        return signer;
    }

    function changeSiteName(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory oldSiteName,
        string memory newSiteName
    ) external isAuth(message, v, r, s) {
        for (uint i = 0; i < users[msg.sender][oldSiteName].length; i++) {
            User memory user = users[msg.sender][oldSiteName][i];
            users[msg.sender][newSiteName].push(user);
            delete users[msg.sender][oldSiteName][i];
        }
        delete users[msg.sender][oldSiteName];

        for (uint i = 0; i < sites[msg.sender].length; i++) {
            if (MyStringLibrary.isEqual(sites[msg.sender][i], oldSiteName)) {
                sites[msg.sender][i] = newSiteName;
                break;
            }
        }

        emit changeSite(oldSiteName, newSiteName);
    }

    function changeSiteLogin(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory site,
        string memory oldLogin,
        string memory newLogin
    ) external isAuth(message, v, r, s) {
        for (uint i = 0; i < users[msg.sender][site].length; i++) {
            if (
                MyStringLibrary.isEqual(
                    users[msg.sender][site][i].login,
                    oldLogin
                )
            ) {
                users[msg.sender][site][i].login = newLogin;
                break;
            }
        }

        emit changeLogin(site, oldLogin, newLogin);
    }

    function changeSitePassword(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory site,
        string memory login,
        bytes memory newPassword
    ) external isAuth(message, v, r, s) {
        for (uint i = 0; i < users[msg.sender][site].length; i++) {
            if (
                MyStringLibrary.isEqual(users[msg.sender][site][i].login, login)
            ) {
                users[msg.sender][site][i].password = newPassword;
                break;
            }
        }

        emit changePassword(site, login, newPassword);
    }

    function addUserToSite(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory site,
        string memory _login,
        bytes memory _password
    ) external isAuth(message, v, r, s) {
        sites[msg.sender].push(site);
        users[msg.sender][site].push(User(_login, _password));

        emit NewUser(site, _login, _password);
    }

    function getSites(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view isAuth(message, v, r, s) returns (string[] memory) {
        return sites[msg.sender];
    }

    function getLogins(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory site
    ) public view isAuth(message, v, r, s) returns (User[] memory) {
        return users[msg.sender][site];
    }
}
