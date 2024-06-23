import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShoppingCart = ({cartItems,removeFromCart,updateCart})=>{
  const handleIncrement = (itemName)=>{
    const updatedCart = cartItems.map((item)=>{
      if(item.name === itemName){
        return{...item, quantity:item.quantity + 1}
      }
      return item;
    });
    updateCart(updatedCart);
  }
const handleDecrement = (itemName)=>{
  const updatedCart = cartItems.map((item)=>{
    if(item.name === itemName && item.quantity > 1){
      return {...item, quantity:item.quantity - 1}
    }
    return item;
  })
  updateCart(updatedCart)
};
const handleRemove =(itemName)=>{
  const updatedCart = cartItems.filter((item)=>
  item.name!==itemName);
  updateCart(updatedCart);
}
  return (
    <Container className="mt-3">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-4">
          {cartItems.map((item) => (
            <Col key={item._id}>
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div className="mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid mb-3"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <strong className="text-truncate d-block">
                      {item.name}
                    </strong>
                    <div className="small text-muted">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Button
                        variant="danger"
                        size="sm"
                        className="mx-1"
                        onClick={() => handleRemove(item.name)}
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mx-1"
                        onClick={() => handleIncrement(item.name)}
                      >
                        <FaPlus />
                      </Button>
                      <span className="mx-1">{item.quantity}</span>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDecrement(item.name)}
                      >
                        <FaMinus />
                      </Button>
                    </div>
                    <Badge variant="primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <p>Your cart is empty</p>
          </Col>
        </Row>
      )}
      <div className="mt-3 mb-3 d-flex justify-content-end">
        <Link to="/products" className="flex-grow-1 me-2">
          <Button variant="outline-secondary" className="w-100">
            Continue Shopping
          </Button>
        </Link>
        <Link to="/order" className="flex-grow-1">
          <Button variant="success" className="w-100">
            Proceed to Order
          </Button>
        </Link>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default ShoppingCart;
