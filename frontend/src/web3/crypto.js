import cryptoBrowserify from 'crypto-browserify';
import { Buffer } from 'buffer';
import stream from 'stream-browserify';

window.cryptoBrowserify = cryptoBrowserify;
window.stream = stream;
window.Buffer = Buffer;


export function encryptPassword(password, privateKey) {
    const iv = Buffer.from([25, 109, 100, 236, 14, 127, 85, 135, 184, 72, 253, 122, 240, 28, 158, 58]);

    const key = Buffer.from(privateKey, 'hex');
    const cipher = cryptoBrowserify.createCipheriv('aes-256-cbc', key, iv);

    let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
    encryptedPassword += cipher.final('hex');

    return { encryptedPassword: encryptedPassword, iv: iv.toString('hex') };
}

export function decryptPassword(encryptedPassword, privateKey) {
    const iv = Buffer.from([25, 109, 100, 236, 14, 127, 85, 135, 184, 72, 253, 122, 240, 28, 158, 58]);

    const key = Buffer.from(privateKey, 'hex');
    const decipher = cryptoBrowserify.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));

    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decryptedPassword += decipher.final('utf-8');

    return decryptedPassword;
}

// Пример использования
// const privateKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
// const password = 'mySecretPassword';

// const iv = cryptoBrowserify.randomBytes(16);
// const { encryptedPassword } = encryptPassword(password, privateKey, iv);
// console.log('Encrypted Password:', encryptedPassword);

// const decryptedPassword = decryptPassword(encryptedPassword, privateKey, iv);
// console.log('Decrypted Password:', decryptedPassword);
