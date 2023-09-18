import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Autocomplete,
  Popper,
  Grow,
  ClickAwayListener,
  Paper as DropdownPaper,
  MenuList,
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Abc";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const suggestions = []; // Reemplaza con tus sugerencias reales
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsSearching(true);

    try {
      const response = await axios.post(
        "http://localhost:8082/search/keywords",
        { keywords: searchTerm }
      );

      if (response.status === 200) {
        setSearchResults(response.data);
        setAnchorEl(document.getElementById("search-input"));
      }
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    } else {
      setSearchResults([]);
      setAnchorEl(null);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    setSearchTerm("");
  }, []);

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSelectedProduct(selectedSuggestion);
    setSearchTerm(selectedSuggestion.nombre);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleClose = (result) => {
    if (result) {
      handleSelectSuggestion(result);
    } else {
      setAnchorEl(null);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      fetchData();
      navigate(`/results/productoId=${selectedProduct.id}`);
    } else if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const url = `http://18.191.210.53:8082/disponibilidad/por-fechaStock/${formattedDate}`;
      axios
        .get(url)
        .then((response) => {
          setSearchResults(response.data);
          window.location.href = url;
        })
        .catch((error) => {
          console.error("Error al buscar productos:", error);
        });
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setSearchTerm(selectedProduct.nombre);
    }
  }, [selectedProduct]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "50vh",
        gap: "1vw",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://mardesantiago.com/wp-content/uploads/2021/05/Portada-gastronomia-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowX: "hidden",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#ffff",
          display: { xs: "none", md: "flex" },
          textAlign: "start",
          maxWidth: "28vw",
          flexWrap: "wrap",
          fontSize: "2rem",
          fontWeight: "700",
        }}
      >
        Busca la experiencia que más se adapte a tu paladar!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: { xs: "1.2rem", xl: "1vw", md: "1vw" },
          flexDirection: { xs: "column", xl: "row", md: "row" },
          alignItems: { xs: "center" },
          padding: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: "1.2rem", xl: "1vw", md: "1vw" },
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
              width: { xl: "30vw", height: "91%" },
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <RestaurantIcon />
            </IconButton>
            <Autocomplete
              sx={{ width: "100%" }}
              id="search-input"
              freeSolo
              options={suggestions}
              value={selectedProduct || searchTerm}
              onInputChange={(event, newSearchTerm) => {
                handleInputChange({ target: { value: newSearchTerm } });
              }}
              getOptionLabel={(option) =>
                option && option.nombre ? option.nombre : ""
              }
              onChange={(event, newValue) => {
                handleClose(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Elige tu categoría o experiencia"
                  inputProps={{
                    ...params.inputProps,
                    "aria-label": "search google maps",
                  }}
                  value={searchTerm}
                  onChange={handleInputChange}
                  fullWidth
                />
              )}
            />
          </Paper>
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
            type="button"
            sx={{
              width: "10vw",
              background: "white",
              "&:hover": { background: "white", padding: "0" },
            }}
            disabled={isSearching}
            onClick={handleSearchClick}
          >
            Buscar
          </Button>
        </Box>
      </Box>
      {/* Dropdown para mostrar resultados */}
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          sx={{ width: "24%" }}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <DropdownPaper
                style={{ maxHeight: "300px", overflowY: "auto", width: "100%" }}
              >
                <MenuList>
                  {searchResults.map((result) => (
                    <Box
                      key={result.id}
                      onClick={() => handleSelectSuggestion(result)}
                      style={{ cursor: "pointer" }}
                    >
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar alt={result.nombre} src={result.imagen} />
                        </ListItemAvatar>
                        <ListItemText primary={result.nombre} />
                      </ListItem>
                    </Box>
                  ))}
                </MenuList>
              </DropdownPaper>
            </Grow>
          )}
        </Popper>
      </ClickAwayListener>
    </Box>
  );
};

export default Search;
