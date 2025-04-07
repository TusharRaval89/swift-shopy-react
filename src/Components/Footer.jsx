import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5 position-relative">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>SwiftShopy</h5>
            <p>Providing quality products and services since 2024.</p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="p-1"><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li className="p-1"><a href="#" className="text-light text-decoration-none">Products</a></li>
              <li className="p-1"><a href="#" className="text-light text-decoration-none">Category</a></li>
              <li className="p-1"><a href="#" className="text-light text-decoration-none">About</a></li>
              <li className="p-1"><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: SwiftShopy@gmail.com</p>
            <p>Phone: +1 234 567 890</p>
            <div className="d-flex">
              <a href="#" className="btn btn-outline-light btn-sm me-2"><FaFacebookF /></a>
              <a href="#" className="btn btn-outline-light btn-sm me-2"><FaTwitter /></a>
              <a href="#" className="btn btn-outline-light btn-sm me-2"><FaInstagram /></a>
              <a href="#" className="btn btn-outline-light btn-sm"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">© 2025 MyCompany. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
