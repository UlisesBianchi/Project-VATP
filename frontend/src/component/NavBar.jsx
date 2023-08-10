import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Logout } from "@mui/icons-material";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>




      <AppBar position="static">
        <Toolbar sx={{ height: "5rem", background: "#E9EEFC" }}>

       




          <IconButton color="primary" sx={{ display: { xl: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Link to={"/"}>
            <Box
              component="img"
              sx={{
                height: "4rem",
                width: "4rem",
                maxHeight: { xs: "4rem", md: "4rem" },
                maxWidth: { xs: "4rem", md: "4rem" },
                marginRight: "2vw",
              }}
              alt="The house from the offer."
              src="images\viajar-al-paladar-1.png"
            />
          </Link>

          <Typography
            color="primary"
            href="/"
            variant="h6"
            component="a"
            sx={{
              display: { xs: "flex", md: "flex", xl: "flex" },
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            Un viaje a tu paladar
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex", xl: "flex" } }}>
            <Button variant="outlined" sx={{ margin: "3vh" }}>
              Crear cuenta
            </Button>
            <Button variant="outlined" sx={{ margin: "3vh" }}>
              Iniciar Sesión
            </Button>
          </Box>

        <Box sx={{ display: {xl:"none", md:"none"}, alignItems: 'center', textAlign: 'center',  }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
        
        </Box>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem onClick={handleClose}>
          <Avatar /> Crear cuenta
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> Iniciar Sesion
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>


      </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
