import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const ShareButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = (platform) => {
    switch (platform) {
      case "whatsapp":
        window.location.href =
          "whatsapp://send?text=¡Echa un vistazo a esto! http://g6-frontend.s3-website-us-east-1.amazonaws.com/home";
        break;
      case "instagram":
        window.location.href = "https://www.instagram.com/";
        break;
      case "facebook":
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=http://g6-frontend.s3-website-us-east-1.amazonaws.com/home",
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          "https://twitter.com/intent/tweet?url=http://g6-frontend.s3-website-us-east-1.amazonaws.com/home&text=Que buena pagina: ",
          "_blank"
        );
        break;
      default:
        break;
    }
    handleClose(); // Cerrar el modal después de compartir
  };

  const body = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        p: 2,
      }}
    >
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Elije una red social
      </Typography>
      <WhatsAppIcon variant="contained" onClick={() => handleShare("whatsapp")}>
        Compartir en WhatsApp
      </WhatsAppIcon>
      <InstagramIcon
        variant="contained"
        onClick={() => handleShare("instagram")}
        sx={{ ml: 2 }}
      >
        Compartir en Instagram
      </InstagramIcon>
      <FacebookIcon
        variant="contained"
        onClick={() => handleShare("facebook")}
        sx={{ ml: 2 }}
      >
        Compartir en Facebook
      </FacebookIcon>
      <TwitterIcon
        variant="contained"
        onClick={() => handleShare("twitter")}
        sx={{ ml: 2 }}
      >
        Compartir en Twitter
      </TwitterIcon>
    </Box>
  );

  return (
    <div>
      <ShareIcon variant="contained" onClick={handleOpen}>
        Compartir en redes sociales
      </ShareIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ShareButton;