import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useState } from "react";

const FormRegistationProducts = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
    }
  };
  return (
    

    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        margin:"10vh",
        
      }}
      noValidate
      autoComplete="off"
    >
      <Typography>Datos necesarios </Typography>
      <TextField
          id="outlined-multiline-flexible"
          label="Nombre"
          multiline
          maxRows={4}
        />
      <TextField
        id="outlined-multiline-static"
        label="Descripcion"
        multiline
        rows={4}
      />

      <TextField
        id="outlined-number"
        label="Stock"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControl  sx={{ m: 1 , width: "25ch"}}>
          <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      
      <Box sx={{display:"flex", flexDirection:"column"}}>
        <TextField label="Nombre de imagen" fullWidth />
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" sx={{}}>
            Cargar imagen
          </Button>
        </label>
        {image && <img src={URL.createObjectURL(image)} alt="Imagen cargada" />}
      </Box>
      <Button sx={{margin:"5vh"}} variant="outlined" type="submit">Cargar Producto</Button>
    </Box>
  );
};

export default FormRegistationProducts;
