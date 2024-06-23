import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Order.css";

const Order = ({ cartItems, onSubmitOrder }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const { name, address, phone, email } = userDetails;
    if (!name || !address || !email || !phone) {
      toast.error("Please provide all required information.");
      return;
    }
    try {
      await onSubmitOrder({
        cartItems,
        totalPrice,
        userDetails,
      });
      setUserDetails({ name: "", address: "", email: "", phone: "" });
      
    } catch (error) {
      console.error("Error placing order:", error);
     
    }
  };
  

  return (
    <>
      <Card className="order-card">
        <Card.Body>
          <Card.Title className="order-heading">Order Summary</Card.Title>
          <hr className="order-divider" />
          <ul className="order-items">
            {cartItems.map(
              (item, index) =>
                item.quantity > 0 && (
                  <li key={index} className="order-item">
                    <span className="item-name">
                      <b>{item.name}</b>
                    </span>
                    <span className="item-quantity">
                      {" "}
                      Quantity: {item.quantity}
                    </span>
                  </li>
                )
            )}
          </ul>
          <hr className="order-divider" />
          {typeof totalPrice === "number" && (
            <>
              <p className="order-total">
                <b>Total Price:</b> ${totalPrice.toFixed(2)}
              </p>
              <hr />
            </>
          )}
          <Form onSubmit={(e) => handleSubmitOrder(e)}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="stylish-button">
              Order
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </>
  );
};

export default Order;
