import React, { useState } from "react";
import { Category } from "../../components/category/Category";
import { Product } from "../../components/product/Product";

export const Home = () => {
  const [catergory, setCatergory] = useState(""); // selected category

  return (
    <>
      <Category setCatergory={setCatergory} />
      <Product catergory={catergory} />
    </>
  );
};
