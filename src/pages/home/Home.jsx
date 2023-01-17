import React, { useState } from "react";
import { Category } from "../../components/category/Category";
import { Product } from "../../components/product/Product";

export const Home = () => {
  // state of category
  const [catergory, setCatergory] = useState("");

  return (
    <>
      <Category setCatergory={setCatergory} />
      <Product catergory={catergory} />
    </>
  );
};
