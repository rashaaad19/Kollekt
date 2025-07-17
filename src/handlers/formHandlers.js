import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { createUser, updatePost } from "../services/firestore_service";

export const handleLogin = async (values, setErrors, navigate, setCurrentUser) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        setCurrentUser();
        console.log("Sign in successfully ");
        navigate("/home");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-credential') {
            setErrors({ general: "Invalid email or password" });
        } else {
            setErrors({ general: "Something went wrong. Please try again." });
            console.log(error)
        }

    }
}

export const handleSignup = async (values, setErrors, navigate, setCurrentUser) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        const user = userCredential.user;

        //Update displayName of the user with userName from the form
        await updateProfile(user, {
            displayName: values.name,
        });

        //create new document for the user
        createUser(user)
        setCurrentUser();
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

export const handleSignout = async (navigate, signoutUser) => {
    try {
        await signOut(auth);
        signoutUser();
        console.log("Sign-out successful.");
        navigate('/')
    } catch (error) {
        console.error("An error occurred during sign-out:", error);
    }
}


export const handleEditPost = async (values, setSubmitting, id) => {
    await updatePost(id, values);
    setSubmitting(false)
    document.getElementById("my_modal_2").close();

}