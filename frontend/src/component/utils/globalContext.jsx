//   /* eslint-disable react/prop-types */
//   import axios from 'axios';
//   import  { createContext, useEffect, useState } from 'react'
// import Admin from '../../routes/Admin';


//   export const ContextGlobal = createContext();



//   export const ContextProvider = ({ children }) => {

//   const [product, setProduct] = useState([]);
//   const [category, setCategory] =useState([]);

//   const url = "http://18.191.210.53:8082/productos"
//   const url2 = "http://18.191.210.53:8082/categorias"


//   useEffect(()=>{
//     axios.get(url)
//     .then((res) => {
//       setProduct(res.data);
//     });
//   },[])

//   useEffect(()=>{
//     axios.get(url2)
//     .then((res)=>{
//       setCategory(res.data)
//     })
//   },[])


//   const obj ={
//       product,
//       category
//     }


//   return (
//     <ContextGlobal.Provider value={{ obj, AdminComponent: <Admin /> }}>
//       {children}
//     </ContextGlobal.Provider>
//   );
//   }

import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageMap, setImageMap] = useState([]);

  const url = 'http://18.191.210.53:8082/productos';
  const url2 = 'http://18.191.210.53:8082/categorias';
  
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
  
        // Fetch category data
        axios.get(url2)
          .then((categoryRes) => {
            setCategory(categoryRes.data);
          });
      });
  }, []);
  

  const obj = {
    product,
    category,
    imageMap,
  };

  return (
    <ContextGlobal.Provider value={{ obj }}>
      {children}
    </ContextGlobal.Provider>
  );
};