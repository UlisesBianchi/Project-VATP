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

        // Create a mapping of product IDs to image URLs
        const newImageMap = {};
        res.data.forEach(product => {
          product.images.forEach(imageUrl => {
            newImageMap[product.id] = imageUrl;
          });
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