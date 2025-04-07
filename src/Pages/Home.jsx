import React, { useState } from "react";
import AllProduct from "../Components/AllProduct";
import Header from "../Components/Header";
import axios from "axios";

const Home = () => {
  const [searchProductData, setSerchProductData] = useState();

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

  return (
    <div>
      <Header searchProduct={searchProduct} />
      <AllProduct searchProductData={searchProductData} />
    </div>
  );
};

export default Home;
