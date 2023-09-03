import React, { useState, useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material";
import { ContextGlobal } from "../utils/globalContext";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { obj } = useContext(ContextGlobal);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-around" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            height: "5rem",
            background: "white",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <IconButton color="primary" sx={{ display: { xl: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Link to={"/"}>
            <Box
              component="img"
              sx={{
                height: "5rem",
                width: "15rem",
                maxHeight: { xs: "4rem", md: "10rem" },
                maxWidth: { xs: "10rem", md: "15rem" },
                marginRight: "2vw",
              }}
              alt="The house from the offer."
              src="images\Logo.png"
            />
          </Link>
          <Box sx={{ display: { xs: "none", md: "flex", xl: "flex" } }}>
            {obj.isLoggedIn ? (
              // Mostrar el avatar y el menú si está logueado
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            ) : (
              // Botón de inicio de sesión
              <Link to={"/login"}>
                <Button variant="text" sx={{ margin: "3vh", fontSize: "0.75rem" }}>
                  Iniciar Sesión
                </Button>
              </Link>
            )}
            {!obj.isLoggedIn && ( // Ocultar el botón de "Crear cuenta" si está logueado
              <Link to={"/register"}>
                <Button variant="text" sx={{ margin: "3vh", fontSize: "0.75rem" }}>
                  Crear cuenta
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
