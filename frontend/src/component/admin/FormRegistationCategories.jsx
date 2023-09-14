import { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ContextGlobal } from "../utils/globalContext";

const FormRegistrationProducts = () => {
  const url = "http://18.191.210.53:8082/categorias";
  const { AdminComponent } = useContext(ContextGlobal);

  const sendForm = async (data) => {
    try {
      console.log("Data being sent:", data);
      await axios.post(url, data);
      alert("Formulario enviado");
      console.log(data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: "",
        imagenUrl: "",
      },
      onSubmit: sendForm,
      validationSchema: Yup.object({
        nombre: Yup.string()
          .required("Campo obligatorio")
          .min(2, "Debe tener al menos 2 caracteres"),
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
          Agregar una categoria
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
                Nombre
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
                Imagen principal
              </Typography>
              <TextField
                fullWidth
                label="URL de la imagen principal"
                name="imagenUrl"
                value={values.imagenUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.imagenUrl && Boolean(errors.imagenUrl)}
                helperText={touched.imagenUrl && errors.imagenUrl}
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
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default FormRegistrationProducts;
