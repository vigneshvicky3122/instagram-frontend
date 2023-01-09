import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./Components/Account";
import CreatePost from "./Components/CreatePost";
import Dashboard from "./Components/Dashboard";
import EditPost from "./Components/EditPost";
import EditProfile from "./Components/EditProfile";
import Explore from "./Components/Explore";
import ForgotPassword from "./Components/ForgotPassword";
import Login from "./Components/Login";
import Message from "./Components/Message";
import Saved from "./Components/Saved";
import SignUp from "./Components/SignUp";
import UserAccount from "./Components/UserAccount";
import VerifyEmail from "./Components/VerifyEmail";
import VerifyOtp from "./Components/VerifyOtp";
import ViewFeed from "./Components/ViewFeed";
import ViewStories from "./Components/ViewStories";
export const url = "https://instagram-kmjv.onrender.com";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/instagram" />} />
          <Route path="/instagram" element={<Dashboard />} />
          <Route path="post/:id" element={<ViewFeed />} />
          <Route path="stories/:id" element={<ViewStories />} />
          <Route path="explore" element={<Explore />} />
          <Route path="post" element={<CreatePost />} />
          <Route path="inbox" element={<Message />} />
          <Route path="edit_profile" element={<EditProfile />} />
          <Route path="edit_post/:id" element={<EditPost />} />
          <Route path="accounts" element={<Account />}>
            <Route path=":id" element={<Saved />} />
          </Route>
          <Route path=":id" element={<UserAccount />} />
          <Route path="accounts/login" element={<Login />} />
          <Route path="accounts/emailsignup" element={<SignUp />} />
          <Route
            path="accounts/password/reset/verification/email"
            element={<VerifyEmail />}
          />
          <Route
            path="accounts/password/reset/verification/otp/:id"
            element={<VerifyOtp />}
          />
          <Route
            path="accounts/password/reset/:id"
            element={<ForgotPassword />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
