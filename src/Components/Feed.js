import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import moment from "moment";

function Feed({ Post }) {
  let navigate = useNavigate();
  const [IsPost, setIsPost] = useState([]);
  const [MoreCaption, setMoreCaption] = useState(false);
  const [AddComment, setAddComment] = useState("");

  useEffect(() => {
    setIsPost(Post);
  }, [Post]);

  async function CommentsOnPost(id, i) {
    let data = {
      text: AddComment,
      commentedBy: window.localStorage.getItem("username"),
      time: new Date.now(),
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
        document.querySelector("#comment").textContent = "";
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

  return (
    <>
      {IsPost &&
        IsPost.map((e, i) => {
          return (
            <>
              <div className="post-container" key={i}>
                <div className="post-top">
                  <img className="post-img" src={e.Author.profilePic} alt="" />
                  <div className="feed-main">
                    <label className="feed-name">
                      <a
                        href={`/${e.Author.username}`}
                        style={{ textDecoration: "none", color: "#262626" }}
                      >
                        {e.Author.username}
                      </a>
                    </label>

                    <br />
                    <label className="feed-location">{e.Location}</label>
                  </div>
                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/dots.png"
                    alt=""
                    onClick={() => navigate(`/post/${e._id}`)}
                    className="post-menu"
                  />
                </div>

                <img className="feed-img" src={e.Image} alt="" />

                <div className="feed-action">
                  {e.Likes && e.Likes.length === 0 ? (
                    <img
                      src="https://dza205f4gev3o.cloudfront.net/Assets/heart-shape-outline.png"
                      alt=""
                      className="like-btn"
                      onClick={() => {
                        Liked(e._id, i);
                      }}
                    />
                  ) : e.Likes &&
                    e.Likes.includes(
                      window.localStorage.getItem("username")
                    ) ? (
                    <img
                      src="https://dza205f4gev3o.cloudfront.net/Assets/heart (3).png"
                      alt=""
                      className="like-btn"
                      onClick={() => {
                        unLiked(e._id, i);
                      }}
                    />
                  ) : (
                    <img
                      src="https://dza205f4gev3o.cloudfront.net/Assets/heart-shape-outline.png"
                      alt=""
                      className="like-btn"
                      onClick={() => {
                        Liked(e._id, i);
                      }}
                    />
                  )}

                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/message.png"
                    alt=""
                    className="send-btn"
                    onClick={() => navigate(`/post/${e._id}`)}
                  />
                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/send.png"
                    alt=""
                    className="tele-btn"
                    onClick={() => navigate("/inbox")}
                  />

                  <span className="feed-saved">
                    {e.Saved && e.Saved.length === 0 ? (
                      <img
                        src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark-white.png"
                        alt=""
                        className="saved-btn"
                        onClick={() => {
                          Saved(e._id, i);
                        }}
                      />
                    ) : e.Saved &&
                      e.Saved.includes(
                        window.localStorage.getItem("username")
                      ) ? (
                      <img
                        src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark-black-shape.png"
                        alt=""
                        className="saved-btn"
                        onClick={() => {
                          unSaved(e._id, i);
                        }}
                      />
                    ) : (
                      <img
                        src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark-white.png"
                        alt=""
                        className="saved-btn"
                        onClick={() => {
                          Saved(e._id, i);
                        }}
                      />
                    )}
                  </span>
                </div>
                <div className="post-activity">
                  <p className="post-likes">
                    <strong>{e.Likes ? e.Likes.length : 0}</strong> likes
                  </p>
                  <div className="post-description">
                    {e.Author.username}
                    <span
                      style={{
                        color: "#383838",
                        fontSize: "15px",
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      {e.Caption}
                    </span>
                    <span
                      style={{
                        color: "#929292",
                        fontSize: "15px",
                        fontWeight: "400",
                        cursor: "pointer",
                      }}
                      onClick={() => setMoreCaption((Active) => !Active)}
                    >
                      {" "}
                      more...
                    </span>
                    {MoreCaption ? (
                      <p className="post-tags">
                        <a
                          href={`/${e.Tags}`}
                          style={{ textDecoration: "none", color: "#262626" }}
                        >
                          {e.Tags}
                        </a>
                      </p>
                    ) : null}
                  </div>
                  <p
                    className="post-comments"
                    onClick={() => {
                      navigate(`/post/${e._id}`);
                    }}
                  >
                    View all{" "}
                    <strong>{e.Comments ? e.Comments.length : null}</strong>{" "}
                    comment
                  </p>
                  <p className="post-timing">
                    <strong>{moment(e.Time).fromNow()}</strong>
                  </p>
                </div>

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
                    onClick={() => CommentsOnPost(e._id, i)}
                    className="comment-post"
                  >
                    Post
                  </button>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}

export default Feed;
