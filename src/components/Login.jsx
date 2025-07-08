import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";

const Login = () => {
  const [error, setError] = useState(null); // Single state for errors
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const userData = new FormData(event.target);
    const userEmail = userData.get("email");
    const userPassword = userData.get("password");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      setError(null); // Reset error on successful login
      console.log("Sign in successfully");
      navigate("/profile");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError({ message: errorMessage }); // Set error message
    }
  };

  return (
    <form className="form-container" onSubmit={handleLogin}>
      <h1>Login</h1>
      <div className="input-container">
        <label htmlFor="email">Enter Your Email</label>
        <input type="email" name="email" required />
      </div>
      <div className="input-container">
        <label htmlFor="password">Enter Your Password</label>
        <input type="password" name="password" required />
      </div>
      <button className="submit-button">Login</button>
      {error && <p className="error">{error.message}</p>} {/* Display error */}
      <p>
        Don't have an account? <Link to="/"> Signup now</Link>
      </p>
    </form>
  );
};

export default Login;
