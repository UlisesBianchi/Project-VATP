import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import axios from "axios";


const Reserve = ()=> {
  
  const { id, fecha } = useParams();
  const [product, setProduct] = useState({});

  console.log(id);
  console.log(fecha);

  const url = "http://localhost8082/reservas/realizar";


  const sendForm = async (formData) => {

    try {
      const { fecha, idUsuario, idProducto } = formData;
      const requestData = {
        fechaReserva: values.fecha,
        usuarioId: idUsuario,
        productos: {
          id: product.id
        },
          
      };
  
      // Llama a la API con los datos del formulario
      await axios.post("http://18.191.210.53:8082/reservas/realizar", requestData);
      alert("Reserva confirmada");
      console.log(requestData);
    } catch (error) {
      
      console.error("Error al enviar el formulario:", error);
    }
  };

 

  const userFromLocalStorage = localStorage.getItem("user");

  const nombre = JSON.parse(userFromLocalStorage).firstName;
  const apellido = JSON.parse(userFromLocalStorage).lastName;
  const email = JSON.parse(userFromLocalStorage).email;
  const userId = JSON.parse(userFromLocalStorage).id;

  useEffect(() => {
    const url = "http://18.191.210.53:8082/productos";
    axios.get(url).then((res) => {
      const selectedProduct = res.data.find((product) => product.id === parseInt(id));
      if (selectedProduct) {
        setProduct(selectedProduct);
        console.log(selectedProduct);
      }
    });
  }, [fecha, id]);
  

  const initialValues = {
    nombre: nombre || "",
    apellido: apellido || "",
    correo: email || "",
    observaciones: "",
    nombreExperiencia: product.nombre,
    idProducto: product.id,
    fecha: fecha || dayjs().format("YYYY-MM-DD"),
    idUsuario: userId || "",
  };

  

  const validationSchema = Yup.object({
    observaciones: Yup.string(),
    fecha: Yup.date().required("La fecha de reserva es obligatoria"),
  });

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: sendForm,
    validationSchema,
  });


  return (
    <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={nombre}
              disabled
              InputLabelProps={{
                shrink: true, // Para que la etiqueta no se colapse
              }}
              InputProps={{
                readOnly: true, // Para hacer el campo de solo lectura
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apellido"
              variant="outlined"
              name="apellido"
              value={apellido}
              disabled
              InputLabelProps={{
                shrink: true, // Para que la etiqueta no se colapse
              }}
              InputProps={{
                readOnly: true, // Para hacer el campo de solo lectura
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              type="email"
              name="correo"
              value={email}
              disabled
              InputLabelProps={{
                shrink: true, // Para que la etiqueta no se colapse
              }}
              InputProps={{
                readOnly: true, // Para hacer el campo de solo lectura
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones"
              variant="outlined"
              name="observaciones"
              value={values.observaciones}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de la experiencia"
              variant="outlined"
              name="nombreExperiencia"
              value={product.nombre}
              disabled
              InputLabelProps={{
                shrink: true, // Para que la etiqueta no se colapse
              }}
              InputProps={{
                readOnly: true, // Para hacer el campo de solo lectura
              }}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de reserva"
              variant="outlined"
              type="date"
              name="fecha"
              value={values.fecha} // Utiliza el valor inicial desde initialValues
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar Reserva
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
  }

export default Reserve;
