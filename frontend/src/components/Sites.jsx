import React, { useState, useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSites } from '../redux/store.js';
import { getSites, changeSiteName, getLogins, deleteSiteInfo } from '../web3/main.js';

const Sites = () => {
    const dispatch = useDispatch();
    const sites = useSelector(state => state.app.sites);
    const isAuth = useSelector(state => state.app.is_auth);

    const [curSite, setCurSite] = useState('');
    const [curInd, setCurInd] = useState(-1);
    const [accounts, setAccounts] = useState([]);


    const fetchData = async () => {
        const fetchedSites = await getSites(localStorage.getItem('pubKey'));
        console.log('SITES = ', fetchedSites);
        dispatch(setSites(fetchedSites));
    };

    const handleSaveSite = async () => {
        changeSiteName(localStorage.getItem('pubKey'), sites[curInd], curSite);
        fetchData();
    }

    const handleGetAccounts = async (index) => {
        setCurInd(index);
        setCurSite(sites[index]);
        const siteAccounts = await getLogins(localStorage.getItem('pubKey'), sites[index]);
        console.log(siteAccounts)
        setAccounts(siteAccounts);
    }

    const handledeleteSite = async (index) => {
        await deleteSiteInfo(localStorage.getItem('pubKey'), sites[index]);
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
                    <button onClick={handleSaveSite}>save</button>
                    <button onClick={() => handleGetAccounts(index)}>accounts</button>
                    <button onClick={() => handledeleteSite(index)}>delete</button>
                    {index === curInd && accounts.length > 0 && (
                        <ul>
                            {accounts.map((account, accountIndex) => (
                                <li key={accountIndex}>
                                    <div>
                                        <input type='text' value={account.login} />
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(account.login);
                                        }}>copy</button>
                                    </div>
                                    <div>
                                        <input type='password' value={account.password} />
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(account.password);
                                        }}>copy</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sites;
