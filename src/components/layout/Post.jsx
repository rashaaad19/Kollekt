import React from "react";
import FavsIcon from "../icons/FavsIcon";
import BookmarksIcon from "../icons/BookmarksIcon";
import CommentIcon from "../icons/CommentIcon";
import SendIcon from "../icons/SendIcon";
import Input from "./Input";

const Post = ({post}) => {
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
        <p className="text-base-content text-left">
         {post.postContent}
        </p>
      </div>

      {/* Post Image */}
      <figure>
        <img
          src={post.image||'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
          alt="Post content"
          className="rounded-lg"
        />
      </figure>

      {/* Action Icons */}
      <div className="card-actions justify-around px-2 pt-2">
        <button className="btn btn-circle btn-ghost btn-sm flex items-center gap-1">
          <FavsIcon
            color={"transparent"}
            fillColor={"oklch(63% 0.237 25.331)"}
            active={false}
          />
        </button>
        <button className="btn btn-circle btn-ghost btn-sm">
          <CommentIcon color={"oklch(76% 0.233 130.85)"} />
        </button>
        <button className="btn btn-circle btn-ghost btn-sm">
          <BookmarksIcon
            fillColor={"oklch(68% 0.169 237.323)"}
            color={"transparent"}
            active={true}
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
