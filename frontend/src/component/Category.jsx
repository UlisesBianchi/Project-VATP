import { useEffect, useState } from "react";
import CardCategory from "../component/CardCategory";
import { Box, Typography } from "@mui/material";

const Category = () => {

    let categoria = [
        {
          id: "1",
          imgUrl: "https://i.imgur.com/mCha6F0.jpeg",
          name: "Argentina",
        },
        { 
          id: "2",
          imgUrl: "https://i.imgur.com/SIpILdE.jpeg",
          name: "Internacional",
        },
        {
          id: "3",
          imgUrl: "https://i.imgur.com/6Lp4IHE.jpeg",
          name: "Dia de campo",
        },
        {
          id: "4",
          imgUrl: "https://i.imgur.com/Awor6c1.jpeg",
          name: "Vegana & Vegetariana",
        },
      ];
    
      const [category, setCategory] = useState([]);
    
      useEffect(() => {
        setCategory(categoria);
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