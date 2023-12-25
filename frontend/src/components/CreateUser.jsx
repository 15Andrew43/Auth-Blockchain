import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/store.js';
import { addUserToSite } from '../web3/main.js';



const CreateUser = () => {

    const [site, setSite] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');


    const handleSaveUserAccount = () => {
        if (localStorage.getItem('pubKey')) {
            addUserToSite(localStorage.getItem('pubKey'), site, login, password);
        }
    }


    return (
        <div>
            <div className={styles.form_input}>
                <text>site name</text>
                <input type="text" value={site} onChange={(e) => {
                    setSite(e.target.value);
                }} />
            </div>
            <div className={styles.form_input}>
                <text>login</text>
                <input type="text" value={login} onChange={(e) => {
                    setLogin(e.target.value);
                }} />
            </div>
            <div className={styles.form_input}>
                <text>password</text>
                <input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </div>
            <button onClick={handleSaveUserAccount}>Save user account</button>
        </div>
    );
};

export default CreateUser;
