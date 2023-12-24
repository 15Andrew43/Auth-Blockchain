import React from "react";
import { render } from "react-dom";
import styles from './Styles.module.css';

function Popup() {
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>
                Tool for saving logins&passwords in blockchain
            </h3>
            <p>This is a simple popupPPPPP!!!</p>
        </div>
    );
}

render(<Popup />, document.getElementById("react-target"));