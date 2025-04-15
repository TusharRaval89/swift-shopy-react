import React, { useEffect, useState } from "react";
import AllProduct from "../Components/AllProduct";
import Header from "../Components/Header";
import axios from "axios";

const Home = () => {
  const [searchProductData, setSerchProductData] = useState();
  let token = localStorage.getItem("user_token");

  const searchProduct = async (searchTerm) => {
    try {
      let res = await axios.get("http://localhost:3000/product/search?", {
        params: { searchTerm },
      });
      setSerchProductData(res.data?.data);
    } catch (error) {
      console.log(error.respone?.data);
    }
  };

  const getUserProfile = async () => {
    try {
      let res = await axios.get("http://localhost:3000/users/profile/", {
        headers: { Authorization: token },
      });
      // console.log("get user profile===>", res.data.data);
      const userProfile  = res.data.data
      localStorage.setItem('getUserProfile',JSON.stringify(userProfile))

    } catch (error) {
      console.log(error?.respone?.data);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Header searchProduct={searchProduct} />
      <AllProduct searchProductData={searchProductData} />
    </div>
  );
};

export default Home;
