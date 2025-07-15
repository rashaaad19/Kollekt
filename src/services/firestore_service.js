import { doc, setDoc, serverTimestamp, addDoc, collection, onSnapshot, query, orderBy, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createUser = async (userData) => {
    console.log(userData);
    try {
        const userRef = doc(db, "users", userData.uid);
        await setDoc(userRef, {
            userName: userData.displayName,
            uid: userData.uid,
            createdAt: serverTimestamp(),
        });
        console.log("Document successfully written with ID: ", userData.uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};


export const addPost = async (userData, post) => {
    try {
        const postsRef = collection(db, "posts");
        await addDoc(postsRef, {
            userName: userData.displayName,
            uid: userData.uid,
            createdAt: serverTimestamp(),
            postContent: post.content,
            image:post.image
        });
        console.log("Document successfully written with ID: ", userData.uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}


export const getPosts = (callback) => {
    const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(postsQuery, (snapshot) => {
        const postsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(postsArr);
    });

    return unsub;
};


export const updatePost = async (id, newContent) => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
        postContent: newContent
    })
}

export const deletePost = async (id) => {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef, id)
}