import cryptoBrowserify from 'crypto-browserify';
import { Buffer } from 'buffer'; // Import Buffer from the 'buffer' package
import stream from 'stream-browserify';

window.cryptoBrowserify = cryptoBrowserify;
window.stream = stream;
window.Buffer = Buffer; // Expose Buffer to the global scope


// Your remaining code

export function encryptPassword(password, privateKey) {
    const key = Buffer.from(privateKey, 'hex');
    const iv = cryptoBrowserify.randomBytes(16);

    const cipher = cryptoBrowserify.createCipheriv('aes-256-cbc', key, iv);

    let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
    encryptedPassword += cipher.final('hex');

    return { encryptedPassword: encryptedPassword, iv: iv.toString('hex') };
}

export function decryptPassword(encryptedPassword, privateKey, iv) {
    const key = Buffer.from(privateKey, 'hex');
    const decipher = cryptoBrowserify.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));

    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decryptedPassword += decipher.final('utf-8');

    return decryptedPassword;
}

// Example usage
const privateKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const password = 'mySecretPassword';

const { encryptedPassword, iv } = encryptPassword(password, privateKey);
console.log('Encrypted Password:', encryptedPassword);
console.log('Initialization Vector (IV):', iv);

const decryptedPassword = decryptPassword(encryptedPassword, privateKey, iv);
console.log('Decrypted Password:', decryptedPassword);
