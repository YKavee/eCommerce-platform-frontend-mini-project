import React, { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { headerActions } from "../../store/headerSlice";
import { orderActions } from "../../store/orderSlice";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrderDetail } from "../../services/order-management/order-management-service";

export const User = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const history = useHistory();

  // read state from redux store
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  const hideSearchBar = () => {
    dispatch(headerActions.hideSearchBar());
  };

  const close = () => {
    setProfileOpen(null);
  };

  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    dispatch(headerActions.hideSearchBar());
    history.push("/login");
  };

  // fetch order details
  async function fetchOrderDetail() {
    const token = localStorage.getItem("token");
    if (token) {
      const orderDetail = await getOrderDetail(token);
      if (orderDetail.length > 0) {
        dispatch(orderActions.setOrderDetail(orderDetail));
      }
    }
  }

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
                <button className="box" onClick={fetchOrderDetail}>
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
            <button onClick={hideSearchBar}>Login</button>
          </Link>
        )}
      </div>
    </>
  );
};
