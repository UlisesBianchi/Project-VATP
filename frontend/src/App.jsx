import React, { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./component/navBar/NavBar";
import Home from "./routes/Home";
import Footer from "./component/Footer/Footer";
import FormRegistationProducts from "./component/admin/FormRegistationProducts";
import ProductDetail from "./component/product/ProductDetail";
import RegistrationUser from "./routes/RegistrationUser";
import Admin from "./routes/Admin";
import LoginForm from "./component/navBar/LoginForm";
import AdminProducts from "./component/admin/AdminProducts";
import AdminCategories from "./component/admin/AdminCategories";
import FormRegistationCategories from "./component/admin/FormRegistationCategories";
import Favorites from "./component/User/Favorites";
import ResultSearchDate from "./routes/ResultSearchDate";
import Profiles from "./component/User/Profiles";
import ResultSearchProduct from "./routes/ResultSearchProduct";
import ResultSearchProductDate from "./routes/ResultSearchProductDate";
import AboutUs from "./component/Footer/AboutUs";
import Error from "./routes/Error";
import TermsAndConditions from "./component/Footer/TermsAndConditions";
import Contact from "./component/Footer/Contact";
import Faqs from "./component/Footer/Faqs";
import CustomerAttention from "./component/Footer/CustomerAttention";
import Help from "./component/Footer/Help";
import Reserve from "./component/product/Reserve";
import { ContextGlobal } from "./component/utils/globalContext";
import FormUpdateProducts from "./component/admin/FormUpdateProducts";
import FormUpdateCategory from "./component/admin/FormUpdateCategory";

function App() {
  const isAuthenticated = sessionStorage.getItem("token") !== null;

  const { obj } = useContext(ContextGlobal);

  const navigate = useNavigate();

  const roleUser = () => {
    // Obtener el usuario del localStorage
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

    // Verificar si se ha encontrado un usuario en el localStorage
    if (userFromLocalStorage) {
      // Obtener el userId del usuario
      const userId = userFromLocalStorage.id;
      console.log(userId);

      console.log(obj.role);
      // Buscar el usuario correspondiente en obj.role
      const userInRole = obj.role.find((item) => item.id === userId);

      // Si se encuentra el usuario en obj.role, devolver el roleId
      if (userInRole) {
        return userInRole.roleId;
      }
    }

    return "Rol por defecto"; // Cambia esto según tus requerimientos
  };

  const roleId = roleUser();

  const PrivateRoute = ({ element, path }) => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      return element;
    } else {
      alert("Debe iniciar sesión para utilizar esta funcionalidad");
      navigate("/home");
      return null;
    }
  };

  const AdminRoute = ({ element, path }) => {
    if (roleId === 2) {
      return element;
    } else {
      alert("Solo los usuarios administradores pueden ingresar a esta sección");
      navigate("/home");
      return null;
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegistrationUser />} />

        <Route
          path="/admin"
          element={<AdminRoute element={<Admin />} path="/admin" />}
        >
          {/* Rutas secundarias para el Administrador */}
          <Route path="admin-product" element={<AdminProducts />} />
          <Route path="form-product" element={<FormRegistationProducts />} />
          <Route path="admin-category" element={<AdminCategories />} />
          <Route path="form-category" element={<FormRegistationCategories />} />
          <Route path="form-product/update/:id" element={<FormUpdateProducts />}/>
          <Route path="form-category/update/:id" element={<FormUpdateCategory />}/>
        </Route>

        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/customer attention" element={<CustomerAttention />} />
        <Route path="/help" element={<Help />} />
        <Route path="/reserve/:fecha/:id" element={<Reserve />} />
        <Route path="/*" element={<Error />} />
        <Route path="/results/date/:fecha" element={<ResultSearchDate />} />
        <Route path="/results/:productoId" element={<ResultSearchProduct />} />
        <Route
          path="/results/date-product/:fecha/:productoId"
          element={<ResultSearchProductDate />}
        />
        {isAuthenticated ? (
          <Route path="/login" element={<Navigate to="/home" />} />
        ) : (
          <Route path="/login" element={<LoginForm />} />
        )}
        <Route
          path="/favorites"
          element={<PrivateRoute element={<Favorites />} path="/favorites" />}
        />
        <Route
          path="/profiles"
          element={<PrivateRoute element={<Profiles />} path="/profiles" />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
