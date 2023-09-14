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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { ContextGlobal } from "../utils/globalContext";

const NavBar = () => {
  const { obj } = useContext(ContextGlobal);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    // Realiza aquí la lógica de cierre de sesión, por ejemplo, limpiar la información de sesión.
    // Luego, redirige al usuario a la página de inicio de sesión.
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
    setAnchorElUser(null);
    handleCloseLogoutDialog();
  };

  // Obtener las iniciales del nombre y apellido del usuario
  const userInitials =
    obj.isLoggedIn && obj.user
      ? `${obj.user.firstName.charAt(0)}${obj.user.lastName.charAt(0)}`
      : "";

  const settings = ["Perfil", "Favoritos", "Dashboard", "Cerrar Sesion"];

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-around" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            height: "5rem",
            background: "white",
            display: "flex",
            height: "100%",
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
              alt="Logo"
              src="https://g6-frontend-fotos.s3.amazonaws.com/Logo.png"
            />
          </Link>
          <Box sx={{ display: { xs: "none", md: "flex", xl: "flex" } }}>
            {obj.isLoggedIn ? (
              // Mostrar el avatar y el menú si está logueado
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* Mostrar las iniciales del usuario en el avatar */}
                    <Avatar alt="User" sx={{ bgcolor: "primary.main" }}>
                      {userInitials}
                    </Avatar>
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
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Cerrar Sesion"
                          ? handleOpenLogoutDialog
                          : handleCloseUserMenu
                      }
                    >
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
            {!obj.isLoggedIn && (
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

      <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Cerrar Sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cerrar sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NavBar;
