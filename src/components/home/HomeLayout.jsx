import { useRef, useState } from "react";
import Post from "../layout/Post";
import PeopleMenu from "./PeopleMenu";
import NewPost from "./NewPost";

const HomeLayout = () => {
  const [newPost, setNewPost] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log(newPost, "from submit handler");
    e.target.reset();
    setImagePreview(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      console.log(imageURL);
      setImagePreview(imageURL);
    } else {
      setImagePreview(null);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelImg = () => {
    setImagePreview(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-base-200 px-10 py-5">
      <div className="lg:col-span-2 flex flex-col gap-10">
        <NewPost
          imagePreview={imagePreview}
          handlePostSubmit={handlePostSubmit}
          handleImageSelect={handleImageSelect}
          handleCancelImg={handleCancelImg}
          handlePhotoClick={handlePhotoClick}
          handlePostChange={handlePostChange}
          fileInputRef={fileInputRef}
        />

        {/* Posts */}
        <Post />
        <Post />
        <Post />
        <Post />
      </div>

      <PeopleMenu />
    </div>
  );
};

export default HomeLayout;
