import axios from "axios";

export async function createOrder(cartDetail, token) {
  const headers = {
    Authorization: token,
  };
  try {
    const response = await axios
      .post(`http://localhost:3000/food-ordering/v1/orders`, cartDetail, {
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
