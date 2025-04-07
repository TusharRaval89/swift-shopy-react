import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import Tshirts from "../assets/images/amiri tshirts.jpg";
import Truck from "../assets/images/truck.jpg";
import Ring from "../assets/images/ring.jpg";
import cricketKit from "../assets/images/kit.jpg";
import rolex from "../assets/images/rolex watch.jpg";
import iphone from "../assets/images/iphone.jpg";
import { PiShoppingCartBold } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Try } from "@mui/icons-material";

const Cart = () => {
  const [allProductData, setallProductData] = useState([]);
  const [value, setValue] = useState(1);
  const [quantity, setQuantity] = useState();
  const [isHovered, setIsHovered] = useState(false);

  const getCart = async () => {
    try {
      let res = await axios.get("http://localhost:3000/cart/find");
      console.log("get cart ===>", res.data.data);
      setallProductData(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const removeCart = async (id) => {
    try {
      let res = await axios.delete("http://localhost:3000/cart/delete/" + id);
      console.log(res.data.data);
      getCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const quantityHandler = async (productId, quantity) => {
    try {
      const payload = {
        productId,
        quantity,
      };
      let res = await axios.post("http://localhost:3000/cart/create", payload);
      console.log("click plus", res.data.data);
      getCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const plus = (productID) => {
    setValue(value + 1);
    quantityHandler(productID, value + 1);
  };

  const minus = (productID) => {
    if (value > 1) {
      setValue(value - 1);
      quantityHandler(productID, value - 1);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row g-4 d-flex flex-wrap mt-3">
            {allProductData.map((card, index) => (
              <div className="col-md-3 col-sm-6 col-12" key={index}>
                {/* <Link to={`/product?id=${card.id}`}> */}
                <div className="card h-100 d-flex flex-column">
                  <div className="d-flex position-relative cart-item">
                    <div
                      className="cart-img position-relative"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <img
                        src={card.productId?.thumbnail}
                        className="card-img-top container-fluid"
                        alt={card.productId?.title}
                      />
                      <AiFillDelete
                        className="remove-icon"
                        onClick={() => removeCart(card._id)}
                      />
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column align-items-center">
                    <h5
                      className="card-title fs-4 text-center fw-bold clamped-text"
                      title={card.productId?.title}
                    >
                      {card.productId?.title}
                    </h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="fs-6 d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="ms-1 text-warning" />
                        ))}
                        <IoIosArrowDown className="ms-1" />
                        <p className="fw-bold fs-6 text-center ms-1 pt-3">
                          {card.productId?.rating}
                        </p>
                      </span>
                    </div>
                    <div className="text-center">
                      {card.productId?.highestPurchase}k+ bought in last month
                    </div>
                    <p className="card-text  text-center fw-bold">
                      <span className="ms-1  text-danger ">
                        ({card.productId?.discountPercentage}% off)
                      </span>
                      <br />
                      <span className="ms-3">
                        <sup>₹</sup>
                      </span>
                      <span className="fs-2">
                        {card.productId?.discountPrice}
                      </span>
                      <br />
                      <span className="ms-1 fs-6 text-muted strike">
                        M.R.P: ₹{card.productId?.price}
                      </span>
                      <br />
                    </p>
                    <div className="count-main">
                      <button
                        className="count-btn"
                        onClick={() => minus(card.productId._id)}
                      >
                        -
                      </button>
                      {/* <span className="count-cnt">{value}</span> */}
                      <span className="count-cnt">{card.quantity}</span>
                      <button
                        className="count-btn"
                        onClick={() => plus(card.productId._id)}
                      >
                        +
                      </button>
                    </div>

                    <div className="btn-grp d-flex flex-column align-items-center gap-3 w-100">
                      <button className="common-btn2 btn-padding w-75 fs-6">
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
