import React from "react";
import styles from "./Footer.module.css";


function Footer() {
    return (
        <footer className={styles.footer}>
          <div>
            <p className= {styles.paragraphStyles}>Email: example@example.com</p>
            <p  className={styles.paragraphStyles}>Contact: +1 (123) 456-7890</p>
          </div>
        </footer>
      );
    }

export default Footer;
