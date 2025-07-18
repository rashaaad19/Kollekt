import FavsIcon from "../icons/FavsIcon";
import BookmarksIcon from "../icons/BookmarksIcon";
import CommentIcon from "../icons/CommentIcon";
import SendIcon from "../icons/SendIcon";
import Input from "./Input";
import useStore from "../../store/store";
import MoreIcon from "../icons/MoreIcon";
import { deletePost } from "../../services/firestore_service";
import userAvatar from "../../assets/avatar-placeholder.png"
const Post = ({ post, handlePostEdit }) => {
  //------------------------------------States-----------------------------
  const currentUser = useStore((state) => state.currentUser);
  const bookmarks = useStore((state) => state.bookmarks);
  const isBookmarked = bookmarks.some((bookmark) => bookmark === post.id);
  const toggleFavourite = useStore((state) => state.toggleFavourite);
  const toggleBookmark = useStore((state) => state.toggleBookmark);
  const favourites = useStore((state) => state.favourites);
  const isFavourite = favourites.includes(post.id);

  const handleDelete = (e, postId) => {
    console.log("Delete post:", postId);
    e.currentTarget.blur();
    deletePost(postId);
    // Show confirmation and delete post from Firestore
  };

  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  //------------------------------------Render-----------------------------
  return (
    <div className="card bg-base-100  shadow-sm p-4 space-y-3 w-full sm:w-xl">
      {/* Header: Avatar + Username */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={userAvatar}
                alt="User Avatar"
              />
            </div>
          </div>
          <h2 className="font-semibold">{post.userName}</h2>
        </div>
        {currentUser.uid === post.uid && (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-sm btn-circle btn-ghost">
              <MoreIcon />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <button onClick={(e) => handlePostEdit(e, post)}>Edit</button>
              </li>
              <li>
                <button onClick={(e) => handleDelete(e, post.id)}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}{" "}
      </div>

      {/* Post Text */}
      <div>
        <p className="text-base-content text-left">{post.postContent}</p>
      </div>

      {/* Post Image */}
      <figure>
        <img
          src={
            post.image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="Post content"
          className="rounded-lg max-h-96"
        />
      </figure>

      {/* Action Icons */}
      <div className="card-actions justify-start px-2 pt-2">
        <button
          className="btn btn-circle btn-ghost btn-sm flex items-center gap-1"
          onClick={() => toggleFavourite(post)}
        >
          <FavsIcon
            color={"transparent"}
            fillColor={"oklch(63% 0.237 25.331)"}
            isFavourite={isFavourite}
          />
        </button>
        {/* <button className="btn btn-circle btn-ghost btn-sm">
          <CommentIcon color={"oklch(43% 0 0)"} />
        </button> */}
        <button
          className="btn btn-circle btn-ghost btn-sm"
          onClick={() => toggleBookmark(post)}
        >
          <BookmarksIcon
            fillColor={"oklch(68% 0.169 237.323)"}
            color={"transparent"}
            isBookmarked={isBookmarked}
          />
        </button>
      </div>

      {/* TODO: Add Comment Section */}
      {/* <div className="flex items-center gap-2 border-t pt-2 mt-2 border-base-300">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src="https://i.pravatar.cc/300?img=12" alt="Your Avatar" />
          </div>
        </div>
        <Input
          type="text"
          placeholder="Add a comment..."
          className="input input-bordered input-sm flex-1 focus:outline-none focus:ring-0 focus:border-primary"
        />
        <button className="btn btn-sm btn-primary">
          <SendIcon />
        </button>
      </div> */}
    </div>
  );
};

export default Post;
