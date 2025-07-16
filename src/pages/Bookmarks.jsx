import { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import useStore from "../store/store";
import { getPostByIds } from "../services/firestore_service";
import Post from "../components/layout/Post";

const Bookmarks = () => {
  const currentUser = useStore((state) => state.currentUser);
  const currentBookmarks = useStore((state) => state.bookmarks);
  const initializeBookmarks = useStore((state) => state.initializeBookmarks);
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
    const getUserPosts = async () => {
      if (currentBookmarks.length > 0) {
        const favPosts = await getPostByIds(currentBookmarks);
        setPosts(favPosts);
      } else {
        setPosts([]);
      }
    };
    getUserPosts();
  }, [currentBookmarks]);

  return (
    <Sidebar>
      <div>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>{" "}
    </Sidebar>
  );
};

export default Bookmarks;
