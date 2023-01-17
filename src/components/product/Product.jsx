import React, { useState, useEffect } from "react";
import "./product.css";
import { ProductCart } from "./ProductCart";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../services/product-management/product-management-service";

export const Product = ({ catergory }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [intialProductList, setInitialProductList] = useState([]);

  const searchByText = useSelector((state) => state.header.searchText);

  // fetch all product details
  async function fetchAllProducts() {
    const productList = await getAllProducts();
    setFilteredProducts(productList);
    setInitialProductList(productList);
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const filterProductsByText = () => {
    if (searchByText !== "" && intialProductList.length > 0) {
      let filteredProductArray;
      filteredProductArray = intialProductList.filter(function (item) {
        if (
          item.name !== null &&
          item.name
            .toString()
            .toLowerCase()
            .includes(searchByText.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setFilteredProducts(filteredProductArray);
    } else {
      setFilteredProducts(intialProductList);
    }
  };

  const filterProducts = () => {
    if (catergory) {
      if (catergory == "All") {
        setFilteredProducts(intialProductList);
      } else {
        let filteredProductArray;
        filteredProductArray = intialProductList.filter(function (item) {
          if (
            item.category.toString().toLowerCase() ===
            catergory.toString().toLowerCase()
          ) {
            return true;
          } else {
            return false;
          }
        });
        setFilteredProducts(filteredProductArray);
      }
    } else {
      setFilteredProducts(intialProductList);
    }
  };

  useEffect(() => {
    //setInitialProductList(product);
    filterProducts();
  }, [catergory]);

  useEffect(() => {
    //setInitialProductList(product);
    filterProductsByText();
  }, [searchByText]);

  return (
    <>
      <section className="product">
        <div className="container grid3">
          {filteredProducts.map((item) => (
            <ProductCart
              key={item.id}
              id={item.id}
              cover={item.cover}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </section>
    </>
  );
};
