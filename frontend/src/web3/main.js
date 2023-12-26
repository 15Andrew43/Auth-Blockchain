const ethers = require('ethers');
const { encryptPassword, decryptPassword } = require('./crypto.js');
const { privateKey, purePrivateKey, publicKey, contractAddress, chainId, provider, wallet, contract } = require('./constants.js');

// const iv = Buffer.from([25, 109, 100, 236, 14, 127, 85, 135, 184, 72, 253, 122, 240, 28, 158, 58]);
// const ivToStringHex = 'a842a3338e111c8d8c935f5ee8c2b1c0';

const message = publicKey;


async function sighMessage(message) {
    const messageBytes = ethers.utils.toUtf8Bytes(message);
    const messageHash = ethers.utils.keccak256(messageBytes);
    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    const { v, r, s } = ethers.utils.splitSignature(signature);

    return { messageHash, v, r, s }
}



export async function changeSiteName(message, oldSiteName, newSiteName) {
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

export async function deleteSiteInfo(message, site) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const currentNonce = await wallet.getTransactionCount();

    const transaction = {
        nonce: currentNonce,
        to: contractAddress,
        data: contract.interface.encodeFunctionData('deleteSiteInfo', [messageHash, v, r, s, site]),
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei'),
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const tx = await provider.sendTransaction(signedTransaction);

    console.log('Transaction deleteSiteInfo is sent. Transaction hash:', tx.hash);
}

export async function deleteAccountInfo(message, site, login) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const currentNonce = await wallet.getTransactionCount();

    const transaction = {
        nonce: currentNonce,
        to: contractAddress,
        data: contract.interface.encodeFunctionData('deleteAccountInfo', [messageHash, v, r, s, site, login]),
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits('30', 'gwei'),
        chainId: chainId,
    };

    const signedTransaction = await wallet.signTransaction(transaction);

    const tx = await provider.sendTransaction(signedTransaction);

    console.log('Transaction deleteAccountInfo is sent. Transaction hash:', tx.hash);
}

export async function changeSiteLogin(message, site, oldLogin, newLogin) {
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

export async function changeSitePassword(message, site, login, newPassword) {
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

export async function addUserToSite(message, site, login, password) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const { encryptedPassword, _ } = encryptPassword(password, purePrivateKey);

    const textEncoder = new TextEncoder();
    const bytesPassword = textEncoder.encode(encryptedPassword);

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



export async function getSites(message) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const result = await contract.getSites(messageHash, v, r, s);

    console.log('result = ', result);

    return result
}



export async function getLogins(message, site) {
    const { messageHash, v, r, s } = await sighMessage(message);

    const result = await contract.getLogins(messageHash, v, r, s, site);

    console.log('result = ', result);


    const decodedResults = result.map((loginAndPassword) => {
        const [login, password] = loginAndPassword;
        const byteArray = password.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
        const decodedPassword = new TextDecoder('utf-8').decode(Uint8Array.from(byteArray)).slice(1);
        const decryptedPassword = decryptPassword(decodedPassword, purePrivateKey);
        return { login, password: decryptedPassword };
    });


    return decodedResults
}
