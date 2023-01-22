import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./popup.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { headerActions } from "../../store/headerSlice";
import { useSelector } from "react-redux";

export const Popup = ({ closePopup, id, cover, name, price, desc }) => {
  // read state from redux store
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  const history = useHistory();
  const dispatch = useDispatch();

  // add items to cart
  const addToCart = () => {
    if (isLoggIn) {
      dispatch(cartActions.addToCart({ id, name, price, cover }));
    } else {
      dispatch(headerActions.hideSearchBar());
      history.push("/login");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        <div>
          <button className="close" onClick={closePopup}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div>
          <Link>
            <img className="image" src={cover} alt="cover" />
          </Link>
          <h1>{name}</h1>
        </div>
        <div className="details">
          <h3 className="price">Rs. {price}</h3>
          <br />
          <a className="desc">{desc}</a>
          <button className="btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
