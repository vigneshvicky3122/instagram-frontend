import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import moment from "moment";

function ViewFeed() {
  let navigate = useNavigate();
  let params = useParams();

  const [IsPost, setIsPost] = useState([]);
  const [IsUsers, setIsUsers] = useState([]);
  const [AddComment, setAddComment] = useState("");
  const [MenuStatements, setMenuStatements] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let request = await axios.get(`${url}/post/${params.id}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          username: window.localStorage.getItem("username"),
        },
      });
      setIsPost(request.data.post);
      setIsUsers(request.data.user);

      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function CommentsOnPost(id, i) {
    let data = {
      text: AddComment,
      commentedBy: window.localStorage.getItem("username"),
      time: Date.now(),
    };
    let update = [...IsPost];
    update[i].Comments.push(data);
    setIsPost(update);
    try {
      let request = await axios.post(`${`${url}/comments`}/${id}`, data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });

      if (request.data.statusCode === 200) {
        document.querySelector("#comment").value = "";
        console.log(request.data.message);
      }
      if (request.data.statusCode === 404) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Liked(id, i) {
    let data = { likedBy: window.localStorage.getItem("username") };

    let update = [...IsPost];
    update[i].Likes.push(data.likedBy);
    setIsPost(update);

    try {
      let request = await axios.put(`${`${url}/like`}/${id}`, data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function unLiked(id, i) {
    let data = { likedBy: window.localStorage.getItem("username") };

    let update = [...IsPost];
    let index = IsPost[i].Likes.indexOf(data.likedBy);
    update[i].Likes.splice(index, 1);
    setIsPost(update);

    try {
      let request = await axios.put(`${`${url}/unLike`}/${id}`, data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function Saved(id, i) {
    let data = { savedBy: window.localStorage.getItem("username") };
    let update = [...IsPost];
    update[i].Saved.push(data.savedBy);
    setIsPost(update);
    try {
      let request = await axios.put(`${`${url}/Saved`}/${id}`, data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function unSaved(id, i) {
    let data = { savedBy: window.localStorage.getItem("username") };
    let update = [...IsPost];
    let index = IsPost[i].Saved.indexOf(data.savedBy);
    update[i].Saved.splice(index, 1);
    setIsPost(update);

    try {
      let request = await axios.put(`${`${url}/unSaved`}/${id}`, data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function Follow(id, index) {
    let data = { followingTo: id };
    let update = [...IsUsers];
    update[index].Following.push(data.followingTo);
    setIsUsers(update);

    try {
      let request = await axios.put(
        `${`${url}/follow`}/${window.localStorage.getItem("username")}`,
        data,
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
          },
        }
      );

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function unFollow(id, index) {
    let data = { followingTo: id };
    let update = [...IsUsers];
    let Index = IsUsers[index].Following.indexOf(data.followingTo);
    update[index].Following.splice(Index, 1);
    setIsUsers(update);
    try {
      let request = await axios.put(
        `${`${url}/unfollow`}/${window.localStorage.getItem("username")}`,
        data,
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
          },
        }
      );

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function DeletePost(id) {
    try {
      let request = await axios.delete(`${`${url}/delete-post`}/${id}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          username: window.localStorage.getItem("username"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
        navigate("/home");
      }
      if (request.data.statusCode === 401) {
        console.log(request.data.message);
      }
      if (request.data.statusCode === 400) {
        console.log(request.data.message);
        navigate("/accounts/login");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <img
        src="https://dza205f4gev3o.cloudfront.net/Assets/close.png"
        alt=""
        className="undo"
        onClick={() => window.history.back()}
      />
      <div className="view-container">
        {IsPost &&
          IsPost.map((element, index) => {
            return (
              <>
                <div className="feed-card" key={index}>
                  <div className="card-wrapper1">
                    <img src={element.Image} alt="" className="feed_image" />
                  </div>
                  <div className="card-wrapper">
                    <div className="card-author">
                      <img
                        className="sug-profile-pic"
                        src={
                          element.Author.profilePic
                            ? element.Author.profilePic
                            : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                        }
                        alt=""
                      />
                      <p className="sug-profile-username">
                        <a
                          href={`/${element.Author.username}`}
                          style={{ textDecoration: "none", color: "#262626" }}
                        >
                          {element.Author.username}
                        </a>
                      </p>
                      <img
                        className="post-menu"
                        src="https://dza205f4gev3o.cloudfront.net/Assets/dots.png"
                        alt=""
                        onClick={() =>
                          setMenuStatements((previous) => !previous)
                        }
                      />
                    </div>
                    {MenuStatements ? (
                      <div className="feed_dropdown">
                        <div className="feed_drop_wrapper">
                          <label
                            className="feed-action-head"
                            onClick={() => {
                              navigate(`/edit_post/${params.id}`);
                            }}
                          >
                            Edit
                          </label>
                          {window.localStorage.getItem("username") ===
                          element.Author.username ? (
                            <label
                              className="feed-action-head-unfollow"
                              onClick={() => DeletePost(params.id)}
                            >
                              Delete
                            </label>
                          ) : (
                            <>
                              {IsUsers &&
                                IsUsers.map((items, index) => {
                                  return (
                                    <>
                                      {items.Following &&
                                      items.Following.length === 0 ? (
                                        <label
                                          className="feed-action-head-follow"
                                          onClick={() => {
                                            Follow(
                                              element.Author.username,
                                              index
                                            );
                                          }}
                                        >
                                          follow
                                        </label>
                                      ) : items.Following &&
                                        items.Following.includes(
                                          element.Author.username
                                        ) ? (
                                        <label
                                          className="feed-action-head-unfollow"
                                          onClick={() => {
                                            unFollow(
                                              element.Author.username,
                                              index
                                            );
                                          }}
                                        >
                                          Unfollow
                                        </label>
                                      ) : (
                                        <label
                                          className="feed-action-head-follow"
                                          onClick={() => {
                                            Follow(
                                              element.Author.username,
                                              index
                                            );
                                          }}
                                        >
                                          follow
                                        </label>
                                      )}
                                    </>
                                  );
                                })}
                            </>
                          )}

                          <label className="feed-action-head">Archive</label>
                          <label
                            className="feed-action-head"
                            onClick={() => setMenuStatements(false)}
                          >
                            Cancel
                          </label>
                        </div>
                      </div>
                    ) : null}
                    <div className="post_comment_container">
                      <div className="post_Author">
                        <div className="author_main">
                          <label className="author_username">
                            {element.Author.username}
                          </label>

                          <label className="author_location">
                            {element.Location}
                          </label>
                        </div>
                        <div className="post_description">
                          <p className="caption">
                            Do non sint deserunt incididunt nostrud dolor ex
                            sint id incididunt. Nulla voluptate cillum amet id
                            veniam pariatur excepteur aliqua consequat nisi
                            pariatur. Aute velit aute proident eu officia aute
                            incididunt velit Lorem pariatur tempor mollit
                            fugiat. Fugiat sunt sint consequat sit aliquip irure
                            consectetur officia consequat duis duis dolor. Culpa
                            culpa eiusmod ad exercitation proident.
                            {element.Caption}
                          </p>
                          <p className="tags">{element.Tags}</p>
                        </div>
                      </div>
                      {element.Comments.map((comment, index) => {
                        return (
                          <>
                            <div className="comment_wrapper" key={index}>
                              <div className="post_comments">
                                <label className="author_commentsBy">
                                  {comment.commentedBy}
                                </label>

                                <label className="author_comments">
                                  {comment.text}
                                </label>
                              </div>
                              <div className="post_comments-timings">
                                <p className="timings">
                                  {moment(comment.time).fromNow()}
                                </p>
                                <p className="reply_to">Reply</p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="post_action">
                      <div className="feed-action">
                        {element.Likes.length === 0 ? (
                          <img
                            src="https://dza205f4gev3o.cloudfront.net/Assets/heart-shape-outline.png"
                            alt=""
                            className="like-btn"
                            onClick={() => {
                              Liked(element._id, index);
                            }}
                          />
                        ) : element.Likes.includes(
                            window.localStorage.getItem("username")
                          ) ? (
                          <img
                            src="https://dza205f4gev3o.cloudfront.net/Assets/heart (3).png"
                            alt=""
                            className="like-btn"
                            onClick={() => {
                              unLiked(element._id, index);
                            }}
                          />
                        ) : (
                          <img
                            src="https://dza205f4gev3o.cloudfront.net/Assets/heart-shape-outline.png"
                            alt=""
                            className="like-btn"
                            onClick={() => {
                              Liked(element._id, index);
                            }}
                          />
                        )}

                        <img
                          src="https://dza205f4gev3o.cloudfront.net/Assets/message.png"
                          alt=""
                          className="send-btn"
                          onClick={() => navigate(`/post/${element._id}`)}
                        />
                        <img
                          src="https://dza205f4gev3o.cloudfront.net/Assets/send.png"
                          alt=""
                          className="tele-btn"
                          onClick={() => navigate("/inbox")}
                        />

                        <span className="feed-saved">
                          {element.Saved.length === 0 ? (
                            <img
                              src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark-white.png"
                              alt=""
                              className="saved-btn"
                              onClick={() => {
                                Saved(element._id, index);
                              }}
                            />
                          ) : element.Saved.includes(
                              window.localStorage.getItem("username")
                            ) ? (
                            <img
                              src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark-black-shape.png"
                              alt=""
                              className="saved-btn"
                              onClick={() => {
                                unSaved(element._id, index);
                              }}
                            />
                          ) : (
                            <img
                              src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark-white.png"
                              alt=""
                              className="saved-btn"
                              onClick={() => {
                                Saved(element._id, index);
                              }}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="post_add_comment">
                      <div className="comment-div">
                        <input
                          type="text"
                          id="comment"
                          className="comment-box"
                          placeholder="Add a comment..."
                          onChange={(e) => setAddComment(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => CommentsOnPost(element._id, index)}
                          className="comment-post"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default ViewFeed;
