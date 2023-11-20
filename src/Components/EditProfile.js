import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import "../Profile.css";

function EditProfile() {
  let [Name, setName] = useState("");
  let [Email, setEmail] = useState("");
  let [Username, setUsername] = useState("");
  let [ProfilePic, setProfilePic] = useState("");
  let [Mobile, setMobile] = useState("");
  let [Bio, setBio] = useState("");
  const [Messages, setMessages] = useState("");
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");
  const [isData, setData] = useState([]);
  const [Disabled, setDisabled] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    editProfile();
  }, []);

  async function editProfile() {
    try {
      let request = await axios.get(
        `${`${url}/edit_profile`}/${window.localStorage.getItem("username")}`,
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
          },
        }
      );

      setName(request.data.user[0].name);
      setEmail(request.data.user[0].email);
      setUsername(request.data.user[0].username);
      setProfilePic(request.data.user[0].profilePic);
      setMobile(request.data.user[0].mobile);
      setBio(request.data.user[0].bio);
      getData();
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
    let Data = { ProfilePic, Bio, Username, Email, Mobile, Name };

    try {
      let request = await axios.put(`${url}/edit_profile`, Data, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          username: window.localStorage.getItem("username"),
        },
      });

      if (request.data.statusCode === 200) {
        console.log(request.data.message);
        window.localStorage.setItem("username", request.data.username);
        window.localStorage.setItem("profile", request.data.profilePic);
        window.localStorage.setItem("name", request.data.name);
        navigate("/accounts");
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
  async function getData() {
    try {
      let request = await axios.get(`${url}/username`, {});

      if (request.data.statusCode === 200) {
        setData(request.data.user);
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
  const checkUsername = (params) => {
    let arr = [];
    isData.forEach((x) => {
      arr.push(x.username);
    });
    if (arr.includes(params)) {
      setDisabled(true);
      setActiveResponse(true);
      setColor("red");
      setMessages(
        "This username was already exist, Enter the Different Username"
      );
    } else {
      setDisabled(false);
      setActiveResponse(false);
    }
  };
  return (
    <>
      <div className="post">
        <div className="container-one">
          <button
            onClick={() => {
              document.getElementById("fileLoader").click();
            }}
            className="select-media"
          >
            Change Profile
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
                setProfilePic(event.target.result);
              });
              reader.readAsDataURL(file);
            }}
          />

          <input
            type="text"
            className="tag"
            placeholder="Nickname"
            onChange={(event) => setName(event.target.value)}
            value={Name}
          />
          <input
            type="text"
            className="post-location"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={Email}
          />
          <input
            type="text"
            className="tag"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            onBlur={() => checkUsername(Username)}
            value={Username}
          />
          <input
            type="text"
            className="post-location"
            placeholder="Mobile number"
            onChange={(event) => setMobile(event.target.value)}
            value={Mobile}
          />
          <textarea
            className="post-caption"
            placeholder="Bio"
            onChange={(event) => setBio(event.target.value)}
            value={Bio}
          />
          {ActiveResponse ? (
            <div style={{ color: isColor }}>{Messages}</div>
          ) : null}
          <button
            className="share"
            type="button"
            disabled={Disabled}
            onClick={pushData}
          >
            Update
          </button>
        </div>
        <img
          id="output"
          src={ProfilePic ? ProfilePic : window.localStorage.getItem("profile")}
          alt=""
        />
      </div>
    </>
  );
}

export default EditProfile;
