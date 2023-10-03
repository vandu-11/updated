// utils/razorpay.js
export function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject; // Handle script loading error
      document.body.appendChild(script);
    });
  }
  
  export function createRazorpayInstance(options) {
    return new window.Razorpay(options);
  }
  