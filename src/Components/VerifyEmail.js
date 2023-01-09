import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function VerifyEmail() {
  let navigate = useNavigate();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/reset-email-verify`, data);
      setMessages(request.data.message);
      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        setColor("green");
        setTimeout(() => {
          navigate(`/accounts/password/reset/verification/otp/${data.email}`);
        }, "3000");
      }
      if (request.data.statusCode === 401) {
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
    },
    validationSchema: yup.object({
      email: yup.string().min(5, "Enter a valid detail").required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div className="form-forgot">
        <div className="forgot-container">
          <i
            className="fa-solid fa-lock"
            style={{
              fontSize: "30px",
              color: "#262626",
              border: "3px solid #262626",
              borderRadius: "50%",
              padding: "20px",
              objectFit: "cover",
            }}
          ></i>

          <br />
          <p className="forgot-query">Trouble logging in?</p>
          <p className="privacy-content">
            Enter your email, phone, or username and we'll <br /> send you a
            link to get back into your account.
          </p>
          <br />
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Phone number, username, or email"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  id="form-action"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
              <br />
              {ActiveResponse ? (
                <div style={{ color: isColor }}>{Messages}</div>
              ) : null}
              <br />
              <div className="form-group">
                <button type="submit" className="signup-btn">
                  Verify
                </button>
              </div>
            </div>
            <br />
            <a href="#!" className="login-forgot-container">
              {" "}
              Can't reset your password?
            </a>
            <input type="text" className="form-optional" disabled />
            <p className="form-or">OR</p>
          </form>
          <br />
          <a href="/accounts/emailsignup" className="forgot-signup-container">
            {" "}
            Create new account
          </a>
        </div>
      </div>
      <div className="forgot-login-container">
        <a href="/accounts/login" className="forgot-login-content">
          {" "}
          Back to Log in
        </a>
      </div>
    </>
  );
}

export default VerifyEmail;
