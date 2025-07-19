import { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import useStore from "../store/store";
import Post from "../components/layout/Post";
import SkeletonPost from "./../components/skeleton/SkeletonPost";
import ProtectedRoute from "../components/ProtectedRoute";

const Bookmarks = () => {
  const currentUser = useStore((state) => state.currentUser);
  const currentBookmarks = useStore((state) => state.bookmarks);
  const initializeBookmarks = useStore((state) => state.initializeBookmarks);
  const getBookmarkPosts = useStore((state) => state.getBookmarkPosts);
  const isLoadingPosts = useStore((state) => state.isLoadingPosts);

  const [posts, setPosts] = useState([]);

  // Initialize favourites when component mounts
  //TODO: Custom hook
  useEffect(() => {
    if (currentUser?.uid) {
      initializeBookmarks(currentUser.uid);
    }
  }, [currentUser?.uid, initializeBookmarks]);

  //Effect to run when the favourites state change
  useEffect(() => {
    getBookmarkPosts(setPosts);
  }, [getBookmarkPosts, currentBookmarks]);

  return (
    <ProtectedRoute>
      <Sidebar>
        {!isLoadingPosts &&
          posts.map((post) => <Post post={post} key={post.id} />)}
        {isLoadingPosts &&
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonPost key={index} />
          ))}
      </Sidebar>
    </ProtectedRoute>
  );
};

export default Bookmarks;
