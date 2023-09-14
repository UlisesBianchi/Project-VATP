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
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { AccountCircle, Logout } from "@mui/icons-material";
import { ContextGlobal } from "../utils/globalContext";

const NavBar = () => {
  const { obj } = useContext(ContextGlobal);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Perfil", "Favoritos", "Dashboard", "Cerrar Sesion"];

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-around" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            height: "5rem",
            background: "white",
            display: "flex",
            justifyContent: "space-around",
            overflowX: "hidden",
          }}
        >
          <IconButton
            color="primary"
            sx={{
              display: "none",
              "@media (max-width: 899px)": {
                display: "block",
                margin: "0px 0px",
              },
              "@media (max-width: 249px)": {
                margin: "0px auto",
              },
            }}
          >
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
                display: "none",
                "@media (min-width: 250px)": {
                  display: "block",
                },
              }}
              alt="The house from the offer."
              src="images\Logo.png"
            />
          </Link>
          <Box sx={{ display: { xs: "none", md: "flex", xl: "flex" } }}>
            {obj.isLoggedIn ? (
              // Mostrar el avatar y el menú si está logueado
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {setting === "Favoritos" ? (
                        <Link to="/favorites">
                          <Typography textAlign="center">Favoritos</Typography>
                        </Link>
                      ) : (
                        <Typography textAlign="center">{setting}</Typography>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              // Botón de inicio de sesión
              <Link to={"/login"}>
                <Button
                  variant="text"
                  sx={{ margin: "3vh", fontSize: "0.75rem" }}
                >
                  Iniciar Sesión
                </Button>
              </Link>
            )}
            {!obj.isLoggedIn && ( // Ocultar el botón de "Crear cuenta" si está logueado
              <Link to={"/register"}>
                <Button
                  variant="text"
                  sx={{ margin: "3vh", fontSize: "0.75rem" }}
                >
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
