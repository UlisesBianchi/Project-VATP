import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

const Calendario = () => {
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