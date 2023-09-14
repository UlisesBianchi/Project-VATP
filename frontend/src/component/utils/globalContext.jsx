import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageMap, setImageMap] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Agregar una variable de usuario
  const navigate = useNavigate();

  const url = 'http://18.191.210.53:8082/productos';
  const url2 = 'http://18.191.210.53:8082/categorias';

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://18.191.210.53:8082/api/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const responseData = response.data;
      console.log(responseData);

      if (responseData.message === "Email not exists") {
        alert("El correo electrónico no existe");
        sessionStorage.removeItem("data");
      } else if (responseData.message === "Login Success") {
        setIsLoggedIn(true);
        navigate('/home');
        sessionStorage.setItem("isLoggedIn", "true"); // Guarda isLoggedIn en sessionStorage
        setUser(responseData.user); // Guarda la información del usuario
      } else {
        alert("El correo electrónico y la contraseña no coinciden");
      }
    } catch (error) {
      console.error(error);
      console.log("Respuesta de error:", error.response);
      alert("Se produjo un error al iniciar sesión");
    }
  };

  useEffect(() => {
    const isLoggedInSessionStorage = sessionStorage.getItem("isLoggedIn");
    if (isLoggedInSessionStorage === "true") {
      setIsLoggedIn(true);
    }
  }, []);



  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setProduct(res.data);

        // Create a mapping of product IDs to the first image URL
        const newImageMap = {};
        res.data.forEach(product => {
          if (product.images.length > 0) {
            newImageMap[product.id] = product.images[0];
          }
        });
        setImageMap(newImageMap);
      });
  }, []);

  useEffect(() => {
    axios.get(url2)
      .then((categoryRes) => {
        setCategory(categoryRes.data);
      });
  }, []);

  const obj = {
    product,
    category,
    imageMap,
    isLoggedIn,
    login,
    user, // Agregar la información del usuario al contexto
  };

  return (
    <ContextGlobal.Provider value={{ obj }}>
      {children}
    </ContextGlobal.Provider>
  );
};
