import userAvatar from "../../assets/avatar-placeholder.png";
import Input from "../layout/Input";
import SendIcon from "../icons/SendIcon";
import { formatTimeStamp } from "../../../util/DateConverter";
const dummyComments = [
  {
    id: "c1",
    userName: "Alice Walker",
    content: "Great post! Really enjoyed reading it.",
    timestamp: "2025-07-18T12:00:00Z",
  },
  {
    id: "c2",
    userName: "Bob Smith",
    content: "Interesting point of view, thanks for sharing!",
    timestamp: "2025-07-18T12:05:00Z",
  },
  {
    id: "c3",
    userName: "Charlie Johnson",
    content: "Can you elaborate more on this?",
    timestamp: "2025-07-18T12:10:00Z",
  },
  {
    id: "c4",
    userName: "Dana Lee",
    content: "Loved the way you explained it!",
    timestamp: "2025-07-18T12:15:00Z",
  },
  {
    id: "c5",
    userName: "Ethan Brown",
    content: "This was super helpful, thanks!",
    timestamp: "2025-07-18T12:20:00Z",
  },
  {
    id: "c6",
    userName: "Fiona Davis",
    content: "I have a different take on this.",
    timestamp: "2025-07-18T12:25:00Z",
  },
  {
    id: "c7",
    userName: "George Allen",
    content: "Nice post. Keep them coming!",
    timestamp: "2025-07-18T12:30:00Z",
  },
  {
    id: "c8",
    userName: "Hannah Clark",
    content: "Thanks for putting this together!",
    timestamp: "2025-07-18T12:35:00Z",
  },
  {
    id: "c9",
    userName: "Ian Wright",
    content: "I totally agree with this statement.",
    timestamp: "2025-07-18T12:40:00Z",
  },
  {
    id: "c10",
    userName: "Jasmine Evans",
    content: "Couldn’t have said it better myself!",
    timestamp: "2025-07-18T12:45:00Z",
  },
];

const PostDetails = ({ post }) => {

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
          {dummyComments.map((comment) => (
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
                <p className="text-sm text-base-content pb-2">{comment.content}</p>
                <p className="text-xs text-neutral ">
                  {formatTimeStamp(comment.timestamp)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Comment Input */}
        <div className="border-t pt-3 flex items-center gap-2">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={userAvatar} alt="Your Avatar" />
            </div>
          </div>
          <Input
            type="text"
            placeholder="Add a comment..."
            className="input input-bordered input-sm flex-1 focus:outline-none"
          />
          <button className="btn btn-sm btn-primary">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
