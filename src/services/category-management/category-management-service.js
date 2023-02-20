import axios from "axios";

export async function getAllCategories() {
  try {
    const response = await axios
      .get(`http://localhost:4000/food-ordering/v1/categories`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.debug("Get all categories failed", err);
    return null;
  }
}
