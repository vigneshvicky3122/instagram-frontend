import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import "../Profile.css";
function EditPost() {
  let [Caption, setCaption] = useState("");
  let [Location, setLocation] = useState("");
  let [Tags, setTags] = useState("");
  let [Image, setImage] = useState("");
  let navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    editPost();
  }, []);

  async function editPost() {
    try {
      let request = await axios.get(`${url}/post/${params.id}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });
      setCaption(request.data.post[0].Caption);
      setLocation(request.data.post[0].Location);
      setTags(request.data.post[0].Tags);
      setImage(request.data.post[0].Image);

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
  let pushData = async () => {
    let Data = { Image, Caption, Tags, Location };

    try {
      let request = await axios.put(`${url}/edit-post/${params.id}`, Data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          username: window.localStorage.getItem("username"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
        window.history.back();
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
  };

  return (
    <>
      <img
        src="https://dza205f4gev3o.cloudfront.net/Assets/close.png"
        alt=""
        className="undo"
        onClick={() => window.history.back()}
      />
      <div className="post">
        <div className="container-one">
          <button
            onClick={() => {
              document.getElementById("fileLoader").click();
            }}
            className="select-media"
          >
            Select Media
          </button>
          <input
            type="file"
            id="fileLoader"
            accept="image/*"
            onChange={(e) => {
              let files = e.target.files;
              let file = files[0];

              const reader = new FileReader();
              reader.addEventListener("load", (event) => {
                setImage(event.target.result);
              });
              reader.readAsDataURL(file);
            }}
          />
          <input
            type="text"
            className="post-caption"
            placeholder="Write your caption..."
            onChange={(event) => setCaption(event.target.value)}
            value={Caption}
          />
          <input
            type="text"
            className="post-location"
            placeholder="Select location"
            onChange={(event) => setLocation(event.target.value)}
            value={Location}
          />
          <input
            type="text"
            className="tag"
            placeholder="Tag your friends"
            onChange={(event) => setTags(event.target.value)}
            value={Tags}
          />
          <button className="share" type="button" onClick={pushData}>
            Update
          </button>
        </div>
        <img id="output" src={Image} alt="" />
      </div>
    </>
  );
}

export default EditPost;
