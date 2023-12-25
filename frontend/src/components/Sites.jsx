import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../redux/store.js';




const Sites = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.app.is_auth);


    useEffect(() => {

    }, [])


    return (
        <div>

        </div>
    );
};

export default Sites;
