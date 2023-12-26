import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/store.js';




const MyForm = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.app.is_auth);


    const [pubKey, setPubKey] = useState('');
    const [privKey, setPrivKey] = useState('');


    const handleLoginClick = () => {
        console.log('BBBB');
        localStorage.setItem('pubKey', pubKey);
        localStorage.setItem('privKey', privKey);
        dispatch(setIsAuth(true));
        console.log("must be true = ", isAuth);
    }
    const handleLogoutClick = () => {
        console.log('AAAAA');
        localStorage.removeItem('pubKey');
        localStorage.removeItem('privKey');
        setPubKey('');
        setPrivKey('');
        console.log("paub key = ", pubKey);
        dispatch(setIsAuth(false));
        console.log("must be false = ", isAuth);
    }
    const handleGenerateNewClick = () => {
    }

    useEffect(() => {
        let pubKey = localStorage.getItem('pubKey');
        if (pubKey) {
            console.log('CCCCCCC');
            dispatch(setIsAuth(true));
        } else {
            dispatch(setIsAuth(false));
        }
        console.log('DDDDDDD');
        if (pubKey) {
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
