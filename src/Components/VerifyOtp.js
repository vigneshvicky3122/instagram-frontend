import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function VerifyOtp() {
  let navigate = useNavigate();
  let params = useParams();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/reset-otp-verify`, {
        data,
        user: params.id,
      });
      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        setColor("green");
        setMessages(request.data.message);
        setTimeout(() => {
          navigate(`/accounts/password/reset/${request.data.userId}`);
        }, "3000");
      }
      if (request.data.statusCode === 401) {
        setMessages(request.data.message);
        setTimeout(() => {
          navigate("/accounts/password/reset/verification/email");
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
      otp: "",
    },
    validationSchema: yup.object({
      otp: yup
        .number()
        .test(
          "maxDigits",
          "number field must have exactly 6 digits",
          (number) => String(number).length === 6
        )
        .required("* Required"),
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
                id="otp"
                name="otp"
                type="text"
                placeholder="OneTimePassword"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.otp}
              />
              {formik.touched.otp && formik.errors.otp ? (
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
                Verify
              </button>
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

export default VerifyOtp;
