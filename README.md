# Blockchain Password Manager Chrome Extension
This Chrome extension, developed using **React**, **Webpack**, and a **Solidity** smart contract on **Ethereum**, facilitates secure management of login credentials across various online platforms. The extension encrypts data with **AES** before storing it on the blockchain.

## Technologies:
 - **React:** User interface design.
 - **Webpack:** Bundling and asset management.
 - **Solidity Smart Contract:** Decentralized and secure storage.
 - **AES Encryption:** Enhanced security for stored data.

## How to Run This Project:

1. Deploy the smart contracts.
2. Set the contract address in `./frontend/src/web3/constants.js`.
3. Navigate to the `frontend` directory and run `npm install`.
4. Execute `npm run dev/build` to build the project.
5. In Chrome, go to the extensions page in developer mode.
6. Load the extension by adding the created `dist` directory.
