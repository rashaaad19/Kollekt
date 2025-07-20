import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addBookmarkPost, addFavouritePost, getComments, getCurrentUser, getPostByIds, getPosts, getUserById, getUserDoc, removeBookmarkPost, removeFavouritePost, updateUser } from "../services/firestore_service";
import { toast } from "react-toastify";

const useStore = create(persist((set, get) => ({

    //------------------States-----------------
    favourites: [],
    bookmarks: [],
    currentPosts: [],
    userDoc: null,
    currentUser: null,
    isLoadingPosts: false,
    isLoadingComments: false,
    isLoadingUserDoc: false,
    isLoadingUserImg: false,

    //------------------User Doc Actions-----------------

    initializeUserDoc: (async (uid) => {
        set(({ isLoadingUserDoc: true }));
        const data = await getUserDoc(uid, set);
        set(({ userDoc: data }));

    }),
    updateUserDocImg: async (imageUrl, uid) => {
        set({ isLoadingUserImg: true });

        try {
            await updateUser(imageUrl, uid);

            // update state after successful Firestore update
            set((state) => ({
                userDoc: {
                    ...state.userDoc,
                    photoURL: imageUrl
                },
                isLoadingUserImg: false
            }));
        } catch (error) {
            set({ isLoadingUserImg: false });
            toast.error('Error: Images must be < 500kb')

        }
    }
    ,
    setCurrentUser: async () => {
        const user = await getCurrentUser();
        set({ currentUser: user })
    },
    signoutUser: (() => set(() => ({ currentUser: null })))
    ,


    //------------------Posts Actions-----------------
    getAllPosts: ((setPosts) => {
        set(({ isLoadingPosts: true }))
        //Pass setter function to control loading state after fetching
        const unsubscribe = getPosts(setPosts, set);

        return unsubscribe

    }),
    getFavPosts: (async (setPosts) => {
        const state = get();

        set(({ isLoadingPosts: true }));
        if (state.favourites.length > 0) {
            const favPosts = await getPostByIds(state.favourites, set);
            setPosts(favPosts);
        } else {
            setPosts([]);
            set(({ isLoadingPosts: false }));

        }

    }),
    getBookmarkPosts: (async (setPosts) => {
        const state = get();

        set(({ isLoadingPosts: true }));
        if (state.bookmarks.length > 0) {
            const bookmarkPosts = await getPostByIds(state.bookmarks, set);
            setPosts(bookmarkPosts);
        } else {
            setPosts([]);
            set(({ isLoadingPosts: false }));

        }

    }),
    getPostComments: (setComments, postID) => {
        set({ isLoadingComments: true });

        const unsubscribe = getComments(async (rawComments) => {
            const userIds = [...new Set(rawComments.map((c) => c.uid))];
            const userMap = {};

            await Promise.all(
                userIds.map(async (uid) => {
                    const userData = await getUserById(uid);
                    if (userData) {
                        userMap[uid] = userData;
                    }
                })
            );

            const enrichedComments = rawComments.map((comment) => ({
                ...comment,
                userImage: userMap[comment.uid]?.photoURL || null,
                userName: userMap[comment.uid]?.userName || comment.userName || "Anonymous",
            }));

            setComments(enrichedComments);
            set({ isLoadingComments: false });
        }, postID);

        return unsubscribe;
    },
    // Initialize favourites and bookmakrs from Firestore
    initializeFavourites: async (userId) => {
        const state = get();

        if (!state.currentUser || !userId) {
            return;
        };
        const userDoc = await getUserDoc(userId, set);
        set({ favourites: userDoc.favourites || [] });
    },
    initializeBookmarks: async (userId) => {
        const state = get();

        if (!state.currentUser || !userId) {
            return;
        }

        const userDoc = await getUserDoc(userId, set);
        set({ bookmarks: userDoc.bookmarks || [] });

    },
    // Toggle favourite and bookmarks with Firestore sync
    toggleFavourite: async (post) => {
        const state = get();
        const isFavourite = state.favourites.includes(post.id);
        if (!state.currentUser) {
            return;
        }

        try {
            if (isFavourite) {
                set({ favourites: state.favourites.filter(id => id !== post.id) });
                await removeFavouritePost(state.currentUser, post.id);

            } else {
                set({ favourites: [...state.favourites, post.id] });
                await addFavouritePost(state.currentUser, post.id);
            }
        } catch (error) {
            //revert UI state 
            set({ favourites: state.favourites });

        }
    },
    toggleBookmark: async (post) => {
        const state = get();
        if (!state.currentUser) {
            return;
        }
        const isBookmarked = state.bookmarks.includes(post.id);
        try {
            if (isBookmarked) {
                set({ bookmarks: state.bookmarks.filter(id => id !== post.id) });
                await removeBookmarkPost(state.currentUser, post.id);
            }
            else {
                set({ bookmarks: [...state.bookmarks, post.id] });
                await addBookmarkPost(state.currentUser, post.id);

            }

        } catch (error) {
            //revert UI state 
            set({ bookmarks: state.bookmarks });

        }
    },
}), {
    name: 'user-store',
    partialize: (state) => ({
        currentUser: state.currentUser,
    })
}));

export default useStore