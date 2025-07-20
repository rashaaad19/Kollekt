import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { createUser, updatePost } from "../services/firestore_service";

export const handleLogin = async (values, setErrors, navigate, setCurrentUser, initializeUserDoc, setSubmitting) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        setCurrentUser();
        initializeUserDoc(userCredential.user.uid)
        navigate("/", { replace: true });
        setSubmitting(false);
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

export const handleSignup = async (values, setErrors, navigate, setCurrentUser, initializeUserDoc,setSubmitting) => {
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
        initializeUserDoc(user.uid)
        navigate("/", { replace: true });
        setSubmitting(false);
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