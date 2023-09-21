import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { Toaster, toast } from "sonner";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import { ContextGlobal } from "../utils/globalContext";
import axios from "axios";

const CardProducts = ({ product }) => {
  const { obj } = useContext(ContextGlobal);
  const [isFavorite, setIsFavorite] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 545px)");

  const handleFavorite = async () => {
    try {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      const userId = userFromLocalStorage.id;
      const favorites = userFromLocalStorage.favoritos;
      const isProductInFavorites = favorites.some((fav) => fav.id === product.id);

      if (isProductInFavorites) {
        // Si el producto ya está en favoritos, realiza una solicitud DELETE
        await axios.delete(
          `http://18.191.210.53:8082/api/users/${userId}/favorites/${product.id}`
        );
      } else {
        // Si el producto no está en favoritos, realiza una solicitud POST
        await axios.post(
          `http://18.191.210.53:8082/api/users/${userId}/favorites/${product.id}`
        );
      }

      // Actualiza el estado de isFavorite
      setIsFavorite(!isProductInFavorites);

      // Muestra el mensaje de éxito
      const message = isProductInFavorites
        ? "Producto eliminado de favoritos."
        : "Producto agregado a favoritos.";
      toast.success(message, { duration: 1000 });
    } catch (error) {
      console.error("Error al gestionar los favoritos:", error);
      // Aquí puedes manejar errores si es necesario
    }
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toaster richColors visibleToasts={1} />
      <Card
        sx={{
          maxWidth: isSmallScreen ? 250 : 523,
          maxHeight: 233,
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <CardActionArea>
          <CardMedia
            id="cardProduct"
            component="img"
            height="233"
            width="523"
            image={obj.imageMap[product.id] || ""}
            alt={product.nombre}
          />
          <CardActions sx={{ position: "absolute", top: -5, right: -5 }}>
            <IconButton onClick={handleFavorite}>
              {isFavorite ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorder
                  style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
                />
              )}
            </IconButton>
          </CardActions>
          <Typography
            variant="h5"
            component="div"
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#ffffff",
              padding: "8px",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {product.nombre}
          </Typography>
        </CardActionArea>
      </Card>
      <Card
        sx={{
          maxWidth: isSmallScreen ? 250 : 523,
          maxHeight: isSmallScreen ? 350 : 190,
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography
            sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
            color="text.secondary"
          >
            <LocationOnIcon /> Cordoba, Argentina.
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <StarPurple500OutlinedIcon />
              <StarPurple500OutlinedIcon />
              <StarPurple500OutlinedIcon />
              <StarHalfRoundedIcon />
              <StarBorderRoundedIcon />
            </Box>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="h6"
              sx={{
                paddingTop: "15px",
                paddingBottom: "15px",
                fontSize: "1rem",
                color: "#0000000",
                fontWeight: "bold",
                lineHeight: 1.2,
              }}
            >
              {product.descripcion}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${product.precio}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ position: "absolute", bottom: 5, right: 5 }}>
          <Link to={`/product/${product.id}`}>
            <Button
              size="small"
              disableRipple
              sx={{
                background: "transparent",
                fontWeight: "bold",
              }}
            >
              Ver mas
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CardProducts;
