import React from "react";

function Story({ Story }) {
  return (
    <>
      <div className="home-container">
        <div className="home-nav">
          {Story &&
            Story.map((e, i) => {
              return (
                <>
                  <a
                    href={`${`/stories`}/${e.Author.username}`}
                    style={{ textDecoration: "none", color: "#262626" }}
                    key={i}
                  >
                    <img
                      className="home-img"
                      src={
                        e.Author.profilePic
                          ? e.Author.profilePic
                          : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                      }
                      alt=""
                    />
                    <label className="story-name">{e.Author.username}</label>
                  </a>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Story;
