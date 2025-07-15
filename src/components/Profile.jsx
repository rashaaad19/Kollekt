import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../services/firestore_service";

const Profile = () => {
  const user = auth.currentUser;
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
    } catch (error) {
      console.error("An error occurred during sign-out:", error);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postInput.trim()) {
      const postData = { content: postInput, author: user.displayName };
      addPost(user, postData);
      setPostInput("");
    }
  };

  const handleSave = (id) => {
    console.log(editedContent, id);
    updatePost(id, editedContent);
    setEditingPostId(null);
  };
  const handleDelete = (id) => {
    const shouldDelete = confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      deletePost(id);
    } else {
      return;
    }
  };

  useEffect(() => {
    const unsubscribe = getPosts((postsData) => {
      setPosts(postsData);
    });
    
    //clean up
    return () => unsubscribe();
  }, []);

  return (
    <>
     {user&& <nav >
        <div >
          <h2>MyApp</h2>
        </div>
        <div >
          <span>Hello {user?.displayName}</span>
          <Link to="/" onClick={handleSignOut} >
            Sign Out
          </Link>
        </div>
      </nav>}

      <div >
        <h1>Newsfeed</h1>

        <form onSubmit={handlePostSubmit} >
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>

        {/* ------------------------------------------- */}

        <div >
          {posts.map((post) => (
            <div key={post.id} >
              <div >
                <strong>{post.userName}</strong>

                {post.uid === user.uid && (
                  <div >
                    {editingPostId === post.id ? (
                      <>
                        <button
                          
                          onClick={() => handleSave(post.id)}
                        >
                          Save
                        </button>
                        <button
                          
                          onClick={() => setEditingPostId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          
                          onClick={() => {
                            setEditingPostId(post.id);
                            setEditedContent(post.postContent);
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {editingPostId === post.id ? (
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <div >
                  <p>{post.postContent}</p>
                  <p >
                    {post.createdAt
                      ? post.createdAt.toDate().toLocaleString()
                      : ""}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
