import userAvatar from "../../assets/avatar-placeholder.png";
import { formatTimeStamp } from "../../../util/DateConverter";
import AddCommentForm from "./AddCommentForm";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import SkeletonComment from "../skeleton/SkeletonComment";

const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const getPostComments = useStore((state) => state.getPostComments);
  const isLoadingComments = useStore((state) => state.isLoadingComments);
  const currentUser = useStore((state) => state.currentUser);
  useEffect(() => {
    setComments([]); 
    const unsubscribe = getPostComments(setComments, post.id);
    
    return () => unsubscribe();
  }, [getPostComments, post.id]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: Post content */}
      <div className="lg:w-2/3 w-full space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={userAvatar} alt="User Avatar" />
            </div>
          </div>
          <h2 className="font-semibold text-lg">{post.userName}</h2>
        </div>

        {/* Post Content */}
        <div>
          <p className="text-base-content text-left">{post.postContent}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <figure>
            <img
              src={post.image}
              alt="Post visual"
              className="rounded-lg max-h-96 w-full object-cover"
            />
          </figure>
        )}
      </div>

      {/* Right: Comments */}
      <div className="lg:w-1/3 w-full space-y-4">
        <h3 className="font-semibold text-base-content">Comments</h3>
        <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {!isLoadingComments &&
            comments.map((comment) => (
              <li
                key={comment.id}
                className="flex items-start gap-3 bg-base-200 px-2 py-4 rounded-md"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                  <img src={userAvatar} alt="User" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm pb-1">{comment.userName}</p>
                  <p className="text-sm text-base-content pb-2">
                    {comment.comment}
                  </p>
                  <p className="text-xs text-neutral h-5 ">
                    {comment.createdAt &&
                      formatTimeStamp(
                        comment.createdAt.toDate()
                      )}
                  </p>
                </div>
              </li>
            ))}
          {isLoadingComments &&
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonComment key={index} />
            ))}
        </ul>
        {/* Comment Input */}
        {currentUser && (
          <div className="border-t pt-3 flex items-center gap-2">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={userAvatar} alt="Your Avatar" />
              </div>
            </div>
            <AddCommentForm postID={post.id} />
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default PostDetails;
