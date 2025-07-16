import FavsIcon from "../icons/FavsIcon";
import BookmarksIcon from "../icons/BookmarksIcon";
import CommentIcon from "../icons/CommentIcon";
import SendIcon from "../icons/SendIcon";
import Input from "./Input";
import useStore from "../../store/store";
import {
  addBookmarkPost,
  addFavouritePost,
  removeBookmarkPost,
  removeFavouritePost,
} from "../../services/firestore_service";
import { auth } from "../../firebase";

const Post = ({ post }) => {
  //------------------------------------States-----------------------------
  const bookmarks = useStore((state) => state.bookmarks);
  const addFavourite = useStore((state) => state.addFavourite);
  const addBookmark = useStore((state) => state.addBookmark);
  const removeFavourite = useStore((state) => state.removeFavourite);
  const removeBookmark = useStore((state) => state.removeBookmark);
  const isBookmarked = bookmarks.some((bookmark) => bookmark === post.id);
  const user = auth.currentUser;
  const toggleFavourite = useStore(state => state.toggleFavourite);
  const favourites = useStore(state => state.favourites);
  const isFavourite = favourites.includes(post.id);


  //------------------------------------Handlers-----------------------------

  // const toggleBookmark = (post) => {
  //   if (isBookmarked) {
  //     removeBookmark(post);
  //     removeBookmarkPost(user, post.id);
  //   } else {
  //     addBookmark(post);
  //     addBookmarkPost(user, post.id);
  //   }
  // };

  //------------------------------------Render-----------------------------
  return (
    <div className="card bg-base-100  shadow-sm p-4 space-y-3 w-full sm:w-xl">
      {/* Header: Avatar + Username */}
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/300?img=5" alt="User Avatar" />
          </div>
        </div>
        <h2 className="font-semibold">John Doe</h2>
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
      <div className="card-actions justify-around px-2 pt-2">
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
        <button className="btn btn-circle btn-ghost btn-sm">
          <CommentIcon color={"oklch(43% 0 0)"} />
        </button>
        <button
          className="btn btn-circle btn-ghost btn-sm"
          // onClick={() => toggleBookmark(post)}
        >
          <BookmarksIcon
            fillColor={"oklch(68% 0.169 237.323)"}
            color={"transparent"}
            isBookmarked={isBookmarked}
          />
        </button>
      </div>

      {/* Add Comment Section */}
      <div className="flex items-center gap-2 border-t pt-2 mt-2 border-base-300">
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
      </div>
    </div>
  );
};

export default Post;
