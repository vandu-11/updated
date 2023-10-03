import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "./Signup.module.css";
import { useRouter } from 'next/router';
import Footer from "../components/Footer";

function SignupPageForm() {
  const router = useRouter();
  const [signupAs, setSignupAs] = useState("");
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isContactValid, setIsContactValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [error, setError] = useState(""); // State for displaying error message

  const isValidContactNumber = (contactNumber) => {
    const cleanedContactNumber = contactNumber.replace(/\D/g, '');
    return cleanedContactNumber.length === 10;
  };

  const handleContactNumberChange = (event) => {
    const value = event.target.value;
    const cleanedContactNumber = value.replace(/\D/g, '');

    if (cleanedContactNumber.length === 10) {
      setContactNumber(cleanedContactNumber);
      setIsContactValid(true);
    } else {
      setContactNumber(value);
      setIsContactValid(false);
    }

    if (value.length > 10) {
      setContactNumberError("Phone number should have 10 digits");
    } else {
      setContactNumberError("");
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setLoginEmail(newEmail);

    if (!newEmail) {
      setEmailError("Email is required");
    } else if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const toggleSignupForm = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!isFormValid()) {
      alert("Please fill in all required fields correctly before submitting.");
      return;
    }

    const formData = {
      Sign_up_as: signupAs,
      Salutation: salutation,
      First_name: firstName,
      Last_name: lastName,
      Contact_number: contactNumber,
      Email_id: loginEmail,
      Address: address,
      Login_username: loginEmail,
      Login_password: loginPassword,
    };

    try {
      const response = await fetch("http://3.27.93.201/create_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
  
      setSuccessMessage("Registration successful.");
  
      setTimeout(() => {
        setSuccessMessage("");
        router.push('/login'); // Navigate to the login page
      }, 1000); // Delay for 3 seconds before navigating
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (successMessage) {
      // After 2 seconds, redirect to the next page
      const redirectTimeout = setTimeout(() => {
        router.push('/login');
      }, 3000); // 2000 milliseconds (2 seconds)

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(redirectTimeout);
    }
  }, [successMessage, router]);




  const isFormValid = () => {
    return (
      signupAs !== "" &&
      salutation !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      isContactValid &&
      loginEmail !== "" &&
      loginPassword !== "" &&
      !emailError
    );
  };




   

  return (
    <div>
      <div className={styles.container}>
        <Header />
      </div>
      <div className={styles.formContainer}>
        <h1>Registration Page</h1>
        <form>
          <label>
            Signup as:
            <select value={signupAs} onChange={(e) => setSignupAs(e.target.value)}>
              <option value="">Select any one</option>
              <option value="coach">Coach</option>
              <option value="parent">Parent</option>
            </select>
          </label>
          <label>
            Salutation:
            <select value={salutation} onChange={(e) => setSalutation(e.target.value)}>
              <option value="">Select any one</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </label>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              value={contactNumber}
              onChange={handleContactNumberChange}
            />
            {!isContactValid && (
              <div className={styles.error}>Phone number should have 10 digits</div>
            )}
          </label>
          <label>
            Address:
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="4"></textarea>
          </label>
          <label>
            Login Email:
            <input
              type="email"
              value={loginEmail}
              onChange={handleEmailChange}
              className={emailError ? styles.invalid : ''}
            />
            {emailError && (
              <div className={styles.error}>{emailError}</div>
            )}
          </label>
          <label>
            Login Password:
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </label>
          <input
            type="submit"
            onClick={toggleSignupForm}
            value="Submit"
            className={styles.submitButton}
            
          />
        </form>
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        

          {/* Display the error message */}
          {error && <p className={styles.error}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
}


export default SignupPageForm;
