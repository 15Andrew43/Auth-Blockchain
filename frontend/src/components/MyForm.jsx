import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector } from 'react-redux';


const MyForm = () => {

    const isAuth = useSelector(state => state.app.is_auth);


    const [pubKey, setPubKey] = useState('');
    const [privKey, setPrivKey] = useState('');


    const handleLoginClick = () => {
        localStorage.setItem('pubKey', pubKey);
        localStorage.setItem('privKey', privKey);
    }
    const handleLogoutClick = () => {
        console.log('AAAAA');
        localStorage.remove('pubKey');
        localStorage.remove('privKey');
        setPubKey('');
        setPrivKey('');
    }
    const handleGenerateNewClick = () => {
    }

    useEffect(() => {
        if (isAuth) {
            setPubKey(localStorage.getItem('pubKey'));
            setPrivKey(localStorage.getItem('privKey'));
        }
    }, [])


    return (
        <div className={styles.form}>
            <div className={styles.form_input}>
                <text >pub key:</text>
                <input type="text" value={pubKey} onChange={(e) => {
                    setPubKey(e.target.value);
                }} />
            </div>
            <div className={styles.form_input}>
                <text >private key:</text>
                <input type="password" value={privKey} onChange={(e) => {
                    setPrivKey(e.target.value);
                }} />
            </div>
            <label className={styles.buttons}>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleLogoutClick}>Logout</button>
                <button onClick={handleGenerateNewClick}>Generate New</button>
            </label>
        </div>
    );
};

export default MyForm;
