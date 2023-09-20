import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const Calendario = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const handleReserveClick = () => {
    console.log(selectedDate);
    if (isLoggedIn) {
      if (selectedDate && id) {
        navigate(`/reserve?date=${selectedDate}&productId=${id}`);
      } else {
        alert("Seleccione una fecha antes de reservar");
      }
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
              onChange={handleDateChange}
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