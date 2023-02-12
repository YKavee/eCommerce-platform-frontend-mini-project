import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./login.css";
import back from "../../assets/images/grocery-shopping.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { headerActions } from "../../store/headerSlice";
import { loginUser } from "../..//services/user-management/user-management-service";

export const Login = () => {
  const [email, setEmail] = useState(""); // set email
  const [password, setPassword] = useState(""); // set password
  const [errorMessage, setErrorMessage] = useState(""); // set error message

  // read state from redux store
  const isLogged = useSelector((state) => state.auth.isLogged);

  const history = useHistory();
  const dispatch = useDispatch();

  //user login
  async function handleSubmit(e) {
    e.preventDefault();
    const userDetail = await loginUser(email, password);
    if (userDetail && userDetail.token.length > 0) {
      // store token in local storage
      localStorage.setItem("token", userDetail.token);
      dispatch(authActions.login());
      dispatch(headerActions.showSearchBar());
      history.push("/");
    } else {
      setErrorMessage("Invalid email or password!");
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
              type="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(e) => {
                if (e.target.value) {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }
              }}
            />
            <span>Password *</span>
            <input
              type="password"
              required
              onChange={(e) => {
                if (e.target.value) {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }
              }}
            />
            {errorMessage !== "" ? (
              <div className="error"> {errorMessage} </div>
            ) : null}
            <button className="button">Log in</button>
            <br />
            <span>
              Don't have an account? SignUp
              <Link to="/register" className="link">
                Here
              </Link>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};
