import NavBar from "./component/navBar/navBar";
import Home from "./routes/Home";
import Footer from "./component/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import FormRegistationProducts from "./component/admin/FormRegistationProducts";
import ProductDetail from "./component/product/ProductDetail";
import RegistrationUser from "./routes/RegistrationUser";
import Admin from "./routes/Admin";



function App() {
  


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />        
        <Route path="product-form" element={<FormRegistationProducts />}/>        
        <Route path="/product/:id" component={<ProductDetail />} />
        <Route path="/form-registration" element={<RegistrationUser />}/>
        <Route path="/form-product" element={<FormRegistationProducts />}/>
     
      </Routes>

      <Footer />
    </>
  );
}

export default App;
