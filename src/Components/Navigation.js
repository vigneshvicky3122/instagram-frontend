import React, { useEffect, useState } from "react";

function Navigation({ Users }) {
  const [User, setUser] = useState([]);
  const [Value, setValue] = useState();
  const [Profile, setProfile] = useState();
  const [Activity, setActivity] = useState();
  const [List, setList] = useState();

  let handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    setUser(Users);
  }, []);
  return (
    <>
      <nav className="nav">
        <div className="brand-name">
          Instagram
          <select className="nav-select">
            <option>Following</option>
            <option>Favorites</option>
          </select>
        </div>
        <div className="search">
          <i className="search-icon fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            className="search-box"
            onClick={() => {
              setList((previous) => !previous);
              setProfile(false);
              setActivity(false);
            }}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
        {List ? (
          <div className="user-list">
            {User &&
              User.map((e, i) => {
                return (
                  <>
                    <a href={`/${e.username}`} className="list" key={i}>
                      <img
                        className="search-img"
                        src={
                          e.profile
                            ? e.profile
                            : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                        }
                        alt=""
                      />

                      <div className="search-main">
                        <p>{e.username}</p>
                        <p className="sug-followedBy">{e.name}</p>
                      </div>
                    </a>
                  </>
                );
              })}
          </div>
        ) : null}
        <div className="elements">
          <div>
            <a href="/home">
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/home.png"
                alt=""
                className="nav-icon"
              />
            </a>
          </div>
          <div>
            <a href="inbox">
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/messenger.png"
                alt=""
                className="nav-icon"
              />
            </a>
          </div>
          <div>
            <a href="/post">
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/add-square-button.png"
                alt=""
                className="nav-icon"
              />
            </a>
          </div>
          <div>
            <a href="/explore">
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/explore.png"
                alt=""
                className="nav-icon"
              />
            </a>
          </div>
          <div>
            <img
              src="https://dza205f4gev3o.cloudfront.net/Assets/heart-shape-outline.png"
              onClick={() => {
                setActivity((previous) => !previous);
                setList(false);
                setProfile(false);
              }}
              alt=""
              className="nav-icon"
            />

            {Activity ? (
              <div className="activity-page">
                <div className="activity-main">
                  <img
                    className="activity-img"
                    src={window.localStorage.getItem("profile")}
                    alt=""
                  />
                  <label className="activity-content">
                    <strong>
                      <a
                        href="/accounts"
                        style={{ textDecoration: "none", color: "#262626" }}
                      >
                        the_mirror
                      </a>
                    </strong>{" "}
                    is like by your reel
                  </label>
                  <div className="content-wrapper">
                    <img
                      className="content-img"
                      src={window.localStorage.getItem("profile")}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            {window.localStorage.getItem("profile") ? (
              <img
                src={window.localStorage.getItem("profile")}
                alt=""
                onClick={() => {
                  setProfile((previous) => !previous);
                  setActivity(false);
                  setList(false);
                }}
                className="nav-icon-dp"
              />
            ) : (
              <img
                src="https://dza205f4gev3o.cloudfront.net/Assets/user.png"
                onClick={() => {
                  setProfile((previous) => !previous);
                  setActivity(false);
                  setList(false);
                }}
                alt=""
                className="nav-icon"
              />
            )}

            {Profile ? (
              <div className="profile-dropdown">
                <a href="/accounts" className="line-acc">
                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/profile (1).png"
                    alt=""
                    className="pro-drop-icon"
                  />
                  <label className="nav-pro-head">Profile</label>
                </a>
                <a href="/accounts/saved-collection" className="line-acc">
                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/bookmark.png"
                    alt=""
                    className="pro-drop-icon"
                  />
                  <label className="nav-pro-head">Saved</label>
                </a>
                <a href="#!" className="line-acc">
                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/cogwheel.png"
                    alt=""
                    className="pro-drop-icon"
                  />

                  <label className="nav-pro-head">Settings</label>
                </a>
                <a
                  onClick={() => {
                    window.localStorage.removeItem("app-token");
                    window.localStorage.removeItem("name");
                    window.localStorage.removeItem("username");
                    window.localStorage.removeItem("profile");
                  }}
                  href="/accounts/login"
                  className="line-acc"
                >
                  <img
                    src="https://dza205f4gev3o.cloudfront.net/Assets/logout.png"
                    alt=""
                    className="pro-drop-icon"
                  />
                  <label className="nav-pro-head">Log out</label>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
