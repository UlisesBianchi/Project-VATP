import { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ContextGlobal } from "../utils/globalContext";

const FormRegistrationProducts = () => {
  const url = "http://18.191.210.53:8082/productos";
  const { AdminComponent, obj } = useContext(ContextGlobal);

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const sendForm = async (data) => {
    try {
      // Recopilar las URLs de las imágenes
      const imageUrls = [image1, image2, image3].filter(
        (url) => url.trim() !== ""
      );

      const formData = {
        ...data,
        images: imageUrls,
      };

      console.log("Data being sent:", formData);

      // Enviar los datos al servidor
      await axios.post(url, formData);
      alert("Formulario enviado");
      console.log(formData);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        descripcion: "",
        descripcionCorta:"",
        nombre: "",
        precio: "",
        categoria: "",
        images: [],
      },
      onSubmit: sendForm,
      validationSchema: Yup.object({
        descripcion: Yup.string()
          .required("Campo obligatorio")
          .min(4, "Debe tener al menos 4 caracteres"),
          descripcionCorta: Yup.string()
          .required("Campo obligatorio")
          .min(4, "Debe tener al menos 4 caracteres"),
        nombre: Yup.string()
          .required("Campo obligatorio")
          .min(2, "Debe tener al menos 2 caracteres"),
        precio: Yup.number()
          .required("Campo obligatorio")
          .positive("Debe ser un número positivo")
          .integer("Debe ser un número entero"),
        categoria: Yup.object().shape({
          id: Yup.number().required("Campo obligatorio"),
          nombre: Yup.string().required("Campo obligatorio"),
        }),
      }),
    });

  return (
    <Box sx={{ display: "flex" }}>
      {AdminComponent}

      <Container sx={{ marginTop: "10vh", marginBottom: "10vh" }}>
        <Typography
          sx={{ marginBottom: "5vh" }}
          variant="h4"
          align="left"
          gutterBottom
          color="primary"
        >
          Agregar un producto
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Sección de Nombre y Descripción */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                border: "solid grey 1px",
                borderRadius: "5px",
                height: "80vh",
                width: "80vw",
                marginBottom: "2vh",
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{ margin: "2vh 0 2vh 1vw" }}
              >
                Nombre y descripción
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                }}
              >
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h7"
                    color="primary"
                    sx={{ marginLeft: "1vw" }}
                  >
                    Nombre
                  </Typography>
                  <TextField
                    fullWidth
                    label=""
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                    sx={{ margin: "1vw 0 0 1vw", width: "180%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h7"
                    color="primary"
                    sx={{ marginLeft: "1vw" }}
                  >
                    Descripción
                  </Typography>
                  <TextField
                    label=""
                    name="descripcion"
                    value={values.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    rows={5}
                    multiline
                    sx={{ margin: "1vw 0 0 1vw", width: "180%" }}
                  />
                  
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h7"
                    color="primary"
                    sx={{ marginLeft: "1vw" }}
                  >
                    Descripción Corta
                  </Typography>
                  <TextField
                    label=""
                    name="descripcionCorta"
                    value={values.descripcionCorta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    rows={5}
                    multiline
                    sx={{ margin: "1vw 0 0 1vw", width: "180%" }}
                  />
                  
                </Grid>
              </Grid>
            </Box>

            {/* Sección de Precios */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                border: "solid grey 1px",
                borderRadius: "5px",
                height: "25vh",
                width: "80vw",
                marginBottom: "2vh",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ margin: "2vh 0 2vh 1vw" }}
                >
                  Precios
                </Typography>
                <FormControl
                  fullWidth
                  sx={{ width: "50%", margin: "1vw 0 0 1vw" }}
                >
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="precio"
                    value={values.precio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.precio && Boolean(errors.precio)}
                    helperText={touched.precio && errors.precio}
                  />
                </FormControl>
              </Grid>
            </Box>

            {/* Sección de Categoría */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                border: "solid grey 1px",
                borderRadius: "5px",
                height: "30vh",
                width: "80vw",
                marginBottom: "2vh",
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{ margin: "2vh 0 2vh 1vw" }}
              >
                Categoría
              </Typography>
              <Grid item xs={12}>
                <Typography
                  variant="h7"
                  color="primary"
                  sx={{ marginLeft: "1vw" }}
                >
                  Elige la categoría
                </Typography>
                <FormControl
                  fullWidth
                  sx={{ margin: "1vw 0 0 1vw", width: "90%" }}
                >
                  <Select
                    name="categoria"
                    value={values.categoria.id}
                    onChange={(event) => {
                      const selectedCategory = obj.category.find(
                        (category) => category.id === event.target.value
                      );
                      handleChange({
                        target: {
                          name: "categoria",
                          value: selectedCategory,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    error={touched.categoria && Boolean(errors.categoria)}
                  >
                    <MenuItem value="" disabled>
                      Selecciona una categoría
                    </MenuItem>
                    {obj.category.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.categoria && errors.categoria && (
                    <Typography color="error">{errors.categoria}</Typography>
                  )}
                </FormControl>
              </Grid>
            </Box>

            {/* Sección de Imagen */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                border: "solid grey 1px",
                borderRadius: "5px",
                height: "60vh",
                width: "80vw",
                marginBottom: "2vh",
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{ margin: "2vh 0 2vh 1vw" }}
              >
                Imagen principal
              </Typography>
              <TextField
                fullWidth
                label="URL de la imagen principal"
                name="imagenUrl"
                value={image1}
                onChange={(e) => setImage1(e.target.value)} // Actualizar estado de imagen1
                onBlur={handleBlur}
                error={touched.imagenUrl && Boolean(errors.imagenUrl)}
                helperText={touched.imagenUrl && errors.imagenUrl}
                sx={{ margin: "1vw 0 0 1vw", width: "90%" }}
              />

              {/* Campo de Imagen 2 */}
              <Typography
                variant="h5"
                color="primary"
                sx={{ margin: "2vh 0 2vh 1vw" }}
              >
                Imagen 2
              </Typography>
              <TextField
                fullWidth
                label="URL de la imagen 2"
                name="imagenUrl2"
                value={image2}
                onChange={(e) => setImage2(e.target.value)} // Actualizar estado de imagen2
                onBlur={handleBlur}
                error={touched.imagenUrl2 && Boolean(errors.imagenUrl2)}
                helperText={touched.imagenUrl2 && errors.imagenUrl2}
                sx={{ margin: "1vw 0 0 1vw", width: "90%" }}
              />

              {/* Campo de Imagen 3 */}
              <Typography
                variant="h5"
                color="primary"
                sx={{ margin: "2vh 0 2vh 1vw" }}
              >
                Imagen 3
              </Typography>
              <TextField
                fullWidth
                label="URL de la imagen 3"
                name="imagenUrl3"
                value={image3}
                onChange={(e) => setImage3(e.target.value)} // Actualizar estado de imagen3
                onBlur={handleBlur}
                error={touched.imagenUrl3 && Boolean(errors.imagenUrl3)}
                helperText={touched.imagenUrl3 && errors.imagenUrl3}
                sx={{ margin: "1vw 0 0 1vw", width: "90%" }}
              />
            </Box>
            {/* Botón de Enviar */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "2vw",
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default FormRegistrationProducts;
