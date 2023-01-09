import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import "../Profile.css";
import Navigation from "./Navigation";

function UserAccount() {
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    setActive();
    getMyData();
  }, []);

  const [Post, setPost] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Story, setStory] = useState([]);
  const [ActivePost, setActivePost] = useState(true);
  const [ActiveReels, setActiveReels] = useState(false);
  const [ActiveSaved, setActiveSaved] = useState(false);
  const [ActiveTags, setActiveTags] = useState(false);
  const setActive = () =>
    params.id === "saved-collection"
      ? setActivePost(false) && setActiveSaved(true)
      : null;
  let getMyData = async () => {
    try {
      let request = await axios.get(`${`${url}/myData`}/${params.id}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          username: window.localStorage.getItem("username"),
        },
      });
      setUsers(request.data.user);
      setPost(request.data.post);
      setStory(request.data.story);

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
  };
  async function Follow(id, index) {
    let data = { followingTo: id };
    let update = [...Users];
    update[index].Followers.push(window.localStorage.getItem("username"));
    setUsers(update);

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
    let Index = Users[index].Followers.indexOf(
      window.localStorage.getItem("username")
    );
    let update = [...Users];
    update[index].Followers.splice(Index, 1);
    setUsers(update);
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
  return (
    <>
      <Navigation />
      <div className="account-container">
        {Users &&
          Users.map((e, index) => {
            return (
              <>
                <div className="top" key={e._id}>
                  <img
                    className="profile-image"
                    src={
                      e.profilePic
                        ? e.profilePic
                        : window.localStorage.getItem("profile")
                    }
                    alt=""
                  />
                  <div className="secondary">
                    <div className="profile-main">
                      <p className="username">{e.username}</p>
                      {window.localStorage.getItem("username") === params.id ? (
                        <>
                          <button
                            className="edit-btn"
                            onClick={() => navigate("/edit_profile")}
                          >
                            Edit profile
                          </button>
                          <img
                            src="https://dza205f4gev3o.cloudfront.net/Assets/cogwheel.png"
                            alt=""
                            className="acc-settings"
                          />
                        </>
                      ) : e.Followers && e.Followers.length === 0 ? (
                        <button
                          className="profile-action-head-follow"
                          onClick={() => {
                            Follow(e.username, index);
                          }}
                        >
                          follow
                        </button>
                      ) : e.Followers &&
                        e.Followers.includes(
                          window.localStorage.getItem("username")
                        ) ? (
                        <button
                          className="profile-action-head-unfollow"
                          onClick={() => {
                            unFollow(e.username, index);
                          }}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="profile-action-head-follow"
                          onClick={() => {
                            Follow(e.username, index);
                          }}
                        >
                          follow
                        </button>
                      )}
                    </div>
                    <span className="raw-details">
                      <p className="posts">
                        <strong>{Post ? Post.length : 0}</strong> Post
                      </p>

                      <p className="followers" style={{ cursor: "pointer" }}>
                        <strong>{e.Followers ? e.Followers.length : 0}</strong>{" "}
                        Followers
                      </p>

                      <p className="following" style={{ cursor: "pointer" }}>
                        <strong>{e.Following ? e.Following.length : 0}</strong>{" "}
                        Following
                      </p>
                    </span>
                    <p className="bio">
                      <strong>{e.name}</strong>
                      <br />
                      {e.bio}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        <div className="middle">
          {Story &&
            Story.map((e) => {
              console.log(Story);
              return (
                <>
                  <div className="highlight-grid" key={e._id}>
                    <img className="highlights-img" src={e.Image} alt="" />
                    <label className="highlights-name">{e.Author}</label>
                  </div>
                </>
              );
            })}
          {window.localStorage.getItem("username") === params.id ? (
            <div className="highlight-grid">
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/add.png"
                alt=""
                className=" highlights-img"
              />
              <label className="highlights-name">New</label>
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="view-items">
            <p
              className="title"
              onClick={() => {
                setActivePost((previous) => !previous);
                setActiveReels(false);
                setActiveSaved(false);
                setActiveTags(false);
              }}
            >
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/table-grid.png"
                alt=""
                className="view-head"
              />
              <span className="menu-title">Post</span>
            </p>
            <p
              className="title"
              onClick={() => {
                setActiveReels((previous) => !previous);
                setActiveSaved(false);
                setActiveTags(false);
                setActivePost(false);
              }}
            >
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/video.png"
                alt=""
                className="view-head"
              />
              <span className="menu-title">Reels</span>
            </p>
            {window.localStorage.getItem("username") === params ? (
              <p
                className="title"
                onClick={() => {
                  setActiveSaved((previous) => !previous);
                  setActiveReels(false);
                  setActivePost(false);
                  setActiveTags(false);
                }}
              >
                <img
                  src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark.png"
                  alt=""
                  className="view-head"
                />
                <span className="menu-title">Saved</span>
              </p>
            ) : null}
            <p
              className="title"
              onClick={() => {
                setActiveTags((previous) => !previous);
                setActiveReels(false);
                setActiveSaved(false);
                setActivePost(false);
              }}
            >
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/tag.png"
                alt=""
                className="view-head"
              />
              <span className="menu-title">Tags</span>
            </p>
          </div>
        </div>

        <div className="lower">
          {ActivePost ? (
            <div className="post-frame">
              {Post &&
                Post.map((e, i) => {
                  return (
                    <>
                      <div key={i}>
                        <img
                          className="post-images"
                          src={e.Image}
                          alt=""
                          onClick={() => navigate(`/post/${e._id}`)}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          ) : null}

          {ActiveReels ? (
            <div className="post-frame">
              {Post &&
                Post.map((e, i) => {
                  return (
                    <>
                      <div key={i}>
                        <img
                          className="post-images"
                          src={e.Image}
                          alt=""
                          onClick={() => navigate(`/post/${e._id}`)}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          ) : null}

          {ActiveSaved ? (
            <div className="post-frame">
              {Post &&
                Post.map((e, i) => {
                  return (
                    <>
                      <div key={i}>
                        <img
                          className="post-images"
                          src={e.Image}
                          alt=""
                          onClick={() => navigate(`/post/${e._id}`)}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          ) : null}

          {ActiveTags ? (
            <div className="post-frame">
              {Post &&
                Post.map((e, i) => {
                  return (
                    <>
                      <div key={i}>
                        <img
                          className="post-images"
                          src={e.Image}
                          alt=""
                          onClick={() => navigate(`/post/${e._id}`)}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default UserAccount;
