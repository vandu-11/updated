import { useEffect, useState } from "react";
import { loadRazorpayScript, createRazorpayInstance } from "../utils/razorpay";
import styles from "./RazorpayComponent.module.css";

const RazorpayComponent = ({ amount }) => {
  const [paymentId, setPaymentId] = useState(null);

  const handlePayment = async () => {
    try {
      const scriptLoaded = await loadRazorpayScript();

      if (scriptLoaded) {
        const razorpay = createRazorpayInstance({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        });

        const options = {
          amount: amount * 100, // Amount in paisa (multiply by 100 for INR)
          currency: "INR",
          name: "EDHa",
          description: "Payment for your product",
          handler: function (response) {
            setPaymentId(response.razorpay_payment_id);
          },
        };

        razorpay.open(options);
      }
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  return (
    <div className={styles.button}>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentId && <p>Payment ID: {paymentId}</p>}
    </div>
  );
  
};

export default RazorpayComponent;