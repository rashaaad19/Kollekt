import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addBookmarkPost, addFavouritePost, getUserDoc, removeBookmarkPost, removeFavouritePost } from "../services/firestore_service";

const useStore = create(persist((set, get) => ({

    //------------------States-----------------
    favourites: [],
    bookmarks: [],
    currentPosts: [],
    currentUser: null,

    //------------------Actions-----------------

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
    setCurrentUser: (currentUser) => set(() => ({ currentUser }))
}), {
    name: 'user-store',
    partialize: (state) => ({
        currentUser: state.currentUser,
    })
}));

export default useStore