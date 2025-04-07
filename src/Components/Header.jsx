import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import logo from "../assets/images/creative-logo.svg";
import axios from "axios";

function Header({ searchProduct }) {
  const [product, setProduct] = useState([]);

  const debounceTimeoutRef = useRef(null);
  const searchHandler = (event) => {
    const searchTerm = event.target.value;
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      searchProduct(searchTerm);
    }, 1000);
  };

  // useEffect(() => {
  //   searchProduct();
  // }, []);

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
                  <li className="nav-item mx-3">
                    <Link to="/login">
                      <a className="nav-link" href="#">
                        <h3 className="text-center">
                          <FaRegUser />
                        </h3>
                        <div>Profile</div>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link to="/cart">
                      <a className="nav-link" href="#">
                        <h3 className="text-center">
                          <PiShoppingCartBold />
                        </h3>
                        <div>Cart</div>
                      </a>
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
