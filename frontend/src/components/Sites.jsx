import React, { useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSites } from '../redux/store.js';
import { getSites } from '../web3/main.js';

const Sites = () => {
    const dispatch = useDispatch();
    const sites = useSelector(state => state.app.sites);
    const isAuth = useSelector(state => state.app.is_auth);

    const fetchData = async () => {
        const fetchedSites = await getSites(localStorage.getItem('pubKey'));
        // const fetchedSites = ['Q', 'W', 'E'];
        console.log('SITES = ', fetchedSites);
        dispatch(setSites(fetchedSites));
    };

    useEffect(() => {
        console.log("QQQQQQQ", sites);
        console.log(getSites);
        if (localStorage.getItem('pubKey')) {
            fetchData();
        }
        console.log("WWWWWWW", sites);
    }, [dispatch]);

    return (
        <div className={styles.sites}>
            {sites.map((site, index) => (
                <div key={index} className={styles.site}>
                    {site}
                </div>
            ))}
        </div>
    );
};

export default Sites;
