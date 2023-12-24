const ethers = require('ethers');

const privateKey = '0xae803ff85f84549a43946ca2e90cb9ed827048ed4029414cd0ca9c8bfbb156bb';
const publicKey = '0x3f16be0eb6abd3d6cd510299745a30f901557524040fbfde4bd9d5348c91660e79828018122dc9c7efa9fd0eeaa56fc773a1e4fb7aec10b3044e245e1cc2356d';
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

const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/831547ad8aa640a08384bb3a668fe185');
const wallet = new ethers.Wallet(privateKey, provider);



const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const message = publicKey;


// Wrap the code in an async function
async function signAndVerify(message) {
    try {
        const messageBytes = ethers.utils.toUtf8Bytes(message);
        const messageHash = ethers.utils.sha256(messageBytes);

        // Восстановление подписи
        const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));

        // Разбираем подпись на компоненты (v, r, s)
        const { v, r, s } = ethers.utils.splitSignature(signature);


        const textEncoder = new TextEncoder();
        const bytes = textEncoder.encode('parol');

        // Вызываем функцию verifySignature на смарт-контракте
        const result = await contract.addUserToSite(messageHash, v, r, s, 'qqq.ru', 'papa', bytes);
        console.log('Signature verified by contract. Result:', result);
    } catch (error) {
        console.error('Error verifying signature:', error);
    }
}

// Call the async function
signAndVerify(message);