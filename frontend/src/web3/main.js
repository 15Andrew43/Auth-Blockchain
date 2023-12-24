const ethers = require('ethers');

const privateKey = '0xae803ff85f84549a43946ca2e90cb9ed827048ed4029414cd0ca9c8bfbb156bb';
const contractAddress = '0xF17A1024E19410A384E403e0c6af81c9883bDDB5';
const contractABI = [
    {
        "inputs": [
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
                "internalType": "string",
                "name": "_password",
                "type": "string"
            }
        ],
        "name": "addSite",
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
        "name": "verifySignature",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    }
]
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/831547ad8aa640a08384bb3a668fe185');
const wallet = new ethers.Wallet(privateKey, provider);



const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const message = 'Hello, world!';


// Wrap the code in an async function
async function signAndVerify(message) {
    try {
        const messageBytes = ethers.utils.toUtf8Bytes(message);
        const messageHash = ethers.utils.sha256(messageBytes);

        // Восстановление подписи
        const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));

        // Разбираем подпись на компоненты (v, r, s)
        const { v, r, s } = ethers.utils.splitSignature(signature);

        // Вызываем функцию verifySignature на смарт-контракте
        const result = await contract.verifySignature(messageHash, v, r, s);
        console.log('Signature verified by contract. Result:', result);
    } catch (error) {
        console.error('Error verifying signature:', error);
    }
}

// Call the async function
signAndVerify(message);