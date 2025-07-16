import React, { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import useStore from "../store/store";
import { getPostByIds } from "./../services/firestore_service";
import Post from "../components/layout/Post";

const Favourites = () => {
  const currentUser = useStore((state) => state.currentUser);
  const favourites = useStore((state) => state.favourites); // Get current favourites from store
  const initializeFavourites = useStore((state) => state.initializeFavourites);
  const [posts, setPosts] = useState([]);

  // Initialize favourites when component mounts
  //TODO: Custom hook
  useEffect(() => {
    if (currentUser?.uid) {
      initializeFavourites(currentUser.uid);
    }
  }, [currentUser?.uid, initializeFavourites]);

  //Effect to run when the favourites state change
  useEffect(() => {
    const getUserPosts = async () => {
      if (favourites.length > 0) {
        const favPosts = await getPostByIds(favourites);
        setPosts(favPosts);
      } else {
        setPosts([]);
      }
    };
    getUserPosts();
  }, [favourites]);

  return (
    <Sidebar>
      <div>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </Sidebar>
  );
};

export default Favourites;
