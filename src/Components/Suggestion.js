import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../App";

function Suggestion({ Users }) {
  let navigate = useNavigate();
  const [IsUser, setIsUser] = useState([]);
  const [IsUsers, setIsUsers] = useState([]);
  const [Active, setActive] = useState(false);
  const [large, setLarge] = useState("sug-list-container-close");
  useEffect(() => {
    setIsUser(Users);
    removeAuth();
  }, [Users]);
  let removeAuth = () => {
    let ignored = IsUser.findIndex(
      (index) => index.username === window.localStorage.getItem("username")
    );
    var remove = [...IsUser];
    remove.splice(ignored, 1);
    setIsUsers(remove);
  };
  async function Follow(id, index) {
    let data = { followingTo: id };
    let update = [...IsUsers];
    update[index].Followers.push(window.localStorage.getItem("username"));
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
    let Index = IsUsers[index].Followers.indexOf(
      window.localStorage.getItem("username")
    );
    let update = [...IsUsers];
    update[index].Followers.splice(Index, 1);
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
  return (
    <>
      <div className="suggestions">
        <div className="account-summary">
          <img
            className="profile-pic"
            id="profile"
            src={window.localStorage.getItem("profile")}
            alt=""
          />
          <div className="summary-main">
            <p className="profile-username" id="username">
              <a
                href="/accounts"
                style={{ textDecoration: "none", color: "#262626" }}
              >
                {window.localStorage.getItem("username")}
              </a>
            </p>
            <p className="profile-name" id="name">
              {window.localStorage.getItem("name")}
            </p>
          </div>
          <a href="/accounts/login" className="switch">
            Switch
          </a>
        </div>

        <div className="heading">
          <p className="suggestions-head">Suggestions For You</p>
          <p className="see">
            {!Active ? (
              <button
                className="seeAll-btn"
                onClick={() => {
                  setActive((prev) => !prev);
                  setLarge("sug-list-container");
                }}
              >
                See All
              </button>
            ) : (
              <button
                className="seeAll-btn"
                onClick={() => {
                  setActive((prev) => !prev);
                  setLarge("sug-list-container-close");
                }}
              >
                close
              </button>
            )}
          </p>
        </div>
        <div className={large}>
          {IsUsers &&
            IsUsers.map((items, index) => {
              return (
                <>
                  <div className="suggest-list" key={index}>
                    <img
                      className="sug-profile-pic"
                      src={
                        items.profilePic
                          ? items.profilePic
                          : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                      }
                      alt=""
                    />
                    <div className="sug-content">
                      <p className="sug-profile-username">
                        <a
                          href={`/${items.username}`}
                          style={{ textDecoration: "none", color: "#262626" }}
                        >
                          {items.username}
                        </a>
                      </p>
                      <p className="sug-followedBy">
                        followed by
                        <span>{items.username} + more...</span>
                      </p>
                    </div>

                    <div className="sug-action">
                      {items.Followers && items.Followers.length === 0 ? (
                        <p
                          className="follow"
                          onClick={() => {
                            Follow(items.username, index);
                          }}
                        >
                          follow
                        </p>
                      ) : items.Followers &&
                        items.Followers.includes(
                          window.localStorage.getItem("username")
                        ) ? (
                        <p
                          className="follow"
                          onClick={() => {
                            unFollow(items.username, index);
                          }}
                        >
                          Unfollow
                        </p>
                      ) : (
                        <p
                          className="follow"
                          onClick={() => {
                            Follow(items.username, index);
                          }}
                        >
                          follow
                        </p>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Suggestion;
