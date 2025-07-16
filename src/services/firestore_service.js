import { doc, setDoc, serverTimestamp, addDoc, collection, onSnapshot, query, orderBy, updateDoc, deleteDoc, arrayUnion, arrayRemove, getDoc, where, documentId, getDocs } from "firebase/firestore";
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


export const getUserDoc = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.data()
}

export const addPost = async (userData, post) => {
    try {
        const postsRef = collection(db, "posts");
        await addDoc(postsRef, {
            userName: userData.displayName,
            userImage: userData.photoURL,
            uid: userData.uid,
            createdAt: serverTimestamp(),
            postContent: post.content,
            image: post.image,
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

export const getPostByIds = async (ids) => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];
    querySnapshot.forEach((doc) => {
        if (ids.includes(doc.id)) {
            posts.push({
                id: doc.id,
                ...doc.data()
            });
        }
    });
    return posts;
}

export const updatePost = async (id, values) => {
    const postRef = doc(db, 'posts', id);
    console.log(values)
    await updateDoc(postRef, {
        postContent: values.postContent,
        image:values.image,
        updatedAt:serverTimestamp(),
    })
}

export const deletePost = async (id) => {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef, id)
}


export const addFavouritePost = async (userData, id) => {
    console.log(userData, id)
    try {
        const userRef = doc(db, "users", userData.uid);
        await updateDoc(userRef, {
            favourites: arrayUnion(id)  // assuming post.id exists
        });
        console.log("Post added to favourites");
    } catch (error) {
        console.error("Error adding to favourites:", error);
    }
};

export const removeFavouritePost = async (userData, id) => {
    try {
        const userRef = doc(db, "users", userData.uid);
        await updateDoc(userRef, {
            favourites: arrayRemove(id)
        });
        console.log("Post removed from favourites", id);
    } catch (error) {
        console.error("Error removing from favourites:", error);
    }

};




export const addBookmarkPost = async (userData, id) => {
    try {
        const userRef = doc(db, 'users', userData.uid);
        await updateDoc(userRef, {
            bookmarks: arrayUnion(id)
        });
        console.log('Post added to bookmarks')
    } catch (error) {
        console.log("Error adding to bookmarks: ", error)
    }
}
export const removeBookmarkPost = async (userData, id) => {
    try {
        const userRef = doc(db, 'users', userData.uid);
        await updateDoc(userRef, {
            bookmarks: arrayRemove(id)
        });
        console.log('Post removed from bookmarks')
    } catch (error) {
        console.log("Error removing from bookmarks: ", error)
    }
}


