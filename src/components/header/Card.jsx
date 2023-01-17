import React, { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { product } from "../../assets/data/data";
import { CartItems } from "./CartItems";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/order-management/order-management-service";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

export const Card = () => {
  const dispatch = useDispatch();
  const resetCart = () => {
    dispatch(cartActions.resetCart());
  };

  const [cardOpen, setCardOpen] = useState(false);
  const closeCard = () => {
    setCardOpen(null);
  };

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.itemsList);

  //total
  let total = 0;
  const itemsLists = useSelector((state) => state.cart.itemsList);
  itemsLists.forEach((item) => {
    total += item.totalPrice;
  });

  // fetch all product details
  async function createOrders() {
    const cardDetail = {
      id: 1,
      cartProducts: itemsLists,
      totalPrice: total,
    };
    const token = localStorage.getItem("token");
    const response = await createOrder(cardDetail, token);

    if (response.id) {
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

        <div className="checkOut" onClick={createOrders}>
          <button>
            <span>Proceed To Checkout</span>
            <label htmlFor="">${total}</label>
          </button>
        </div>
      </div>
    </>
  );
};
