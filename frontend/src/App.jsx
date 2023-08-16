import NavBar from "./component/NavBar";
import Home from "./routes/Home";
import Footer from "./component/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminProducts from "./component/AdminProducts";
import FormRegistationProducts from "./component/FormRegistationProducts";
import ProductDetail from "./component/ProductDetail";
import { Switch } from "@mui/material";
import Products from "./component/Products";



function App() {
  


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminProducts/>} />        
        <Route path="product-form" element={<FormRegistationProducts />}/>
        
        <Route path="/product/:id" component={<ProductDetail />} />
     
      </Routes>

      <Footer />
    </>
  );
}

export default App;
