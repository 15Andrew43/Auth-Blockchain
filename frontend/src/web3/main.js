const ethers = require('ethers');

const privateKey = '0x8145a914408c63629b336ff523a2bc8a58d465a1648ea9f51c8140eb87a37c06';
const publicKey = '0xdf851c89df4b71f1f111b7df9344e395f1983065807f92ecbbaab420ec947c5c8d6fce357c2fa60b54beb314d0da6ea1a757c2da211d0d2b27a59f4c1f6e07ff';
const contractAddress = '0xA4cA0353229F47b0073c35b328E454F1B1fa1Ab4';
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

const chainId = 80001; // Replace with the appropriate chain ID for Polygon Mumbai testnet
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/831547ad8aa640a08384bb3a668fe185', { chainId });
const wallet = new ethers.Wallet(privateKey, provider);



const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const message = publicKey;


async function sighMessage(message) {
    const messageBytes = ethers.utils.toUtf8Bytes(message);
    const messageHash = ethers.utils.keccak256(messageBytes);
    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    const { v, r, s } = ethers.utils.splitSignature(signature);

    return { messageHash, v, r, s }
}



async function changeSiteName(message, oldSiteName, newSiteName) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const currentNonce = await wallet.getTransactionCount();

    const transaction = {
        nonce: currentNonce,
        to: contractAddress,
        data: contract.interface.encodeFunctionData('changeSiteName', [messageHash, v, r, s, oldSiteName, newSiteName]),
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei'),
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const tx = await provider.sendTransaction(signedTransaction);

    console.log('Transaction changeSiteName is sent. Transaction hash:', tx.hash);
}

async function changeSiteLogin(message, site, oldLogin, newLogin) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const currentNonce = await wallet.getTransactionCount();

    const transaction = {
        nonce: currentNonce,
        to: contractAddress,
        data: contract.interface.encodeFunctionData('changeSiteLogin', [messageHash, v, r, s, site, oldLogin, newLogin]),
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei'),
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const tx = await provider.sendTransaction(signedTransaction);

    console.log('Transaction changeSiteLogin is sent. Transaction hash:', tx.hash);
}

async function changeSitePassword(message, site, login, newPassword) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const currentNonce = await wallet.getTransactionCount();

    const transaction = {
        nonce: currentNonce,
        to: contractAddress,
        data: contract.interface.encodeFunctionData('changeSitePassword', [messageHash, v, r, s, site, login, newPassword]),
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei'),
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const tx = await provider.sendTransaction(signedTransaction);

    console.log('Transaction changeSitePassword is sent. Transaction hash:', tx.hash);
}

async function addUserToSite(message, site, login, password) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const textEncoder = new TextEncoder();
    const bytesPassword = textEncoder.encode(password);

    const currentNonce = await wallet.getTransactionCount();

    const transaction = {
        nonce: currentNonce,
        to: contractAddress,
        data: contract.interface.encodeFunctionData('addUserToSite', [messageHash, v, r, s, site, login, bytesPassword]),
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei'),
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const tx = await provider.sendTransaction(signedTransaction);

    console.log('Transaction addUserToSite is sent. Transaction hash:', tx.hash);
}

// addUserToSite(message, 'yandex.ru', 'kolya', 'nbnbnbnbnbnbn');


async function getSites(message) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const result = await contract.getSites(messageHash, v, r, s);

    console.log('result = ', result);

    return result
}

// getSites(message);


async function getLogins(message, site) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const result = await contract.getLogins(messageHash, v, r, s, site);

    console.log('result = ', result);

    return result
}

// getLogins(message, 'yandex.ru');