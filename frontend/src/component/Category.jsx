import { useEffect, useState } from "react";
import CardCategory from "../component/CardCategory";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const Category = () => {

   
    
      const [category, setCategory] = useState([]);
      const url = "http://localhost:8082/categorias"
    
      useEffect(() => {
        axios.get(url).then(res=> setCategory(res.data))
      }, []);

  

  return (
    
    
    <Box sx={{display:"flex", flexDirection:"column"}}>
    <Typography color='secondary' variant="h5" sx={{marginLeft:"4vh", marginTop:"5vh"}}>Busca por categoria</Typography>
    <Box sx={{display:"flex", justifyContent:"space-around", margin:"2vh"}}>
        
    {category.map((data) => (
        <CardCategory data={data} key={data.id} />
      ))}
    </Box>
    </Box>
  )
}

export default Category