import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { headerActions } from "../../store/headerSlice";
import { useSelector } from "react-redux";

export const ProductCart = ({ key, id, cover, name, price }) => {
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
    <>
      <div className="box boxItems" id="product">
        <div className="img">
          <Link>
            <img src={cover} alt="cover" />
          </Link>
        </div>
        <div className="details">
          <h3>Rs. {price}</h3>
          <p>{name}</p>
          <button onClick={addToCart}>
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>
    </>
  );
};
