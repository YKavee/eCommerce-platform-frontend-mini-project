import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../assets/images/logo.png";
import "./header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Card } from "./Card";
import { User } from "./User";
import { headerActions } from "../../store/headerSlice";

export const Header = () => {
  const dispatch = useDispatch();

  // store input of the search bar
  const searchByText = (text) => {
    dispatch(headerActions.search(text));
  };

  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <>
      <header className="header">
        <div className="container flex">
          <div className="">
            <Link to="/">
              <img className="headerImg" src={Logo} alt="" />
            </Link>
          </div>
          <div className="search flex">
            <AiOutlineSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                searchByText(event.target.value);
              }}
            />
          </div>
          <div className="account flexCenter">
            <Card />
            <User />
          </div>
        </div>
      </header>
    </>
  );
};
