import React, { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { CartItems } from "./CartItems";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/order-management/order-management-service";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

export const Card = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  // reset the cart after checkout
  const resetCart = () => {
    dispatch(cartActions.resetCart());
  };

  const closeCard = () => {
    setCardOpen(null);
  };

  // read state from redux store
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.itemsList);

  // calculate total price
  const calculateTotalPrice = () => {
    if (cartItems.length > 0) {
      let total = 0;
      setIsDisable(false);
      cartItems.forEach((item) => {
        total += item.totalPrice;
        setTotalPrice(total);
      });
    } else {
      setIsDisable(true);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  // create an order
  async function createOrders() {
    const cardDetail = {
      cartProducts: cartItems,
      totalPrice: totalPrice,
    };

    // read token from local storage
    const token = localStorage.getItem("token");
    const response = await createOrder(cardDetail, token);

    if (response.cartProducts.length > 0) {
      resetCart();
    }
  }

  return (
    <>
      <div className="card" onClick={() => setCardOpen(!cardOpen)}>
        <BiShoppingBag className="cardIcon" />
        <span className="flexCenter">{quantity}</span>
      </div>
      <div className={cardOpen ? "overlay" : "nonoverlay"}></div>

      <div className={cardOpen ? "cartItem" : "cardhide"}>
        <div className="title flex">
          <h2>Shopping Cart</h2>
          <button onClick={closeCard}>
            <AiOutlineClose className="icon" />
          </button>
        </div>

        <div>
          <button className="clear-cart-button" onClick={resetCart}>
            Clear Cart
          </button>
        </div>

        <div style={{ overflowY: "scroll", maxHeight: "750px" }}>
          {cartItems.map((item) => (
            <CartItems
              id={item.id}
              cover={item.cover}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
            />
          ))}
        </div>

        <div className="checkOut" onClick={createOrders}>
          <button disabled={isDisable}>
            <span>Proceed To Checkout</span>
            <label>Rs. {totalPrice.toFixed(2)}</label>
          </button>
        </div>
      </div>
    </>
  );
};
