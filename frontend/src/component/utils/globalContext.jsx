  /* eslint-disable react/prop-types */
  import axios from 'axios';
  import  { createContext, useEffect, useState } from 'react'

  export const ContextGlobal = createContext();



  export const ContextProvider = ({ children }) => {

  const [product, setProduct] = useState([]);
  const [category, setCategory] =useState([]);

  const url = "http://18.191.210.53:8082/productos"
  const url2 = "http://18.191.210.53:8082/categorias"


  useEffect(()=>{
    axios.get(url)
    .then((res) => {
      setProduct(res.data);
    });
  },[])

  useEffect(()=>{
    axios.get(url2)
    .then((res)=>{
      setCategory(res.data)
    })
  },[])


  const obj ={
      product,
      category
    }
  
    console.log(obj.product);

  return (
    <ContextGlobal.Provider value={{ obj }}>
      {children}
    </ContextGlobal.Provider>
  );
  }

