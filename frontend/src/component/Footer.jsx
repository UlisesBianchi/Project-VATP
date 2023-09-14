import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "100%",
        height: "20vh",
        backgroundColor: "white",
        padding: "0px",
        overflowX: "hidden",
        marginTop: "2vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: "6rem",
              width: "16rem",
              maxHeight: { xs: "4rem", md: "6rem" },
              maxWidth: { xs: "10rem", md: "22rem" },
            }}
            alt="Logo"
            src="https://g6-frontend-fotos.s3.amazonaws.com/Logo.png"
          />
        </Box>
        <Box
          sx={{
            display: { xl: "flex", xs: "none" },
            gap: 20,
            alignItems: "center",
          }}
        >
          <ul className="listafooter" type="none">
            <li>
              <a
                href="/"
                style={{ color: "#E23333", fontFamily: "'Roboto', sans-serif" }}
              >
                Quienes somos
              </a>
            </li>
            <li>
              <a
                href="/"
                style={{ color: "#E23333", fontFamily: "'Roboto', sans-serif" }}
              >
                Terminos y condiciones
              </a>
            </li>
            <li>
              <a
                href="/"
                style={{ color: "#E23333", fontFamily: "'Roboto', sans-serif" }}
              >
                Contactenos
              </a>
            </li>
          </ul>
          <ul className="listafooter" type="none">
            <li>
              <a
                href="/"
                style={{ color: "#E23333", fontFamily: "'Roboto', sans-serif" }}
              >
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a
                href="/"
                style={{ color: "#E23333", fontFamily: "'Roboto', sans-serif" }}
              >
                Atencion al cliente
              </a>
            </li>
            <li>
              <a
                href="/"
                style={{ color: "#E23333", fontFamily: "'Roboto', sans-serif" }}
              >
                Ayuda
              </a>
            </li>
          </ul>
        </Box>
        <Box sx={{ display: "flex" }}>
          <IconButton
            sx={{ color: "#E23333" }}
            href="https://www.facebook.com/"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            sx={{ color: "#E23333" }}
            href="https://www.twitter.com/"
            target="_blank"
          >
            <Twitter />
          </IconButton>
          <IconButton
            sx={{ color: "#E23333" }}
            href="https://www.instagram.com/"
            target="_blank"
          >
            <Instagram />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          color: "#E233332",
          justifyContent: "center",
          backgroundColor: "#E23333",
          width: "100%",
          height: "5vh",
          padding: "0",
          overflowX: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          ©2023 Un viaje a tu paladar
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
