/* eslint-disable react/prop-types */
import axios from 'axios';
import  { createContext, useEffect, useState } from 'react'

export const ContextGlobal = createContext();



export const ContextProvider = ({ children }) => {

const [product, setProduct] = useState([]);
const url = "http://18.191.210.53:8082/productos"

useEffect(()=>{
  axios.get(url)
  .then((res) => {
    setProduct(res.data);
  });
},[])


 const obj ={
    product
  }


return (
  <ContextGlobal.Provider value={{ obj }}>
    {children}
  </ContextGlobal.Provider>
);
}

