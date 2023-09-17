import NavBar from "./component/navBar/NavBar";
import Home from "./routes/Home";
import Footer from "./component/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import FormRegistationProducts from "./component/admin/FormRegistationProducts";
import ProductDetail from "./component/product/ProductDetail";
import RegistrationUser from "./routes/RegistrationUser";
import Admin from "./routes/Admin";
import LoginForm from "./component/navBar/LoginForm";
import AdminProducts from "./component/admin/AdminProducts";
import AdminCategories from "./component/admin/AdminCategories";
import FormRegistationCategories from "./component/admin/FormRegistationCategories";
import Favorites from "./component/User/Favorites";
import ResultSearch from "./routes/ResultSearch";
import Profiles from "./component/User/Profiles";

function App() {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegistrationUser />} />

        <Route path="/admin" element={<Admin />}>
          {/* Rutas secundarias para el Administrador */}
          <Route path="admin-product" element={<AdminProducts />} />
          <Route path="form-product" element={<FormRegistationProducts />} />
          <Route path="admin-category" element={<AdminCategories />} />
          <Route path="form-category" element={<FormRegistationCategories />} />
        </Route>
        <Route path="/results" element={<ResultSearch />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profiles" element={<Profiles />} />

        {isAuthenticated ? (
          <Route path="/login" element={<Navigate to="/home" />} />
        ) : (
          <Route path="/login" element={<LoginForm />} />
        )}
      </Routes>

      <Footer />
    </>
  );
}

export default App;