import { create } from "zustand";

const useStore = create(set => ({
    favourites: [],
    bookmarks: [],
    addFavourite: (post) => set(state => ({ favourites: [...state.favourites, post] })),
    addBookmark: (post) => set(state => ({ bookmarks: [...state.bookmarks, post] })),
    removeFavourite: (post) => set(state => ({ favourites: state.favourites.filter(stateFavs => stateFavs.id !== post.id) })),
    removeBookmark: (post) => set(state => ({ bookmarks: state.bookmarks.filter(stateBookmarks => stateBookmarks.id !== post.id) }))
}))

export default useStore