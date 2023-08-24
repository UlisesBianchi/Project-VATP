import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, useMediaQuery } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
const CardProduct = ({ data }) => {
  const isSmallScreen = useMediaQuery("(max-width: 545px)");
  const isSmallScreen2 = useMediaQuery("(max-heigth: 545px)");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            component="img"
            height="233"
            width="523"
            image={`${data.imagenUrl}`}
            alt={`${data.name}`}
          />
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
            {data.nombre}
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
              {data.descripcion}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ${data.precio}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ position: "absolute", bottom: 5, right: 5 }}>
          <Button
            size="small"
            disableRipple
            sx={{
              background: "transparent",
              fontWeight: "bold",
            }}
          >
            Ver más
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default CardProduct;
