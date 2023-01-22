import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./login.css";
import back from "../../assets/images/my-account.jpg";
import { signupUser } from "../..//services/user-management/user-management-service";
import { headerActions } from "../../store/headerSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const Register = () => {
  const [email, setEmail] = useState(""); // set email
  const [password, setPassword] = useState(""); // set password
  const [confirmPassword, setConfirmPassword] = useState(""); // set confirm password
  const [errorMessage, setErrorMessage] = useState(""); // set error message

  // read state from redux store
  const isLogged = useSelector((state) => state.auth.isLogged);

  const dispatch = useDispatch();
  const history = useHistory();

  //user signup
  async function handleSubmit(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      const userDetail = await signupUser(email, password);
      if (userDetail.email) {
        history.push("/login");
      }
    } else {
      setErrorMessage("The password and confirmation password do not match!");
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
            <span>Email address *</span>
            <input
              type="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
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

            <span>Confirm Password *</span>
            <input
              type="password"
              required
              onChange={(e) => {
                if (e.target.value) {
                  setConfirmPassword(e.target.value);
                  setErrorMessage("");
                }
              }}
            />
            {errorMessage !== "" ? (
              <div className="error"> {errorMessage} </div>
            ) : null}
            <button className="button">Register</button>
            <br />
            <span>
              Already have an account? Login
              <Link to="/login" className="link">
                Here
              </Link>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};
