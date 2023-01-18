import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <span>Password *</span>
            <input
              type="text"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <span>Confirm Password *</span>
            <input
              type="text"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="button">Register</button>
          </form>
        </div>
      </section>
    </>
  );
};
