import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const handleLogin = async (values, setErrors, navigate) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        const user = userCredential.user;
        console.log("Sign in successfully ", user);
        navigate("/home");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-credential') {
            setErrors({ general: "Invalid email or password" });
        } else {
            setErrors({ general: "Something went wrong. Please try again." });
        }

    }
}

export const handleSignup = async (values, setErrors, navigate) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        const user = userCredential.user;
        console.log("Signup successfully ", user);
        navigate("/home");
    } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            setErrors({ general: "Email already in use" });
        } else {
            setErrors({ general: "Something went wrong. Please try again." });
        }

    }

}

export const handleSignout = async (navigate) => {
    try {
        await signOut(auth);
        console.log("Sign-out successful.");
        navigate('/')
    } catch (error) {
        console.error("An error occurred during sign-out:", error);
    }
}