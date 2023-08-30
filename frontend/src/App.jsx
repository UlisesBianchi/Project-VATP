import NavBar from "./component/navBar/navBar";
import Home from "./routes/Home";
import Footer from "./component/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import FormRegistationProducts from "./component/admin/FormRegistationProducts";
import ProductDetail from "./component/product/ProductDetail";
import RegistrationUser from "./routes/RegistrationUser";
import Admin from "./routes/Admin";
import LoginForm from "./component/navBar/LoginForm";



function App() {

  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="product-form" element={<FormRegistationProducts />}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegistrationUser />}/>
        <Route path="/form-product" element={<FormRegistationProducts />}/>
        {isAuthenticated ? <Route path="/login" element={<Navigate to="/home" />} /> : <Route path="/login" element={<LoginForm />} />}
      </Routes>

      <Footer />
    </>
  );
}

export default App;