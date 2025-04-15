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
import { Reviews, Try } from "@mui/icons-material";
import { useFormik } from "formik";
import { toast } from "react-toastify";

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

function Product({ onAddToCart, searchProductData }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  // console.log("product id==>",productId);

  const [product, setProduct] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let token = localStorage.getItem("user_token");
  const [rating, setRating] = useState(1);
  const [reviewData, setReviewData] = useState([
    {
      name: "tushar raval",
      customersay:
        "I am looking for the Nutri Trainer course, and I found the FGIIT Course here and its best for personal training and ",
    },
    {
      name: "nehil raval",
      customersay:
        "demo am looking for the Nutri Trainer course, and I found the FGIIT Course here and its best for personal training and ",
    },
  ]);
  const userProfile = JSON.parse(localStorage.getItem("getUserProfile"));
  // console.log("userProfile===>",userProfile);

  const formik = useFormik({
    initialValues: {
      productId: "",
      ratingCount: "",
      customerSay: "",
      userId: "",
    },
    onSubmit: (values) => {
      console.log(values);

      console.log("rating :-", rating);
      addReview(values);
    },
  });

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
      getReview();
      // ProductReview(productId)
    } else {
      fetchAllProduct();
    }
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      let res = await axios.get(`http://localhost:3000/product/find/${id}`);
      console.log("get one product", res);

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

  const getReview = async () => {
    try {
      let res = await axios.get(
        "http://localhost:3000/review/find/" + productId
      );
      console.log("get review==>", res.data.data);
      setReviewData(res.data.data);
    } catch (error) {
      console.log(error.res.data);
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">{error}</h2>;

  const AddToCardProduct = async () => {
    // console.log(productId);
    if (!product || !product._id) {
      console.log("Invalid product data");
      return;
    }

    const payload = {
      productId: product._id,
      quantity: 1,
      userId: userProfile?._id,
    };

    try {
      let res = await axios.post("http://localhost:3000/cart/create", payload, {
        headers: { Authorization: token },
      });
      localStorage.setItem("isAddToCartClick", true);
      console.log("add to cart ==.", res.data.data);
      toast.success("Product added to cart successfully!");

      onAddToCart();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addReview = async (values) => {
    const payload = {
      productId: productId,
      ratingCount: rating,
      customerSay: values.customerSay,
      userId: userProfile?._id,
    };

    try {
      let res = await axios.post(
        "http://localhost:3000/review/create",
        payload
      );
      console.log("add review", res.data.data);
      getReview();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {allProduct.length > 0 ? (
        <AllProduct searchProductData={searchProductData} />
      ) : (
        <div className="container-fluid mt-4">
          <div className="container d-flex ">
            <>
              <div className="w-50 px-15">
                <img
                  src={selectedImage}
                  className="img-fluid rounded"
                  alt="Product"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
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
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>
              <div className="w-50 px-50">
                <div className="title-cnt">
                  <h2 className="title-cnt1">{product.title}</h2>
                  <p>{product.description}</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="fs-6 d-flex align-items-center">
                    <FaStar className="ms-1 text-warning" />
                    <FaStar className="ms-1 text-warning" />
                    <FaStar className="ms-1 text-warning" />
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

                <div className="btn-grp d-flex flex-column align-items-center gap-3 mt-4 w-100 py-4">
                  <button
                    className="common-btn1 d-flex align-items-center justify-content-center gap-2 w-75 fs-5"
                    onClick={AddToCardProduct}
                  >
                    <PiShoppingCartBold /> ADD TO CART
                  </button>
                  <button className="common-btn2 w-75 fs-5">BUY NOW</button>
                </div>
              </div>
            </>
          </div>

          <div className="container mt-5">
            <div className="w-50">
              <div className="mb-4">
                <h3 className="fw-semibold">Customer Reviews</h3>
              </div>
              <div className="review-section d-flex">
                <div className="w-50">
                  <div>
                    <h5 className="mb-2 ">OVERALL RATING</h5>
                  </div>
                  <div>
                    <h1 className="mb-2 fw-bold ">5.0</h1>
                  </div>
                  <div className="filter cnt ">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="ms-1"
                        color={i < rating ? "gold" : "gray"}
                        size={30}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                  <div>
                    <h5 className="fw-light">{reviewData.length} Reviews</h5>
                  </div>
                </div>
                <div className="w-50">
                  <div className="filter cnt ">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="ms-1"
                        color={i < rating ? "gold" : "gray"}
                        size={30}
                        onClick={() => setRating(i + 1)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Please Enter Your Reviews"
                        name="customerSay"
                        onChange={formik.handleChange}
                        value={formik.values.customerSay}
                      />
                    </div>
                    <div className="mt-3">
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <div className="w-50">
              <div className="fw-bold mb-3">
                <h3>Reviews</h3>
              </div>
              {reviewData.map((review, index) => (
                <div key={index} className="user-review-cnt mb-5">
                  <div className="d-flex align-items-center">
                    <div>
                      <span className="fw-bold">
                        {review?.userId?.firstname} {review?.userId?.lastname}
                      </span>
                    </div>
                    <div className="filter cnt ">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="ms-1"
                          color={i < review.ratingCount ? "gold" : "gray"}
                          size={16}
                          style={{ cursor: "pointer" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>{review.customerSay}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
