import { doc, setDoc, serverTimestamp, addDoc, collection, onSnapshot, query, orderBy, updateDoc, deleteDoc, arrayUnion, arrayRemove, getDoc, where, documentId, getDocs, increment } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

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

export const getCurrentUser = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user || null);
        });
    });
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


export const getPosts = (callback, zustandSet) => {
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

        zustandSet({ isLoadingPosts: false })
    });

    return unsub;
};

export const getPostByIds = async (ids, zustandSet) => {
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
    zustandSet({ isLoadingPosts: false })

    return posts;
}

export const updatePost = async (id, values) => {
    const postRef = doc(db, 'posts', id);
    console.log(values)
    await updateDoc(postRef, {
        postContent: values.postContent,
        image: values.image,
        updatedAt: serverTimestamp(),
    })
}

export const deletePost = async (id) => {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef, id)
}


export const addFavouritePost = async (userData, postId) => {
    console.log(userData, postId)
    const userRef = doc(db, "users", userData.uid);
    const postRef = doc(db, "posts", postId);

    try {
        await updateDoc(userRef, {
            favourites: arrayUnion(postId),
        });
        await updateDoc(postRef, {
            favouritesNumber: increment(1),
        })
        console.log("Post added to favourites");
    } catch (error) {
        console.error("Error adding to favourites:", error);
    }
};

export const removeFavouritePost = async (userData, postId) => {
    const userRef = doc(db, "users", userData.uid);
    const postRef = doc(db, "posts", postId);

    try {
        await updateDoc(userRef, {
            favourites: arrayRemove(postId),

        });
        await updateDoc(postRef, {
            favouritesNumber: increment(-1),
        })

        console.log("Post removed from favourites", postId);
    } catch (error) {
        console.error("Error removing from favourites:", error);
    }

};




export const addBookmarkPost = async (userData, postId) => {
    const userRef = doc(db, 'users', userData.uid);
    const postRef = doc(db, "posts", postId);

    try {
        await updateDoc(userRef, {
            bookmarks: arrayUnion(postId)
        });
        await updateDoc(postRef, {
            bookmarksNumber: increment(1),
        })
        console.log('Post added to bookmarks')
    } catch (error) {
        console.log("Error adding to bookmarks: ", error)
    }
}
export const removeBookmarkPost = async (userData, postId) => {
    const userRef = doc(db, 'users', userData.uid);
    const postRef = doc(db, "posts", postId);

    try {
        await updateDoc(userRef, {
            bookmarks: arrayRemove(postId)
        });
        await updateDoc(postRef, {
            bookmarksNumber: increment(-1),
        })
        console.log('Post removed from bookmarks')
    } catch (error) {
        console.log("Error removing from bookmarks: ", error)
    }
}


export const addComment = async (commentData, postID) => {
    const commentsRef = collection(db, 'posts', postID, 'comments');
    const postRef = doc(db, 'posts', postID)
    console.log(commentData)
    try {
        //Add the new comment to the sub collection
        await addDoc(commentsRef, {
            uid: commentData.uid,
            userName: commentData.userName,
            // userImg : commentData.photoURL,
            createdAt: serverTimestamp(),
            comment: commentData.comment,

        })
        await updateDoc(postRef, {
            commentsCount: increment(1),
        })

        console.log('Added comment', commentData.comment, ' To post: ', postID, ' Successfully')
    } catch (error) {
        console.log('Error adding comment to post: ', postID, error)
    }
}

export const getComments = (callback, postID, zustandSet) => {
    const commentsQuery = query(
        collection(db, 'posts', postID, 'comments'),
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(commentsQuery, (snapshot) => {
        const commentsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(commentsArr);

        zustandSet({ isLoadingComments: false })
    });

    return unsub;
};
