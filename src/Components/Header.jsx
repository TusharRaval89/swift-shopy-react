import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { PiShoppingCartBold } from "react-icons/pi";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import logo from "../assets/images/shopyfily_logo-removebg-preview (1).png";
import axios from "axios";

function Header({ searchProduct, cartRefresh }) {
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  let token = localStorage.getItem("user_token");
  const userProfile = JSON.parse(localStorage.getItem("getUserProfile"));
  const userId = userProfile?._id

  const debounceTimeoutRef = useRef(null);
  const searchHandler = (event) => {
    const searchTerm = event.target.value;
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      searchProduct(searchTerm);
    }, 1000);
  };

  const getCart = async () => {
    try {
      let res = await axios.get("http://localhost:3000/cart/find/" + userId,
        {
          headers: { Authorization: token },
        }
      );
      console.log("get cart ===>", res.data.data);
      // const cartLength = res.data.data.length;
      // console.log("Cart length ===>", cartLength);
      setCartItems(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // const cartCount = async () => {
  //   try {
  //     let res = await axios.get("http://localhost:3000/stats/");
  //     console.log("cart count ===>", res.data);
  //     setCartItems(res.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("login_token");
  //   navigate("/admin/login");
  //   // console.log("Token after removal:", localStorage.getItem("login_token"));
  // };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("getUserProfile");
    // localStorage.removeItem("isAddToCartClick");
  };

  useEffect(() => {
    // cartCount();
    getCart();
  }, [cartRefresh]);

  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light "
          style={{ zIndex: "99" }}
        >
          <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="Logo" style={{ width: "100%" }} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item px-2">
                    <Link className="nav-link active" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <Link className="nav-link active" to="/product">
                      Product
                    </Link>
                  </li>
                  <li className="nav-item px-2">
                    <a className="nav-link" href="#">
                      Category
                    </a>
                  </li>
                  <li className="nav-item px-2">
                    <a className="nav-link" href="#">
                      About
                    </a>
                  </li>
                  <li className="nav-item px-2">
                    <a className="nav-link" href="#">
                      Contact
                    </a>
                  </li>
                </ul>
                <form
                  className="d-flex mx-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    style={{ width: "300px" }}
                    className="form-control"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="Type to search..."
                    onChange={(e) => searchHandler(e)}
                  />
                  <datalist id="datalistOptions">
                    {product.map((product, index) => (
                      <option key={index} value={product.title} />
                    ))}
                  </datalist>
                </form>
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
                  {/* <li className="nav-item mx-3">
                    <Link to="/login">
                      <a className="nav-link" href="#">
                        <h3 className="text-center">
                          <FaRegUser />
                        </h3>
                        <div>Profile</div>
                      </a>
                    </Link>
                  </li> */}
                  <li className="nav-item mx-3">
                    <div className="profile-dropdown">
                      <div class="dropdown">
                        <button
                          class="btn dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <h3 className="text-center">
                            <span className="fs-6 me-2">Hi, {userProfile?.firstname}</span><FaRegUser />
                          </h3>
                        </button>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <Link to="/profile" class="dropdown-item" href="/login">
                              <FaRegUser />
                              <span className="mx-1">Profile</span>
                            </Link>
                          </li>
                          <li onClick={handleLogout}>
                            <Link to="/login" class="dropdown-item" href="#">
                              <FiLogOut />
                              <span className="mx-1">Logout</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li className="nav-item mx-3">
                    <Link to="/cart" className="nav-link">
                      <div className="position-relative text-center">
                        <PiShoppingCartBold size={30} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartItems.length}
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      </div>
                      <div>Cart</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
