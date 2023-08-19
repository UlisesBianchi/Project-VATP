import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CardProduct from "./CardProducts";
import axios from "axios";


const Recomendation = () => {

  

    const [product, setProduct] = useState([]);
    const url = "http://localhost:8082/productos"

  useEffect(() => {
    axios.get(url).then(res=> setProduct(res.data))
  }, []);
  

console.log(product);

  return (

   
    <Box sx={{  marginTop:"3vh", background:"#E9EEFC", paddingBottom:"10vh"}}>
    <Typography color="secondary" variant="h5" sx={{marginLeft:"2vw", paddingTop:"5vh"}}>Productos recomendados</Typography>
    <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap",justifyContent:"space-around", alignItems:"center"}}>
    
    <Box sx={{ display: 'grid', gridTemplateColumns:{xl:"repeat(2 ,1fr)", xs:"repeat(1 ,1fr)"}, gap: '3rem', marginTop: '2rem', columnGap:"3rem"}}>
      {product.map((data) => (
        <CardProduct data={data} key={data.id} />
      ))}
    </Box>
    </Box>
    </Box>
  )

}

export default Recomendation
