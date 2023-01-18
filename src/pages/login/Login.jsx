import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./login.css";
import back from "../../assets/images/my-account.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { headerActions } from "../../store/headerSlice";
import { loginUser } from "../..//services/user-management/user-management-service";

export const Login = () => {
  const [email, setEmail] = useState(""); // set email
  const [password, setPassword] = useState(""); // set password

  // read state from redux store
  const isLogged = useSelector((state) => state.auth.isLogged);

  const history = useHistory();
  const dispatch = useDispatch();

  //user login
  async function handleSubmit(e) {
    e.preventDefault();
    const userDetail = await loginUser(email, password);
    if (userDetail.token.length > 0) {
      // store token in local storage
      localStorage.setItem("token", userDetail.token);
      dispatch(authActions.login());
      dispatch(headerActions.showSearchBar());
      history.push("/");
    }
  }

  useEffect(() => {
    if (!isLogged) {
      dispatch(headerActions.hideSearchBar());
    }
  }, []);

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
          </div>

          <form onSubmit={handleSubmit}>
            <span>Email address</span>
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Password *</span>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button">Log in</button>
          </form>
        </div>
      </section>
    </>
  );
};
