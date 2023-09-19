import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './component/navBar/NavBar';
import Home from './routes/Home';
import Footer from './component/Footer';
import FormRegistationProducts from './component/admin/FormRegistationProducts';
import ProductDetail from './component/product/ProductDetail';
import RegistrationUser from './routes/RegistrationUser';
import Admin from './routes/Admin';
import LoginForm from './component/navBar/LoginForm';
import AdminProducts from './component/admin/AdminProducts';
import AdminCategories from './component/admin/AdminCategories';
import FormRegistationCategories from './component/admin/FormRegistationCategories';
import Favorites from './component/User/Favorites';
import ResultSearchDate from './routes/ResultSearchDate';
import Profiles from './component/User/Profiles';
import ResultSearchProduct from './routes/ResultSearchProduct';
import ResultSearchProductDate from './routes/ResultSearchProductDate';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

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
        <Route path="/results/date/:fecha" element={<ResultSearchDate />} />
        <Route path="/results/:productoId" element={<ResultSearchProduct />} />
        <Route
          path="/results/date-product/:fecha/:productoId"
          element={<ResultSearchProductDate />}
        />
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
