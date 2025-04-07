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

function App() {
  const location = useLocation();

  // Hide Header & Footer for Signup and Login pages
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/";
  

  return (
    <>
      <ToastContainer/>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
