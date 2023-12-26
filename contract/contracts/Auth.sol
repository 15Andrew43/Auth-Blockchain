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
    mapping(address => string[]) usersSites;
    mapping(string => bool) siteExist;

    event NewUser(string site, string login, bytes password);
    event changeSite(string oldSiteName, string newSiteName);
    event changeLogin(string site, string oldLogin, string newLogin);
    event changePassword(string site, string login, bytes newPassword);
    event deleteSite(string site);
    event deleteAccount(string site, string login);

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
        require(siteExist[oldSiteName], "site with this name does not exist");

        for (uint i = 0; i < users[msg.sender][oldSiteName].length; i++) {
            User memory user = users[msg.sender][oldSiteName][i];
            users[msg.sender][newSiteName].push(user);
            delete users[msg.sender][oldSiteName][i];
        }
        delete users[msg.sender][oldSiteName];

        for (uint i = 0; i < usersSites[msg.sender].length; i++) {
            if (
                MyStringLibrary.isEqual(usersSites[msg.sender][i], oldSiteName)
            ) {
                usersSites[msg.sender][i] = newSiteName;
                break;
            }
        }
        delete siteExist[oldSiteName];
        siteExist[newSiteName] = true;

        emit changeSite(oldSiteName, newSiteName);
    }

    function deleteSiteInfo(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory site
    ) external isAuth(message, v, r, s) {
        require(siteExist[site], "site with this name does not exist");

        for (uint i = 0; i < users[msg.sender][site].length; i++) {
            delete users[msg.sender][site][i];
        }
        delete users[msg.sender][site];

        for (uint i = 0; i < usersSites[msg.sender].length; i++) {
            if (MyStringLibrary.isEqual(usersSites[msg.sender][i], site)) {
                usersSites[msg.sender][i] = usersSites[msg.sender][
                    usersSites[msg.sender].length - 1
                ];
                usersSites[msg.sender].pop();
                break;
            }
        }

        delete siteExist[site];

        emit deleteSite(site);
    }

    function deleteAccountInfo(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s,
        string memory site,
        string memory login
    ) external isAuth(message, v, r, s) {
        require(siteExist[site], "site with this name does not exist");

        for (uint i = 0; i < users[msg.sender][site].length; i++) {
            if (
                MyStringLibrary.isEqual(users[msg.sender][site][i].login, login)
            ) {
                users[msg.sender][site][i] = users[msg.sender][site][
                    users[msg.sender][site].length - 1
                ];
                users[msg.sender][site].pop();
            }
        }
        emit deleteAccount(site, login);
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
        require(siteExist[site], "site with this name does not exist");

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
        require(siteExist[site], "site with this name does not exist");

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
        if (!siteExist[site]) {
            siteExist[site] = true;
            usersSites[msg.sender].push(site);
        }
        users[msg.sender][site].push(User(_login, _password));

        emit NewUser(site, _login, _password);
    }

    function getSites(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view isAuth(message, v, r, s) returns (string[] memory) {
        return usersSites[msg.sender];
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
