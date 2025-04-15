import logo from './logo.svg';
import './App.css';
import './assets/css/product.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Filter from './Components/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './Pages/Product';
import { Route, Routes, useLocation } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Demo from './Pages/Demo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from './Pages/Profile';

function App() {
  const location = useLocation();

  // Hide Header & Footer for Signup and Login pages
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/";

  const [cartRefresh, setCartRefresh] = useState(false);

  const handleCartUpdate = () => {
    setCartRefresh((prev) => !prev);
  };

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
      const userProfile = res.data.data
      localStorage.setItem('getUserProfile', JSON.stringify(userProfile))

    } catch (error) {
      console.log(error.respone.data);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <ToastContainer />
      {!hideHeaderFooter && <Header cartRefresh={cartRefresh} searchProduct={searchProduct} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product onAddToCart={handleCartUpdate} searchProductData={searchProductData} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart onAddToCart={handleCartUpdate} />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
