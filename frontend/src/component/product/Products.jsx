import { Box, Typography, useMediaQuery } from "@mui/material";
import CardProduct from "./CardProducts";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextGlobal } from "../utils/globalContext";

const Products = () => {
  const { obj } = useContext(ContextGlobal);
  const isSmallScreen3 = useMediaQuery("(max-width: 320px)");

  return (
    <Box sx={{ marginTop: "3vh", background: "#E9EEFC" }}>
      <Typography
        color="secondary"
        variant="h5"
        sx={{
          marginLeft: "18vh",
          fontSize: isSmallScreen3 ? "1rem" : "1.5rem",
        }}
      >
        Productos recomendados
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2 ,1fr)",
            gap: "3rem",
            marginTop: "2rem",
            columnGap: "3rem",
          }}
        >
          {obj.product.map((data) => (
            <Link key={data.id} to={`/product/${data.id}`}>
              <CardProduct data={data} />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
