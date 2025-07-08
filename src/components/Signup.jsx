import { useState } from "react";
import "./Form.css";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../services/firestore_service";

const Signup = () => {
  console.log(auth.currentUser)
  
  const [error, setError] = useState(null); // Single state for errors
  const navigate = useNavigate();
  const handleSignUp = async (event) => {
    event.preventDefault();
    const userData = new FormData(event.target);
    const userEmail = userData.get("email");
    const userPassword = userData.get("password");
    const userName = userData.get("name");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: userName,
      });

      //create new document for the user
      createUser(user)

      setError(null); // Reset error on successful signup
      //navigate to profile page
      navigate("/profile");
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      setError({ message: errorMessage }); // Set error message
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSignUp}>
        <h1>Signup</h1>
        <div className="input-container">
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="input-container">
          <label htmlFor="name">Enter Your Username</label>
          <input type="text" name="name" required />
        </div>
        <div className="input-container">
          <label htmlFor="password">Enter Your Password</label>
          <input type="password" name="password" required />
        </div>
        <button className="submit-button">Signup</button>
        {error && <p className="error">{error.message}</p>}{" "}
        {/* Display error */}
        <p>
          Do you have an account?
          <Link to="login"> Login now</Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
