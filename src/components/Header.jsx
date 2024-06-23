import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Header.css";

const Header = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 2000,     // Set autoplay speed in milliseconds
  };

  return (
    <div className="header">
      <Slider {...sliderSettings}>
        {/* Text-only slides */}
        <div>
          <h1>Jacked Nutrition Store!</h1>
        </div>
        <div>
          <h1>Products with amazing Prices!</h1>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default Header;