import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  let navigate = useNavigate();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/login`, data);
      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        window.localStorage.setItem("app-token", request.data.token);
        window.localStorage.setItem("username", request.data.users[0].username);
        window.localStorage.setItem("name", request.data.users[0].name);
        let check = request.data.users[0].profilePic;
        if (check === undefined) {
          let profile =
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
          window.localStorage.setItem("profile", profile);
        } else {
          window.localStorage.setItem(
            "profile",
            request.data.users[0].profilePic
          );
        }
        setColor("green");
        setMessages(request.data.message);
        setTimeout(() => {
          navigate("/home");
        }, "3000");
      }
      if (request.data.statusCode === 401) {
        setMessages(request.data.message);
      }
      if (request.data.statusCode === 404) {
        setMessages(request.data.message);
        setTimeout(() => {
          navigate("/accounts/emailsignup");
        }, "3000");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().min(5, "Enter a valid detail").required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div className="form-login">
        <div className="sign-container">
          <p style={{ color: "black" }}>
            <strong className="sign-brand-name">Instagram</strong>
          </p>
          <br />
          <form className="form-main" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Phone number, username, or email"
                className="form-control"
                onClick={() => setActiveResponse(false)}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  id="form-action"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
            </div>

            <div className="form-group">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  id="form-action"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
            </div>

            {ActiveResponse ? (
              <div style={{ color: isColor }}>{Messages}</div>
            ) : null}
            <br />
            <div className="form-group">
              <button type="submit" className="signup-btn">
                Log in
              </button>
            </div>
            <br />
            <input type="text" className="form-optional" disabled />
            <p className="form-or">OR</p>
            <br />
            <a href="#!" className="facebook-login-tag" target="_blank">
              <i
                id="login-facebook-icon"
                className="fa-brands fa-square-facebook"
                style={{ color: "#4267B2" }}
              ></i>
              &nbsp; Log in with Facebook
            </a>
            <br />
            <a
              href="/accounts/password/reset/verification/email"
              className="login-forgot-container"
            >
              {" "}
              Forgot password?
            </a>
          </form>
        </div>
      </div>
      <div className="signup-login-container">
        <p className="login-content">
          Don't have an account?
          <a
            href="/accounts/emailsignup"
            style={{
              textDecoration: "none",
              color: "#008cff",
              fontWeight: "500",
            }}
          >
            {" "}
            Sign up
          </a>
        </p>
      </div>
    </>
  );
}

export default Login;
