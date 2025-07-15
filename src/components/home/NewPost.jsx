import Input from "../layout/Input";
import PhotoIcon from "../icons/PhotoIcon";
import CloseIcon from "../icons/CloseIcon";

const NewPost = ({
  handlePostSubmit,
  handlePostChange,
  handleImageSelect,
  fileInputRef,
  handlePhotoClick,
  postImage,
  handleCancelImg,
  imageError,
}) => {
  return (
    <>
      {/* New Post Form */}
      <form
        onSubmit={handlePostSubmit}
        className="w-full sm:w-xl flex flex-col gap-4 bg-base-100 p-5 rounded-lg shadow-sm  "
      >
        <div className="flex items-center gap-3">
          <Input
            onChange={handlePostChange}
            placeholder={"What's on your mind?"}
            className={"p-5 w-full"}
          />
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            ref={fileInputRef}
            className="hidden"
          />
          {/* Icon button triggers file input */}
          <button
            type="button"
            onClick={handlePhotoClick}
            className="btn btn-sm btn-circle"
            title="Add image"
          >
            <PhotoIcon />
          </button>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>

        {/* Image Preview */}
        {postImage && (
          <div className="relative w-full max-w-sm p-3 rounded-xl bg-white border border-base-300 shadow-lg">
            <img
              src={postImage}
              alt="Preview"
              className="rounded-lg object-cover w-full max-h-48"
            />
            <button
              className=" bg-secondary/80 p-1 rounded-2xl absolute top-2 right-2 m-2 cursor-pointer"
              type="button"
              onClick={handleCancelImg}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Missing image error */}
        {<p className={`h-2 text-left text-error text-xs ${imageError?`visible`:`invisible`}`}> {imageError}</p>}
      </form>
    </>
  );
};

export default NewPost;
