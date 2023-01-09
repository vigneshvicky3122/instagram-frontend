import React from "react";
import "../Story.css";

function ViewStories() {
  return (
    <>
      <section className="story-container">
        <nav className="story-nav">
          <div className="story-brand-name">Instagram</div>
          <div>
            <i
              className="x-mark fa-solid fa-x"
              onClick={() => window.history.back()}
            ></i>
          </div>
        </nav>

        <div className="story-content">
          <img
            src="https://avatars.mds.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d-4473719-images-taas-consumers&n=27&h=480&w=480"
            alt=""
            className="story-images"
          />
          <img
            src="https://avatars.mds.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d-4473719-images-taas-consumers&n=27&h=480&w=480"
            alt=""
            className="story-images"
          />
          <img
            src="https://avatars.mds.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d-4473719-images-taas-consumers&n=27&h=480&w=480"
            alt=""
            className="story-images"
          />
          <img
            src="https://avatars.mds.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d-4473719-images-taas-consumers&n=27&h=480&w=480"
            alt=""
            className="story-images"
          />
          <img
            src="https://avatars.mds.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d-4473719-images-taas-consumers&n=27&h=480&w=480"
            alt=""
            className="story-images"
          />
        </div>
      </section>
    </>
  );
}

export default ViewStories;
