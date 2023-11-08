import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Product from "./components/profucts/Product";
import Home from "./components/home/Home";
import Service from "./components/service/Service";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import ProductDetails from "./components/productdetails/ProductDetails";
import PageNotFound from "./components/pagenotfound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Service" element={<Service/>} />
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/ProductDetails" element={<ProductDetails/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>

      {/* <Product/> */}
    </div>
  );
}

export default App;
