import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductCart } from "./ProductCart";
import "./product.css";
import { getAllProducts } from "../../services/product-management/product-management-service";

export const Product = ({ catergory }) => {
  const [filteredProducts, setFilteredProducts] = useState([]); // filterd product list
  const [intialProductList, setInitialProductList] = useState([]); // initial product list

  // read state from redux store
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

  // filter the product list by searching
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

  useEffect(() => {
    filterProductsByText();
  }, [searchByText]);

  // filter the product list by category
  const filterProductsByCategory = () => {
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
    filterProductsByCategory();
  }, [catergory]);

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