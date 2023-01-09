import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import Navigation from "./Navigation";

function Explore() {
  const [Post, setPost] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getPost();
  }, []);

  let getPost = async () => {
    try {
      let request = await axios.get(`${url}/post`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          uniqueId: window.localStorage.getItem("unique-id"),
        },
      });
      setPost(request.data.post);

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
      <Navigation />
      <div className="explore-grid">
        {Post &&
          Post.map((e) => {
            return (
              <>
                <a className="grid-line" href={`/post/${e._id}`} key={e._id}>
                  <img className="container-image" src={e.Image} alt="" />
                </a>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Explore;
