import FavsIcon from "../icons/FavsIcon";
import BookmarksIcon from "../icons/BookmarksIcon";
import CommentIcon from "../icons/CommentIcon";
import useStore from "../../store/store";
import MoreIcon from "../icons/MoreIcon";
import userAvatar from "../../assets/avatar-placeholder.png";
import AddCommentForm from "../home/AddCommentForm";
const Post = ({
  post,
  handlePostEdit,
  handleViewComments,
  handleDelete,
  handleCommentClick,
  showCommentInput,
}) => {
  //------------------------------------States-----------------------------
  const currentUser = useStore((state) => state.currentUser);
  const bookmarks = useStore((state) => state.bookmarks);
  const isBookmarked = bookmarks.some((bookmark) => bookmark === post.id);
  const toggleFavourite = useStore((state) => state.toggleFavourite);
  const toggleBookmark = useStore((state) => state.toggleBookmark);
  const favourites = useStore((state) => state.favourites);
  const isFavourite = favourites.includes(post.id);

  //------------------------------------Render-----------------------------
  return (
    <div className="card bg-base-100  shadow-sm p-4 space-y-3 w-full sm:w-xl">
      {/* Header: Avatar + Username */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={userAvatar} alt="User Avatar" />
            </div>
          </div>
          <h2 className="font-semibold">{post.userName}</h2>
        </div>
        {(currentUser&&currentUser.uid === post.uid )&& (
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
      <div className="card-actions justify-start px-2 pt-2 mb-0">
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
        <button
          className="btn btn-circle btn-ghost btn-sm"
          onClick={handleCommentClick}
        >
          <CommentIcon color={"oklch(43% 0 0)"} />
        </button>
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
      {post.favouritesNumber && (
        <p className="self-start px-4 text-neutral font-bold">
          {post.favouritesNumber === 1
            ? "1 like"
            : `${post.favouritesNumber} likes`}
        </p>
      )}
      {post.commentsCount && (
        <button
          onClick={(e) => handleViewComments(e, post)}
          className="self-start px-4 text-sm text-neutral cursor-pointer underline "
        >
          {post.commentsCount == 1
            ? "View 1 comment"
            : `View ${post.commentsCount} comments`}
        </button>
      )}

      {/* TODO: Add Comment Section */}
      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden
    ${showCommentInput ? "max-h-40 opacity-100 mt-2" : "max-h-0"}
  `}
      >
        <div className="flex items-center gap-2 border-t pt-2 border-base-300">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={userAvatar} alt="Your Avatar" />
            </div>
          </div>
          <AddCommentForm postID={post.id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
