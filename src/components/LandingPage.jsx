import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import {  FaSignInAlt } from "react-icons/fa"; 


const LandingPage = () => {
  const navigate = useNavigate();

  

  const handleLogin = ()=>{
    navigate('/login')
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3">
          <img
            src="p10.jpg"
            alt="Product Image"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 text-center">
          <h1 className="display-4 fancy-text">Discover Amazing Products and Deals!</h1>
          <p className="lead">
            Find the best deals on a wide range of products. Start exploring now!
          </p>
         
         
         <Button
          style={{ backgroundColor: "#4CAF50" }}
            size="lg"
            onClick={handleLogin}
            className="mt-3 mx-2 "
            
          >
          <FaSignInAlt className="mr-2" /> Login
       
         
         </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
