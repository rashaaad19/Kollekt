import { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import useStore from "../store/store";
import Post from "../components/layout/Post";
import SkeletonPost from "./../components/skeleton/SkeletonPost";
import ProtectedRoute from "../components/ProtectedRoute";
import BookmarksIcon from "../components/icons/BookmarksIcon";
import Modal from './../components/layout/Modal';

const Bookmarks = () => {
  const currentUser = useStore((state) => state.currentUser);
  const currentBookmarks = useStore((state) => state.bookmarks);
  const initializeBookmarks = useStore((state) => state.initializeBookmarks);
  const getBookmarkPosts = useStore((state) => state.getBookmarkPosts);
  const isLoadingPosts = useStore((state) => state.isLoadingPosts);
  const [clickedPost, setClickedPost] = useState();
  const [modalType, setModalType] = useState();

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

  const handleViewComments = (e, post) => {
    setClickedPost(post);
    setModalType("comments");
    e.currentTarget.blur();
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <ProtectedRoute>
      <Sidebar>
      <Modal modalItem={clickedPost} type={modalType} />

        {!isLoadingPosts &&
          posts.map((post) => <Post post={post} key={post.id} handleViewComments={handleViewComments} />)}
        {isLoadingPosts &&
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonPost key={index} />
          ))}
{!isLoadingPosts && posts.length === 0 && (
  <div className="flex h-full flex-col items-center justify-center py-12 px-4 text-center bg-base-100 rounded-box shadow-sm">
    <div className="mb-4">
      <BookmarksIcon className="w-12 h-12 text-primary" />
    </div>
    <h2 className="text-lg font-semibold text-base-content mb-2">No bookmarks yet</h2>
    <p className="text-sm text-base-content/70">
      You haven't added any posts to your bookmarks.
    </p>
  </div>
)}
      </Sidebar>
    </ProtectedRoute>
  );
};

export default Bookmarks;
