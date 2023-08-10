import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";



function Footer() {
  return (
    <Box sx={{
        display: "flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        width: "100%",
        height: "20vh",
        backgroundColor: "white",
        bottom: 0,
        
        marginTop:"2vh"
      }}
    >
      <Box sx={{display:"flex",justifyContent:"space-evenly"}}>  
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: "space-around",
          alignItems:"center"
        }}
      >
        <Box
          component="img"
          sx={{
            height: "8rem",
            width: "8rem",
            maxHeight: { xs: "4rem", md: "8rem" },
            maxWidth: { xs: "4rem", md: "8rem" },
          }}
          alt="The house from the offer."
          src="images\viajar-al-paladar-1.png"
        />
    
        </Box>
        <Box sx={{display:{xl:"flex",xs:"none"}, gap: 20, alignItems:'center'}}>
            <ul className="listafooter" type="none">
                    <li><a href="/">Quienes somos</a></li>
                    <li><a href="/">Terminos y condiciones</a></li>
                    <li><a href="/">Contactenos</a></li>
                    
            </ul>
            <ul className="listafooter" type ="none">
                    <li><a href="/">Preguntas frecuentes</a></li>
                    <li><a href="/">Atencion al cliente</a></li>
                    <li><a href="/">Ayuda</a></li>
            </ul>

        </Box> 
          <Box sx={{display:"flex"}}>
          <IconButton sx={{color:"#666DF2"}} href="https://www.facebook.com/" target="_blank">
            <Facebook />
          </IconButton>
          <IconButton sx={{color:"#666DF2"}} href="https://www.twitter.com/" target="_blank">
            <Twitter />
          </IconButton>
          <IconButton sx={{color:"#666DF2"}} href="https://www.instagram.com/" target="_blank">
            <Instagram />
          </IconButton>
          </Box>
          </Box>
          <Box sx={{display:"flex",color:"#666DF2",justifyContent:"center"}}>
          <Typography variant="h7" >©2023 Un viaje a tu paladar</Typography>
          </Box>
    </Box>
  );
}

export default Footer;