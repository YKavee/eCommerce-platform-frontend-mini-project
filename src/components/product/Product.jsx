import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductCart } from "./ProductCart";
import "./product.css";
import { getAllProducts } from "../../services/product-management/product-management-service";
import { Popup } from "../popup/popup";
import { ViewOrder } from "../view-order-popup/view-order-popup";

export const Product = ({ catergory }) => {
  const [filteredProducts, setFilteredProducts] = useState([]); // filterd product list
  const [intialProductList, setInitialProductList] = useState([]); // initial product list
  const [open, setOpen] = useState(false);
  const [popupDetail, setPopupDetail] = useState({
    productId: "",
    productCover: "",
    productName: "",
    productPrice: "",
    productDesc: "",
  });
  const [viewOrder, setViewOrder] = useState(false);

  // read state from redux store
  const searchByText = useSelector((state) => state.header.searchText);
  const orderDetail = useSelector((state) => state.order.orderDetail);

  useEffect(() => {
    console.log("orderDetail", orderDetail);
    if (orderDetail.length > 0) {
      setViewOrder(true);
    } else {
      setViewOrder(false);
    }
  }, [orderDetail]);

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
              id={item.id}
              cover={item.cover}
              name={item.name}
              price={item.price}
              desc={item.desc}
              setOpen={setOpen}
              setPopupDetail={setPopupDetail}
            />
          ))}
        </div>

        <div>
          {open ? (
            <Popup
              closePopup={() => setOpen(false)}
              id={popupDetail.productId}
              cover={popupDetail.productCover}
              name={popupDetail.productName}
              price={popupDetail.productPrice}
              desc={popupDetail.productDesc}
            />
          ) : null}
        </div>

        <div>
          {viewOrder ? (
            <ViewOrder closePopup={() => setViewOrder(false)} />
          ) : null}
        </div>
      </section>
    </>
  );
};
