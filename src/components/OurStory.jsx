import React from "react";
import "./OurStory.css";

const OurStory = () => {
  return (
    <div>
      <div className="text-center my-5">
        <h1 className="display-4 font-weight-bold fancy-text">
          Welcome to Jacked Nutrition Store!
        </h1>
        <p className="lead text-secondary">
          Fueling Your Journey to Fitness and Well-Being
        </p>
      </div>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6">
            <h2 className="mb-4">Our Mission</h2>
            <p className="mission-text">
              At Jacked Nutrition Store, we are on a mission to provide you with
              the finest and most effective nutritional products to support your
              fitness goals. We believe that a healthy lifestyle is the key to
              unlocking your full potential.
            </p>
            <p className="mission-text">
              Whether you're an athlete pushing your limits, a fitness
              enthusiast on a transformation journey, or someone looking to
              maintain a balanced lifestyle, we've curated a range of products
              to meet your unique needs.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/p11.jpg"
              alt="Our Story"
              className="img-fluid rounded"
            />
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-6 order-md-2">
            <h2 className="mb-4">Quality Assurance</h2>
            <p className="quality-text">
              We understand the importance of quality when it comes to
              nutrition. That's why we source our products from trusted
              suppliers and ensure that each item meets the highest standards of
              quality and purity.
            </p>
            <p className="quality-text">
              Your health is our top priority, and we are committed to providing
              you with products that contribute to your overall well-being.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <img
              src="/p12.jpg"
              alt="Quality Assurance"
              className="img-fluid rounded"
            />
          </div>
        </div>
        <div className="text-center my-5">
          <h2 className="mb-4">Discover Amazing Products!</h2>
          <p className="lead text-secondary">
            Explore our curated selection of nutrition products and embark on a
            journey to a healthier, fitter, and more energized you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
