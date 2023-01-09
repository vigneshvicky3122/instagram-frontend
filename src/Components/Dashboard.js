import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import Feed from "./Feed";
import Navigation from "./Navigation";
import Story from "./Story";
import Suggestion from "./Suggestion";

function Dashboard() {
  useEffect(() => {
    getData();
  }, []);
  let navigate = useNavigate();
  const [Users, setUsers] = useState([]);
  const [Stories, setStories] = useState([]);
  const [Post, setPost] = useState([]);

  async function getData() {
    try {
      let request = await axios.get(`${url}/dashboard`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          username: window.localStorage.getItem("username"),
        },
      });
      setUsers(request.data.users);
      setStories(request.data.story);
      setPost(request.data.post);

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

  return (
    <>
      <Navigation />
      <Suggestion Users={Users} />
      <Story Story={Stories} />
      <Feed Post={Post} />
    </>
  );
}

export default Dashboard;
