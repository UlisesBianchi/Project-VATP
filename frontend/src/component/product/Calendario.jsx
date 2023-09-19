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
        {/* <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xl: "10vw", height: "100%" },
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <RestaurantIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Elige tu categoria o experiencia"
            inputProps={{ "aria-label": "search google maps" }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper> */}

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
        >
          <Link to={'/reserve'}
          style={{ color: '#E23333',fontFamily: "'Roboto', sans-serif", textDecoration: 'none'}}>
          Reservar
          </Link>
        </Button>
      </Box>
    </>
  );
};

export default Calendario;