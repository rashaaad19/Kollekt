import { useEffect, useRef, useState } from "react";
import Post from "../layout/Post";
import PeopleMenu from "./PeopleMenu";
import NewPost from "./NewPost";
import Modal from "../layout/Modal";
import SkeletonPost from "../skeleton/SkeletonPost";
import { addPost, deletePost } from "../../services/firestore_service";
import useStore from "../../store/store";

const HomeLayout = () => {
  //------------------------------------States-----------------------------

  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [posts, setPosts] = useState([]);
  const [clickedPost, setClickedPost] = useState();
  const [modalType, setModalType] = useState();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const initializeFavourites = useStore((state) => state.initializeFavourites);
  const initializeBookmarks = useStore((state) => state.initializeBookmarks);
  const currentUser = useStore((state) => state.currentUser);
  const getAllPosts = useStore((state) => state.getAllPosts);
  const isLoadingPosts = useStore((state) => state.isLoadingPosts);
  const fileInputRef = useRef();
  console.log(currentUser);
  //------------------------------------Handlers-----------------------------

  //TODO: Custom hook
  useEffect(() => {
    if (currentUser?.uid) {
      initializeFavourites(currentUser.uid);
      initializeBookmarks(currentUser.uid);
    }
  }, [currentUser?.uid, initializeFavourites, initializeBookmarks]);

  useEffect(() => {
    const unsubscribe = getAllPosts(setPosts);

    return () => unsubscribe();
  }, [getAllPosts]);

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handlePostSubmit = (e) => {
    setImageError("");
    e.preventDefault();
    if (!postImage) {
      setImageError("An image is required to submit a post.");
      return;
    }
    console.log(newPost, "from submit handler");
    e.target.reset();
    setPostImage(null);
    const postData = {
      content: newPost,
      author: currentUser.displayName,
      image: postImage,
    };
    addPost(currentUser, postData);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageError("");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(base64String);
        setPostImage(base64String);
      };
    } else {
      setPostImage(null);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelImg = () => {
    setPostImage(null);
  };

  const handleEdit = (e, post) => {
    console.log("Edit post:", post);
    console.log(post);
    setClickedPost(post);
    setModalType("edit");
    e.currentTarget.blur();
    document.getElementById("my_modal_2").showModal();
  };

  const handleViewComments = (e, post) => {
    console.log("Show comments!");
    setClickedPost(post);
    setModalType("comments");
    e.currentTarget.blur();
    document.getElementById("my_modal_2").showModal();
  };

  const handleDelete = (e, postId) => {
    console.log("Delete post:", postId);
    e.currentTarget.blur();
    deletePost(postId);
    // Show confirmation and delete post from Firestore
  };

  const handleCommentClick = () => {
    console.log("clicked");
    if (!currentUser) {
      return;
    }
    setShowCommentInput(!showCommentInput);
  };

  //------------------------------------Render-----------------------------

  return (
    <>
      <Modal modalItem={clickedPost} type={modalType} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-base-200 px-10 py-5">
        <div className="lg:col-span-2 flex flex-col gap-10">
          {currentUser && (
            <NewPost
              postImage={postImage}
              handlePostSubmit={handlePostSubmit}
              handleImageSelect={handleImageSelect}
              handleCancelImg={handleCancelImg}
              handlePhotoClick={handlePhotoClick}
              handlePostChange={handlePostChange}
              imageError={imageError}
              fileInputRef={fileInputRef}
            />
          )}

          {!isLoadingPosts &&
            posts.map((post) => (
              <Post
                post={post}
                key={post.id}
                handlePostEdit={handleEdit}
                handleViewComments={handleViewComments}
                handleDelete={handleDelete}
                handleCommentClick={handleCommentClick}
                showCommentInput={showCommentInput}
              />
            ))}
          {isLoadingPosts &&
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPost key={index} />
            ))}
        </div>

        <PeopleMenu />
      </div>
    </>
  );
};

export default HomeLayout;
