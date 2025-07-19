import React, { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import useStore from "../store/store";
import Post from "../components/layout/Post";
import SkeletonPost from "../components/skeleton/SkeletonPost";
import ProtectedRoute from "../components/ProtectedRoute";

const Favourites = () => {
  const currentUser = useStore((state) => state.currentUser);
  const favourites = useStore((state) => state.favourites); // Get current favourites from store
  const initializeFavourites = useStore((state) => state.initializeFavourites);
  const isLoadingPosts = useStore((state) => state.isLoadingPosts);
  const getFavPosts = useStore((state) => state.getFavPosts);

  const [posts, setPosts] = useState([]);

  console.log(isLoadingPosts);

  // Initialize favourites when component mounts
  //TODO: Custom hook
  useEffect(() => {
    if (currentUser?.uid) {
      initializeFavourites(currentUser.uid);
    }
  }, [currentUser?.uid, initializeFavourites]);

  //Effect to run when the favourites state change
  useEffect(() => {
    getFavPosts(setPosts);
  }, [getFavPosts, favourites]);

  return (
    <ProtectedRoute>
      <Sidebar>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
        {isLoadingPosts &&
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonPost key={index} />
          ))}
      </Sidebar>
    </ProtectedRoute>
  );
};

export default Favourites;
