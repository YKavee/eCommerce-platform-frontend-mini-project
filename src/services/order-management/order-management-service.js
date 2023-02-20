import axios from "axios";

export async function createOrder(cartDetail, token) {
  try {
    const headers = {
      Authorization: token,
    };

    const response = await axios
      .post(`http://localhost:4000/food-ordering/v1/orders`, cartDetail, {
        headers: headers,
      })
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.debug("create order failed", err);
    return null;
  }
}

export async function getOrderDetail(token) {
  try {
    const headers = {
      Authorization: token,
    };

    const response = await axios
      .get(`http://localhost:4000/food-ordering/v1/orders`, {
        headers: headers,
      })
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.debug("Get orders detail failed", err);
    return null;
  }
}
