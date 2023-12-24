import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import styles from './Styles.module.css';
import MyForm from './components/MyForm.jsx';
import { Provider } from "react-redux";
import { store } from './redux/store.js';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('react-target')
);

function Popup() {

    const [isAuth, setIsAuth] = useState(false);

    if (!isAuth) {
        return (
            <div className={styles.container}>
                <h3 className={styles.header}>
                    Tool for saving logins&passwords in blockchain
                </h3>
                <p>Enter your pub and private keys:</p>
                <MyForm />
            </div>
        );
    }

}

root.render(
    <Provider store={store}>
        <Router>
            <Popup />
        </Router>
    </Provider>);