import Slider from "react-slick";

import ProductCard from "../Card/productCard";
import styles from "./SliderCard.module.css";

function ProductSlider({ data = [] }) {
  const settings = {
    dots: false,
    className: "custom-slick-slider-product",
    infinite: true,
    speed: 500,
    slidesToShow: data.length > 5 ? 5 : data.length,
    slidesToScroll: data.length > 5 ? 5 : data.length,
  };

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <ProductCard data={item} key={index} />
      ))}
    </Slider>
  );
}

export default ProductSlider;
