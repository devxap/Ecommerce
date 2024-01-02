import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js'
import Loader from './component/layout/Loader/Loader.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from './component/Product/ProductDetails.js'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
   <Router>
    <Header/>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/product/:id" element={<ProductDetails/>} />
    
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
