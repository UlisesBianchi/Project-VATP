import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import { ContextGlobal } from "../utils/globalContext";

const CardProducts = ({ product }) => {
  // const productImg = imageMap[product.id]
  const { obj } = useContext(ContextGlobal);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isFavorite = favorites.find((fav) => fav.id === product.id);

    if (isFavorite) {
      const updateFavorites = favorites.filter((fav) => fav.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
      alert("Producto eliminado de favoritos");
    } else {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Producto agregado a favoritos");
    }

    setIsFavorite(!isFavorite);
    console.log(product);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <Card sx={{ width: 345, height: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            width="200"
            image={obj.imageMap[product.id] || ""}
            alt={product.nombre}
          />
          <CardContent>{}</CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={{
          width: 345,
          height: 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          {/* Card content */}
          <Typography>{product.nombre}</Typography>
          <Typography>{product.precio}</Typography>
          <Typography>{product.descripcion}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleFavorite}>
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorder color="error" />
            )}
          </IconButton>

          <Link to={`/product/${product.id}`}>
            <Button size="small">Ver mas</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CardProducts;
