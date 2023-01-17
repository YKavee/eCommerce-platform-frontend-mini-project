import React, { useState, useEffect } from "react";
import "./category.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllCategories } from "../../services/category-management/category-management-service";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <MdNavigateNext className="icon" />
      </button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <GrFormPrevious className="icon" />
      </button>
    </div>
  );
}

export const Category = ({ setCatergory }) => {
  const [categoryList, setCatergoryList] = useState([]);

  // fetch all categories
  async function fetchAllCategories() {
    const categories = await getAllCategories();
    setCatergoryList(categories);
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="category">
        <div className="container">
          <Slider {...settings}>
            {categoryList.map((item) => (
              <div
                className="boxs"
                key={item.id}
                onClick={() => {
                  setCatergory(item.title);
                }}
              >
                <div className="box boxItems">
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
