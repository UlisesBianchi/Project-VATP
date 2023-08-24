import NavBar from "./component/navBar/NavBar";
import Home from "./routes/Home";
import Footer from "./component/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminProducts from "./component/admin/AdminProducts";
import FormRegistationProducts from "./component/admin/FormRegistationProducts";
import ProductDetail from "./component/product/ProductDetail";
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
