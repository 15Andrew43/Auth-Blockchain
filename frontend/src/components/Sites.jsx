import React, { useEffect } from 'react';
import styles from '../Styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSites } from '../redux/store.js';

const Sites = () => {
    const dispatch = useDispatch();
    const sites = useSelector(state => state.app.sites);

    useEffect(() => {
        const fetchedSites = ['aaa', 'bbb', 'ccc'];
        console.log('SITES = ', fetchedSites);
        dispatch(setSites(fetchedSites));
    }, [dispatch])

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
