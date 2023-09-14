import React, { createContext, useEffect, useState } from 'react';
import Admin from '../../routes/Admin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageMap, setImageMap] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
        alert("Email not exists");
        sessionStorage.removeItem("data")
      } else if (responseData.message === "Login Success") {
       
        setIsLoggedIn(true);
        
        
        
      } else {
        alert("Incorrect Email and Password do not match");
      }
    } catch (error) {
      console.error(error);
      console.log("Error response:", error.response);
      alert("An error occurred while logging in");
    }
    
  };
  


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);


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
      })},[]);

     
      useEffect(()=>{
        
        axios.get(url2)
          .then((categoryRes) => {
            setCategory(categoryRes.data);
          });
      },[]);
  
  

  const obj = {
    product,
    category,
    imageMap,
    isLoggedIn, 
    login,
  };

  return (
    <ContextGlobal.Provider value={{ obj, AdminComponent: <Admin /> }}>
      {children}
    </ContextGlobal.Provider>
  );
};