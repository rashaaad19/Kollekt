import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./Profile.css";
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
     {user&& <nav className="navbar">
        <div className="navbar-left">
          <h2>MyApp</h2>
        </div>
        <div className="navbar-right">
          <span>Hello {user?.displayName}</span>
          <Link to="/" onClick={handleSignOut} className="signout">
            Sign Out
          </Link>
        </div>
      </nav>}

      <div className="profile-container">
        <h1>Newsfeed</h1>

        <form onSubmit={handlePostSubmit} className="post-form">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>

        {/* ------------------------------------------- */}

        <div className="posts-section">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <strong>{post.userName}</strong>

                {post.uid === user.uid && (
                  <div className="post-actions">
                    {editingPostId === post.id ? (
                      <>
                        <button
                          className="save-btn"
                          onClick={() => handleSave(post.id)}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setEditingPostId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="update-btn"
                          onClick={() => {
                            setEditingPostId(post.id);
                            setEditedContent(post.postContent);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="delete-btn"
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
                  className="post-content-input"
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <div className="post-bottom">
                  <p>{post.postContent}</p>
                  <p className="date">
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
