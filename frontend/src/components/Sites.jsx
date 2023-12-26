import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSites } from '../redux/store.js';
import { getSites, changeSiteName } from '../web3/main.js';

const Sites = () => {
    const dispatch = useDispatch();
    const sites = useSelector(state => state.app.sites);
    const isAuth = useSelector(state => state.app.is_auth);

    const [curSite, setCurSite] = useState('');
    const [curInd, setCurInd] = useState(-1);

    const fetchData = async () => {
        const fetchedSites = await getSites(localStorage.getItem('pubKey'));
        // const fetchedSites = ['Q', 'W', 'E'];
        console.log('SITES = ', fetchedSites);
        dispatch(setSites(fetchedSites));
    };

    const handleSaveSite = () => {
        changeSiteName(localStorage.getItem('pubKey'), sites[curInd], curSite);
        fetchData();
    }

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
                <div key={index}>
                    <input key={index} type="text" className={styles.site} value={index == curInd ? curSite : site} onChange={(e) => {
                        setCurInd(index);
                        setCurSite(e.target.value);
                    }}>
                    </input>
                    <button onClick={handleSaveSite}>Save</button>
                </div>
            ))}
        </div>
    );
};

export default Sites;
