import axios from "axios";

export async function loginUser(email, password) {
  try {
    const user = {
      email: email,
      password: password,
    };

    const response = await axios
      .post(`http://localhost:4000/food-ordering/v1/users/login`, user)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.debug("User login failed", err);
    return null;
  }
}

export async function signupUser(email, password) {
  try {
    const user = {
      email: email,
      password: password,
    };

    const response = await axios
      .post(`http://localhost:4000/food-ordering/v1/users/signup`, user)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.debug("User signup failed", err);
    return null;
  }
}
