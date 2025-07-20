import { doc, setDoc, serverTimestamp, addDoc, collection, onSnapshot, query, orderBy, updateDoc, deleteDoc, arrayUnion, arrayRemove, getDoc, where, documentId, getDocs, increment } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';




//------------------User auth and doc functions-----------------

export const createUser = async (userData) => {
    try {
        const userRef = doc(db, "users", userData.uid);
        await setDoc(userRef, {
            userName: userData.displayName,
            uid: userData.uid,
            createdAt: serverTimestamp(),
            favourites: [],
            bookmarks: [],


        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const updateUser = async (img, uid) => {
    const userRef = doc(db, 'users', uid);

    try {
        const postsRef = collection(db, 'posts');
        const postsQuery = query(postsRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(postsQuery);

        if (querySnapshot.empty) {
            return;
        }

        const updatePromises = querySnapshot.docs.map((docSnap) => {
            return updateDoc(doc(db, 'posts', docSnap.id), {
                userImage: img
            });
        });

        await Promise.all(updatePromises);
        await updateDoc(userRef, {
            photoURL: img
        });
    } catch (error) {
        console.error('❌ Error updating image:', error);
        throw new Error(error)

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


export const getUserDoc = async (uid, zustandSet) => {

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    zustandSet({ isLoadingUserDoc: false })
    return userDoc.data()
}

export const getUserById = async (uid) => {
    if (!uid) return null;
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
};


//------------------Posts functions-----------------

export const addPost = async (userData, post) => {
    const postsRef = collection(db, "posts");
    const userRef = doc(db, 'users', userData.uid);

    try {
        await addDoc(postsRef, {
            userName: userData.userName,
            userImage: userData.photoURL || '',
            uid: userData.uid,
            createdAt: serverTimestamp(),
            postContent: post.content,
            image: post.image,
        });
        await updateDoc(userRef, {
            postsNumber: increment(1),
        })
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
    await updateDoc(postRef, {
        postContent: values.postContent,
        image: values.image,
        updatedAt: serverTimestamp(),
    })
}

export const deletePost = async (id, userData) => {
    const postRef = doc(db, 'posts', id);
    const userRef = doc(db, 'users', userData.uid)
    await deleteDoc(postRef, id)
    await updateDoc(userRef, {
        postsNumber: increment(-1),
    })


}

export const addFavouritePost = async (userData, postId) => {
    const userRef = doc(db, "users", userData.uid);
    const postRef = doc(db, "posts", postId);

    try {
        await updateDoc(userRef, {
            favourites: arrayUnion(postId),
        });
        await updateDoc(postRef, {
            favouritesNumber: increment(1),
        })
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
    } catch (error) {
        console.log("Error removing from bookmarks: ", error)
    }
}



//------------------Comments functions-----------------


export const addComment = async (commentData, postID) => {
    const commentsRef = collection(db, 'posts', postID, 'comments');
    const postRef = doc(db, 'posts', postID)
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

    } catch (error) {
        console.log('Error adding comment to post: ', postID, error)
    }
}

export const getComments = (callback, postID) => {
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

    });

    return unsub;
};
