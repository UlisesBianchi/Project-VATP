import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import axios from 'axios';
import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  ListItemAvatar,
  Avatar,
  TextField,
  Autocomplete,
  Popper,
  Grow,
  ClickAwayListener,
  Paper as DropdownPaper,
  MenuList,
} from '@mui/material';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const suggestions = []; // Replace with actual suggestions

  useEffect(() => {
    const fetchData = async () => {
      setIsSearching(true);

      try {
        const response = await axios.post('http://18.191.210.53:8082/search/keywords', { keywords: searchTerm });

        if (response.status === 200) {
          setSearchResults(response.data);
          setAnchorEl(document.getElementById('search-input'));
        }
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }

      setIsSearching(false);
    };

    if (searchTerm) {
      fetchData();
    } else {
      setSearchResults([]);
      setAnchorEl(null); // Close the dropdown if no search term
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '50vh',
          gap: '1vw',
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://mardesantiago.com/wp-content/uploads/2021/05/Portada-gastronomia-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#ffff",
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
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1vw',
            flexDirection: { xs: 'column', xl: 'row', md: 'row' },
            alignItems: { xs: 'center' },
            padding: '0',
          }}
        >
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: { xl: '30vw', height: '100%' },
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <RestaurantIcon />
            </IconButton>
            <Autocomplete
              sx={{width:"100%"}}
              id="search-input"
              freeSolo
              options={suggestions}
              onInputChange={(event, newSearchTerm) => {
                handleInputChange({ target: { value: newSearchTerm } });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Elige tu categoría o experiencia"
                  inputProps={{ ...params.inputProps, 'aria-label': 'search google maps' }}
                  value={searchTerm}
                  onChange={handleInputChange}
                  fullWidth // Make the search bar wider
                />
              )}
            />
          </Paper>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              width: '10vw',
              background: 'white',
              '&:hover': { background: 'white', padding: '0' },
            }}
            disabled={isSearching}
          >
            Buscar
          </Button>
        </Box>
      </Box>
      {/* Dropdown for search results */}
      <ClickAwayListener onClickAway={handleClose}>
        <Popper sx={{width:"24%"}} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <DropdownPaper style={{ maxHeight: '300px', overflowY: 'auto', width:"100%" }}>
                <MenuList>
                  {searchResults.map((result) => (
                    <ListItem key={result.id} button onClick={handleClose}>
                      <ListItemAvatar>
                        <Avatar alt={result.nombre} src={result.imagen} />
                      </ListItemAvatar>
                      <ListItemText primary={result.nombre} />
                    </ListItem>
                  ))}
                </MenuList>
              </DropdownPaper>
            </Grow>
          )}
        </Popper>
      </ClickAwayListener>
    </div>
  );
};

export default Search;
