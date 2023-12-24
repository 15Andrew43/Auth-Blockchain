import React, { useState } from 'react';
import styles from '../Styles.module.css';

const MyForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLoginClick = () => {
    }


    return (
        <div className={styles.form}>
            <div className={styles.form_input}>
                <text >pub key:</text>
                <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className={styles.form_input}>
                <text >private key:</text>
                <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <label>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleLoginClick}>Generate New</button>
            </label>
        </div>
    );
};

export default MyForm;
