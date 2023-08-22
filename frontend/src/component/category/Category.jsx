import { useContext } from "react";
import CardCategory from "./CardCategory";
import { Box, Typography } from "@mui/material";
import Filter from "./Filter";
import { ContextGlobal } from "../utils/globalContext";


const Category = () => {
 
  
  const {obj} = useContext(ContextGlobal)

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="primary" variant="h5" sx={{ marginLeft: "18vh", marginTop: "5vh" }}>
        Categorias
      </Typography>
      
      
      <Box sx={{ display: "flex", justifyContent: "space-evenly", margin: "2vh" }}>
        {obj.category.map((data) => (
          <CardCategory data={data} key={data.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Category;
