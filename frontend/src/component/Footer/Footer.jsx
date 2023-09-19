import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Link } from "react-router-dom";

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

        marginTop: "2vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
            alt="The house from the offer."
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
            <Link to={"/about_us"} style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
              <li>Quienes somos</li>
            </Link>
            <Link to={"/terms"} style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
              <li>Terminos y condiciones</li>
            </Link>
            <Link to={"/contact"} style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
              <li>Contactenos</li>
            </Link>
          </ul>
          <ul className="listafooter" type="none">
            <Link to={"/faqs"} style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
              <li>Preguntas frecuentes</li>
            </Link>
            <Link to={"/customer attention"} style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
              <li>Atencion al cliente</li>
            </Link>
            <Link to={"/help"} style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
              <li>Ayuda</li>
            </Link>
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
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", display: "flex", alignItems: "center" }}
        >
          Â©2023 Un viaje a tu paladar
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;