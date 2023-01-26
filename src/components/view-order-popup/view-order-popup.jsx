import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./view-order-popup.css";
import { useSelector } from "react-redux";

export const ViewOrder = ({ closePopup }) => {
  // read state from redux store
  const orderDetail = useSelector((state) => state.order.orderDetail);

  return (
    <div className="view-order-popup-container">
      <div className="view-order-popup-body">
        <div>
          <button className="close" onClick={closePopup}>
            <AiOutlineCloseCircle />
          </button>
          <div>
            <h1>Order Detail</h1>
          </div>
        </div>
        <br />
        {orderDetail.length > 0 ? (
          <div>
            <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
              {orderDetail[0].cartProducts.map((item) => (
                <div>
                  <img className="order-image" src={item.cover} alt="cover" />
                  <h3>
                    {item.name} - Rs. {item.totalPrice}
                  </h3>
                </div>
              ))}
            </div>
            <br />
            <br />
            <div>
              <h1>Total Price - Rs. {orderDetail[0].totalPrice}</h1>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
