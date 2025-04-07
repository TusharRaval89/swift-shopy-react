import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import iphone from "../assets/images/iphone.jpg";
import iphone2 from "../assets/images/iphone2.jpg";
import iphone3 from "../assets/images/iphone3.jpg";
import iphone4 from "../assets/images/iphone4.jpg";
import amiri from "../assets/images/amiri tshirts.jpg";
import amiri2 from "../assets/images/amiri2.jpg";
import amiri3 from "../assets/images/amiri3.jpg";
import amiri4 from "../assets/images/amiri4.jpg";
import truck from "../assets/images/truck.jpg";
import truck2 from "../assets/images/truck2.jpg";
import truck3 from "../assets/images/truck3.jpg";
import truck4 from "../assets/images/truck4.jpg";
import ring from "../assets/images/ring.jpg";
import ring2 from "../assets/images/ring2.jpg";
import ring3 from "../assets/images/ring3.jpg";
import ring4 from "../assets/images/ring4.jpg";
import kit from "../assets/images/kit.jpg";
import kit2 from "../assets/images/kit2.jpg";
import kit3 from "../assets/images/kit3.jpg";
import kit4 from "../assets/images/kit4.jpg";
import rolex from "../assets/images/rolex watch.jpg";
import rolex2 from "../assets/images/rolex2.jpg";
import rolex3 from "../assets/images/rolex3.jpg";
import rolex4 from "../assets/images/rolex4.jpg";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiShoppingCartBold } from "react-icons/pi";
import axios from "axios";
import AllProduct from "../Components/AllProduct";

const productList = [
  {
    id: 1,
    title: "iPhone 16 Pro Max 256 GB",
    description:
      "5G Mobile Phone with Camera Control, 4K 120 fps Dolby Vision and a Huge Leap in Battery Life. Works with AirPods; Black Titanium",
    images: [iphone, iphone2, iphone3, iphone4], // Multiple images for product
    rating_count: "25002",
    last_purchase_count: "2.2k",
    amount: "89,999",
    discount_amount: "99,9999",
    discount_percentage: "29%",
    brand: "Apple",
    product_name: "iPhone 16 Pro Max",
    category: "electronic",
    quantity: "2",
    country: "India",
  },
  {
    id: 2,
    title: "Jewelry Set - CZ STONE NECKLACE",
    description: "Beautiful handcrafted jewelry set with silver plating.",
    images: [amiri, amiri2, amiri3, amiri4], // Different images for this product
    rating_count: "1500",
    last_purchase_count: "800",
    amount: "2,499",
    discount_amount: "3,599",
    discount_percentage: "30%",
    brand: "Fashion Accessories",
    product_name: "CZ STONE NECKLACE",
    category: "accessories",
    quantity: "5",
    country: "India",
  },
  {
    id: 3,
    title: "Jewelry Set - CZ STONE NECKLACE",
    description: "Beautiful handcrafted jewelry set with silver plating.",
    images: [truck, truck2, truck3, truck4], // Different images for this product
    rating_count: "1500",
    last_purchase_count: "800",
    amount: "2,499",
    discount_amount: "3,599",
    discount_percentage: "30%",
    brand: "Fashion Accessories",
    product_name: "CZ STONE NECKLACE",
    category: "accessories",
    quantity: "5",
    country: "India",
  },
  {
    id: 4,
    title: "Jewelry Set - CZ STONE NECKLACE",
    description: "Beautiful handcrafted jewelry set with silver plating.",
    images: [ring, ring2, ring3, ring4], // Different images for this product
    rating_count: "1500",
    last_purchase_count: "800",
    amount: "2,499",
    discount_amount: "3,599",
    discount_percentage: "30%",
    brand: "Fashion Accessories",
    product_name: "CZ STONE NECKLACE",
    category: "accessories",
    quantity: "5",
    country: "India",
  },
  {
    id: 5,
    title: "Jewelry Set - CZ STONE NECKLACE",
    description: "Beautiful handcrafted jewelry set with silver plating.",
    images: [kit, kit2, kit3, kit4], // Different images for this product
    rating_count: "1500",
    last_purchase_count: "800",
    amount: "2,499",
    discount_amount: "3,599",
    discount_percentage: "30%",
    brand: "Fashion Accessories",
    product_name: "CZ STONE NECKLACE",
    category: "accessories",
    quantity: "5",
    country: "India",
  },
  {
    id: 6,
    title: "Jewelry Set - CZ STONE NECKLACE",
    description: "Beautiful handcrafted jewelry set with silver plating.",
    images: [rolex, rolex2, rolex3, rolex4], // Different images for this product
    rating_count: "1500",
    last_purchase_count: "800",
    amount: "2,499",
    discount_amount: "3,599",
    discount_percentage: "30%",
    brand: "Fashion Accessories",
    product_name: "CZ STONE NECKLACE",
    category: "accessories",
    quantity: "5",
    country: "India",
  },
];

function Product() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  const [product, setProduct] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // if (!productId) {
    //   setError("Invalid Product ID");
    //   setLoading(false);
    //   return;
    // }
    if (productId) {
      fetchProduct(productId);
    } else {
      fetchAllProduct();
    }
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      let res = await axios.get(`http://localhost:3000/product/find/${id}`);
      console.log("get one product", res.data.data);

      if (res.data.status === "Success") {
        setProduct(res.data.data);
        setSelectedImage(res.data.data.thumbnail);
      } else {
        setError("Failed to load product");
      }
    } catch (error) {
      setError("Failed to fetch product details");
    }
    setLoading(false);
  };

  const fetchAllProduct = async () => {
    try {
      let res = await axios.get(`http://localhost:3000/product/find`);
      console.log("get one product", res.data.data);

      if (res.data.status === "Success") {
        setAllProduct(res.data.data);
        setSelectedImage(res.data.data.thumbnail);
      } else {
        setError("Failed to load product");
      }
    } catch (error) {
      setError("Failed to fetch product details");
    }
    setLoading(false);
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">{error}</h2>;
  // if (!product) return <h2 className="text-center mt-5">Product Not Found</h2>;

  // useEffect(() => {
  //   const product = productList.find((p) => p.id === Number(productId));
  //   if (product) {
  //     setSelectedProduct(product);
  //     setSelectedImage(product.images[0]); // Set first image as default
  //   }
  // }, [productId]);

  // if (!selectedProduct) {
  //   return <h2 className="text-center mt-5">Product Not Found</h2>;
  // }

  const AddToCardProduct = async () => {
    // console.log(productId);
    if (!product || !product._id) {
      console.log("Invalid product data");
      return;
    }

    const cartItem = {
      productId: product._id,
      quantity: 1,
    };

    try {
      let res = await axios.post("http://localhost:3000/cart/create", cartItem);
      console.log("add to cart ==.", res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {allProduct.length > 0 ? (
        <AllProduct />
      ) : (
        <div className="container-fluid mt-4">
          <div className="container d-flex">
            <>
              {/* Left Side - Main Image and Thumbnails */}
              <div className="w-50 px-15">
                <img
                  src={selectedImage}
                  className="img-fluid rounded"
                  alt="Product"
                  style={{ maxWidth: "100%", height: "auto" }}
                />

                {/* Small Images - Dynamically Set Based on Selected Product */}
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  {product?.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="img-thumbnail border-0"
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                        border:
                          selectedImage === img ? "2px solid blue" : "none",
                      }}
                      onClick={() => setSelectedImage(img)} // Update selected image
                    />
                  ))}
                </div>
              </div>

              {/* Right Side - Product Details */}
              <div className="w-50 px-50">
                <div className="title-cnt">
                  <h2 className="title-cnt1">{product.title}</h2>
                  <p>{product.description}</p>
                </div>

                {/* Ratings */}
                <div className="d-flex align-items-center">
                  <span className="fs-6 d-flex align-items-center">
                    <FaStar className="ms-1 text-warning" />{" "}
                    <FaStar className="ms-1 text-warning" />
                    <FaStar className="ms-1 text-warning" />{" "}
                    <FaStar className="ms-1 text-warning" />
                    <FaStar className="ms-1 text-warning" />
                    <IoIosArrowDown className="ms-1" />
                    <p className="fw-bold fs-6 text-center ms-1 pt-3">
                      {product.rating}
                    </p>
                  </span>
                </div>

                <div className="border-btm pb-1">
                  {product.highestPurchase}+k bought in last month
                </div>

                {/* Price Section */}
                <p className="card-text fs-5 fw-bold mt-2">
                  <span>
                    <sup>₹</sup>
                  </span>
                  <span className="fs-2">{product.discountPrice}</span>
                  <span className="ms-1 fs-6 text-muted strike">
                    M.R.P: ₹{product.price}
                  </span>
                  <span className="ms-1 fs-6 text-danger">
                    ({product.discountPercentage}% off)
                  </span>
                </p>

                {/* Buttons */}
                <div className="btn-grp d-flex flex-column align-items-center gap-3 mt-4 w-100 py-4">
                  <button
                    className="common-btn1 d-flex align-items-center justify-content-center gap-2 w-75 fs-5"
                    onClick={AddToCardProduct}
                  >
                    <PiShoppingCartBold /> ADD TO CART
                  </button>
                  <button className="common-btn2 w-75 fs-5">BUY NOW</button>
                </div>

                {/* Additional Product Details */}
                {/* <div className="product-detail">
        <h6 className="detail-main">Product Details</h6>
        <p className="detail-cnt">Brand: {selectedProduct.brand}</p>
        <p className="detail-cnt">Category: {selectedProduct.category}</p>
        <p className="detail-cnt">Quantity: {selectedProduct.quantity}</p>
        <p className="detail-cnt">
          Country of Origin: {selectedProduct.country}
        </p>
      </div> */}
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
