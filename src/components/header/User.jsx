import React, { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { headerActions } from "../../store/headerSlice";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const User = () => {
  const history = useHistory();
  const [profileOpen, setProfileOpen] = useState(false);

  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  const login = () => {
    dispatch(headerActions.searchBarDisable());
  };

  const close = () => {
    setProfileOpen(null);
  };

  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    dispatch(headerActions.searchBarDisable());
    history.push("/login");
  };
  return (
    <>
      <div className="profile">
        {isLoggIn ? (
          <>
            <button
              className="img"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                alt=""
              />
            </button>

            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <button className="box">
                  <BsBagCheck className="icon" />
                  <h4>My Order</h4>
                </button>
                <button className="box" onClick={logoutHandler}>
                  <BiLogOut className="icon" />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <button onClick={login}>Login</button>
          </Link>
        )}
      </div>
    </>
  );
};
