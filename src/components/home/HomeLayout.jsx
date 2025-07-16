import { useEffect, useRef, useState } from "react";
import Post from "../layout/Post";
import PeopleMenu from "./PeopleMenu";
import NewPost from "./NewPost";
import {
  addPost,
  getPosts,
  getUserDoc,
} from "../../services/firestore_service";
import useStore from "../../store/store";

const HomeLayout = () => {
  //------------------------------------States-----------------------------

  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [posts, setPosts] = useState([]);
  const currentUser = useStore((state) => state.currentUser);
  const setFavourites = useStore((state) => state.setFavourites);
  const setBookmarks = useStore((state) => state.setBookmarks);
  const fileInputRef = useRef();
  const initializeFavourites = useStore((state) => state.initializeFavourites);

  //------------------------------------Handlers-----------------------------

  //TODO: Custom hook
  useEffect(() => {
    if (currentUser?.uid) {
      initializeFavourites(currentUser.uid);
    }
  }, [currentUser?.uid, initializeFavourites]);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

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

  //------------------------------------Render-----------------------------

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-base-200 px-10 py-5">
      <div className="lg:col-span-2 flex flex-col gap-10">
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

        {/* Posts */}
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>

      <PeopleMenu />
    </div>
  );
};

export default HomeLayout;
