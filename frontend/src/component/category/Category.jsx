import { useContext } from "react";
import CardCategory from "./CardCategory";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { ContextGlobal } from "../utils/globalContext";

const Category = () => {
  const { obj } = useContext(ContextGlobal);
  const isSmallScreen3 = useMediaQuery("(max-width: 320px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      <Typography
        color="primary"
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: isSmallScreen3 ? "1.5rem" : "2rem",
          overflow: "hidden",
          paddingTop: "5vh",
        }}
      >
        Categorias
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "2vh 0",
          gap: "2rem",
          flexWrap: "wrap",
          overflow: "hidden",
          fontSize: isSmallScreen3 ? "1.5rem" : "2rem",
        }}
      >
        {obj.category.map((data) => (
          <CardCategory data={data} key={data.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Category;
