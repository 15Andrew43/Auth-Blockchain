import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/store.js';



const CreateUser = () => {


    useEffect(() => {

    }, [])


    return (
        <div>
            <div className={styles.form_input}>
                <text>site name</text>
                <input type="text" value={''} onChange={(e) => {
                    setPubKey(e.target.value);
                }} />
            </div>
            <div className={styles.form_input}>
                <text>login</text>
                <input type="text" value={''} onChange={(e) => {
                    setPrivKey(e.target.value);
                }} />
            </div>
            <div className={styles.form_input}>
                <text>password</text>
                <input type="password" value={''} onChange={(e) => {
                    setPrivKey(e.target.value);
                }} />
            </div>
            <button onClick={() => { }}>Save user account</button>
        </div>
    );
};

export default CreateUser;
