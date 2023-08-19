import NavBar from "./component/navBar";
import Home from "./routes/Home";
import Footer from "./component/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminProducts from "./component/AdminProducts";
import FormRegistationProducts from "./component/FormRegistationProducts";
import ProductDetail from "./component/ProductDetail";
import { Switch } from "@mui/material";
import Products from "./component/Products";
import RegistrationUser from "./routes/RegistrationUser";



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
        <Route path="/form-registration" element={<RegistrationUser />}/>
     
      </Routes>

      <Footer />
    </>
  );
}

export default App;
