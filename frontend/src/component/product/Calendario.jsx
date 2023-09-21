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



  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const handleReserveClick = () => {
    
    if (isLoggedIn) {
      if (selectedDate && id) {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        navigate(`/reserve/${formattedDate}/${id}`);
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
            <DemoContainer
              sx={{
                background: "white",
                color: "primary",
                padding: 0,
                borderRadius: "4px",
              }}
              components={["DatePicker"]}
            >
              <DatePicker
                label="Selecciona una fecha"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
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