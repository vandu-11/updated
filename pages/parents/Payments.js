// pages/payments.js
import React from "react";
import Header from "../../components/Header";
import RazorpayComponent from "../../components/RazorpayComponent";
import styles from "./Payments.module.css";

function Payments() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <h1>Payments and Subscriptions</h1>
        <div>
          <RazorpayComponent amount={1000} /> {/* Replace with the desired amount */}
        </div>

      </main>
    </div>
  );
}

export default Payments;
