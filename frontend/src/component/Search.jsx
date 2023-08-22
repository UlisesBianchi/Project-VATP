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

const Search = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "50vh",
        gap: "1vw",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://media.discordapp.net/attachments/1136794062238777474/1141905173371965532/5-consejos-para-comer-bien-cuando-viajes-1.jpg?width=1415&height=490')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      }}
    >
    
      <Typography
        variant="h5"
        sx={{ color: "#ffff", display:{xs:"none", md:"flex"} , textAlign: "start", maxWidth:"28vw", flexWrap:"wrap", fontSize:"2rem", fontWeight:"700", }}
      >
        Busca la experiencia que mas se adapte a tu paladar!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1vw",
          flexDirection: { xs: "column", xl: "row", md: "row" },
          alignItems: { xs: "center" },
          padding: "0",
        }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xl: "30vw" },
           
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <RestaurantIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 ,height:"6vh"}}
            placeholder="Elige tu categoria o experiencia"
            inputProps={{ "aria-label": "search google maps" }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ paddingTop: "0" }}>
            <DatePicker
              label="Seleccione la fecha"
              sx={{ width: { xl: "25vw" }, background: "white",height:"6vh",borderRadius:"4px" }}
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
          Buscar
          
        </Button>
      </Box>
    </Box>

    
  );
};

export default Search;
