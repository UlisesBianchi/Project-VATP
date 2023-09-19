import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Calendario = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const handleReserveClick = () => {
    if (isLoggedIn) {
      navigate('/reserve');
    } else {
      alert("Debe iniciar sesión para poder hacer una reserva");
      navigate('/login');
    }
  };


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1vw",
          flexDirection: { xs: "column",md: "column",xl: "column"  },
          alignItems: { xs: "center" },
          padding: "0",
        }}
      >

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ paddingTop: "0" }}>
            <DatePicker
              label="Seleccione la fecha"
              sx={{
                width: { xl: "10vw" },
                background: "white",
                height: "100%",
                borderRadius: "4px",
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        
        <Button
          variant="outlined"
          type="submit"
          sx={{
            width: "10vw",
            background: "white",
            "&:hover": { background: "white", padding: "0" },
          }}
          onClick={handleReserveClick}
        >
          Reservar
        </Button>
        
      </Box>
    </>
  );
};

export default Calendario;