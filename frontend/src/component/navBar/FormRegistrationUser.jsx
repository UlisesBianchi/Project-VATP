import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormRegistrationUser = () => {
  const url = "http://localhost:8082/register/save";

  const [mensaje, setMensaje] = useState(false);
  
    const sendForm = async (data, { resetForm }) => {
      const formData = new URLSearchParams();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
    
    try {
      await axios.post(url, formData); 
      
      setMensaje(true);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        
      },
      onSubmit: sendForm,
      validationSchema: Yup.object({
        firstName: Yup.string()
          .required("Campo obligatorio")
          .min(4, "El nombre debe tener al menos 4 caracteres"),
        lastName: Yup.string()
          .required("Campo obligatorio")
          .min(4, "El apellido debe tener al menos 4 caracteres"),
        email: Yup.string()
          .email("Ingrese un email válido")
          .required("Campo obligatorio"),
        password: Yup.string()
          .required("Campo requerido")
          .min(5, "Debe tener al menos 5 caracteres"),
        confirmPassword: Yup.string()
          .required("Campo requerido")
          .oneOf(
            [Yup.ref("password"), null],
            "Las contraseñas deben coincidir"
          ),
      }),
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container sx={{ marginTop: "10vh", marginBottom: "10vh" }} maxWidth="sm">
      <Typography
        sx={{ marginBottom: "5vh" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Registro de Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
      {mensaje && (
        <Typography>
          ¡ Muchas gracias {localStorage.getItem("firstName")}, su usuario fue
          creado con exito !
        </Typography>
      )}
    </Container>
  );
};

export default FormRegistrationUser;