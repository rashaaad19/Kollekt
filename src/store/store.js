import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addBookmarkPost, addFavouritePost, getComments, getCurrentUser, getPostByIds, getPosts, getUserDoc, removeBookmarkPost, removeFavouritePost } from "../services/firestore_service";

const useStore = create(persist((set, get) => ({

    //------------------States-----------------
    favourites: [],
    bookmarks: [],
    currentPosts: [],
    currentUser: null,
    isLoadingPosts: false,
    isLoadingComments:false,

    //------------------Actions-----------------

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
        }

    }),
    getPostComments: ( (setComments, postID) => {
        console.log(postID)
        set(({ isLoadingComments: true }))
        const unsubscribe = getComments(setComments, postID, set);
        return unsubscribe;

    }),
    // Initialize favourites and bookmakrs from Firestore
    initializeFavourites: async (userId) => {
        if (!userId) return;
        const userDoc = await getUserDoc(userId);
        set({ favourites: userDoc.favourites || [] });
    },
    initializeBookmarks: async (userId) => {
        if (!userId) return;
        const userDoc = await getUserDoc(userId);
        set({ bookmarks: userDoc.bookmarks || [] });

    },
    // Toggle favourite and bookmarks with Firestore sync
    toggleFavourite: async (post) => {
        const state = get();
        console.log(post)
        const isFavourite = state.favourites.includes(post.id);

        try {
            if (isFavourite) {
                set({ favourites: state.favourites.filter(id => id !== post.id) });
                await removeFavouritePost(state.currentUser, post.id);
                console.log('removed')

            } else {
                set({ favourites: [...state.favourites, post.id] });
                await addFavouritePost(state.currentUser, post.id);
                console.log('added')
            }
        } catch (error) {
            console.error("Error toggling favourite:", error);
            //revert UI state 
            set({ favourites: state.favourites });

        }
    },
    toggleBookmark: async (post) => {
        const state = get();
        console.log(state, post);
        const isBookmarked = state.bookmarks.includes(post.id);
        try {
            if (isBookmarked) {
                set({ bookmarks: state.bookmarks.filter(id => id !== post.id) });
                await removeBookmarkPost(state.currentUser, post.id);
                console.log('removed')
            }
            else {
                set({ bookmarks: [...state.bookmarks, post.id] });
                await addBookmarkPost(state.currentUser, post.id);
                console.log('added')

            }

        } catch (error) {
            console.error("Error toggling bookmark:", error);
            //revert UI state 
            set({ bookmarks: state.bookmarks });

        }
    },
    setCurrentUser: async () => {
        const user = await getCurrentUser();
        console.log(user);
        set({ currentUser: user })
    },
    signoutUser: (() => set(() => ({ currentUser: null })))
}), {
    name: 'user-store',
    partialize: (state) => ({
        currentUser: state.currentUser,
    })
}));

export default useStore