import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import ResponsiveDrawer from "./Filter";
import axios from "axios";
import product from '../assets/images/product.webp'

function AllProduct({searchProductData}) {
  const [allProductData, setallProductData] = useState([]);

  const getProduct = async () => {
    try {
      let res = await axios.get("http://localhost:3000/product/find");
      setallProductData(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  
  useEffect(() => {
    if(searchProductData) {
      console.log('searchProductData :- ', searchProductData);
      setallProductData(searchProductData);
    } else {
      getProduct();
    }
  }, [searchProductData]);

  return (
    <>
      <div className="container-fluid d-flex">
        <div className="w-25 d-md-block d-none">
          <ResponsiveDrawer />
        </div>

        <div className="w-md-75 w-100 mt-3">
          <div className="row g-4 d-flex flex-wrap">
            {allProductData.map((card, index) => (
              <div className="col-md-4 col-sm-6 col-12" key={index}>
                <a href={`/product?id=${card._id}`}>
                  <div className="card h-100 d-flex flex-column">
                    <img
                      src={card.thumbnail}
                      className="card-img-top container-fluid"
                      alt={card.title}
                    />
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title fs-4 text-center fw-bold">
                        {card.title}
                      </h5>
                      <div className="d-flex justify-content-center align-items-center">
                        <span className="fs-6 d-flex align-items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="ms-1 text-warning" />
                          ))}
                          <IoIosArrowDown className="ms-1" />
                          <p className="fw-bold fs-6 text-center ms-1 pt-3">
                            {card.rating}
                          </p>
                        </span>
                      </div>
                      <div className="text-center">
                        {card.highestPurchase}k + bought in last month
                      </div>
                      <p className="card-text fs-5 text-center fw-bold">
                        <span className="ms-1 fs-5 text-danger">
                          ({card.discountPercentage}% off)
                        </span>
                        <span className="ms-3">
                          <sup>₹</sup>
                        </span>
                        <span className="fs-2">{card.discountPrice}</span>
                        <br />
                        <span className="ms-1 fs-6 text-muted strike">
                          M.R.P: ₹{card.price}
                        </span>

                        <br />
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            {
              allProductData.length === 0 && (
                <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'80vh'}}>
                  <img src={product} alt="" width={"30%"}/>
                <h3 className="text-center">Product Not Found</h3>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProduct;
