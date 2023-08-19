import { useEffect, useState } from "react";
import CardCategory from "./CardCategory";
import { Box, Typography } from "@mui/material";
import axios from "axios";


const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://18.191.210.53:8082/categorias";

  useEffect(() => {
    axios.get(url).then((res) => {
      setCategory(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="primary" variant="h5" sx={{ marginLeft: "18vh", marginTop: "5vh" }}>
        Categorias
      </Typography>
      
       <Box sx={{ display: "flex", justifyContent: "space-evenly", margin: "2vh" }}>
        {category.map((data) => (
          <CardCategory data={data} key={data.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Category;
