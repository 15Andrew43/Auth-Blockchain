const ethers = require('ethers');

export const privateKey = '0x8145a914408c63629b336ff523a2bc8a58d465a1648ea9f51c8140eb87a37c06';
export const purePrivateKey = '8145a914408c63629b336ff523a2bc8a58d465a1648ea9f51c8140eb87a37c06';
export const publicKey = '0xdf851c89df4b71f1f111b7df9344e395f1983065807f92ecbbaab420ec947c5c8d6fce357c2fa60b54beb314d0da6ea1a757c2da211d0d2b27a59f4c1f6e07ff';
export const contractAddress = '0xbdb5D5A6Ba840308efFc314Bd2c10d9a859896B8';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_login",
                "type": "string"
            },
            {
                "internalType": "bytes",
                "name": "_password",
                "type": "bytes"
            }
        ],
        "name": "addUserToSite",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "login",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "password",
                "type": "bytes"
            }
        ],
        "name": "NewUser",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "oldLogin",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newLogin",
                "type": "string"
            }
        ],
        "name": "changeLogin",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "login",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "newPassword",
                "type": "bytes"
            }
        ],
        "name": "changePassword",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "oldSiteName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newSiteName",
                "type": "string"
            }
        ],
        "name": "changeSite",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "oldLogin",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newLogin",
                "type": "string"
            }
        ],
        "name": "changeSiteLogin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "oldSiteName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newSiteName",
                "type": "string"
            }
        ],
        "name": "changeSiteName",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "login",
                "type": "string"
            },
            {
                "internalType": "bytes",
                "name": "newPassword",
                "type": "bytes"
            }
        ],
        "name": "changeSitePassword",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "login",
                "type": "string"
            }
        ],
        "name": "deleteAccount",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "site",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "login",
                "type": "string"
            }
        ],
        "name": "deleteAccountInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "site",
                "type": "string"
            }
        ],
        "name": "deleteSite",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "site",
                "type": "string"
            }
        ],
        "name": "deleteSiteInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "site",
                "type": "string"
            }
        ],
        "name": "getLogins",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "login",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes",
                        "name": "password",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct Auth.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "message",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "getSites",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const chainId = 80001;
export const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/831547ad8aa640a08384bb3a668fe185', { chainId });
export const wallet = new ethers.Wallet(privateKey, provider);


export const contract = new ethers.Contract(contractAddress, contractABI, wallet);
