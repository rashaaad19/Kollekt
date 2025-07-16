import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addFavouritePost, getUserDoc, removeFavouritePost } from "../services/firestore_service";

const useStore = create(persist((set, get) => ({
    //------------------States-----------------
    favourites: [],
    bookmarks: [],
    currentPosts: [],
    currentUser: null,

    //------------------Actions-----------------
    
    // Initialize favourites from Firestore
    initializeFavourites: async (userId) => {
        if (!userId) return;
        const userDoc = await getUserDoc(userId);
        set({ favourites: userDoc.favourites || [] });
    },

    // Toggle favourite with Firestore sync
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
    setBookmarks: (posts) => set(() => ({ bookmarks: [...posts] })),
    addBookmark: (post) => set(state => ({ bookmarks: [...state.bookmarks, post] })),
    removeBookmark: (post) => set(state => ({ bookmarks: state.bookmarks.filter(b => b.id !== post.id) })),
    setCurrentUser: (currentUser) => set(() => ({ currentUser }))
}), {
    name: 'user-store',
    partialize: (state) => ({
        currentUser: state.currentUser,
    })
}));

export default useStore