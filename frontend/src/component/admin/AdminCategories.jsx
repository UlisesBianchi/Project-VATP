import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ContextGlobal } from "../utils/globalContext";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AdminCategories = () => {
  const { obj, AdminComponent } = useContext(ContextGlobal);
  const [category, setCategory] = useState(obj.category);
  const navigate = useNavigate();
  const url2= "http://18.191.210.53:8082/categorias";

  useEffect(() => {
    axios.get(url2).then((categoryRes) => {
      setCategory(categoryRes.data);
    });
  }, []);


  const handleDelete = async (categorytId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoria?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `http://18.191.210.53:8082/categorias/${categorytId}`
        );
        // Eliminar el producto del estado local
        const updatedCategories = category.filter(
          (category) => category.id !== categorytId
        );
        setCategory(updatedCategories);
        console.log("categoria eliminada");
      } catch (error) {
        console.error("Error al eliminar la categoria:", error);
      }
    }
  };
  const handleEdit =(categoryId)=>{
    navigate(`/admin/form-category/update/${categoryId}`)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "imagen",
      headerName: "Imagen",
      width: 250,
      sortable: false,
      filterable: false,
      hide: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <img
          src={params.row.imagenUrl}
          alt={`Imagen ${params.row.id}`}
          style={{ width: "8vw", height: "10vh" }}
        />
      ),
    },
    {
      field: "Producto",
      headerName: "Producto",
      width: 350,
      align: "center",
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      filterable: false,
      hide: true,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => (
        <Box sx={{display: "flex"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDelete(params.row.id)}
        >
          Eliminar
        </Button>
        <Button
        variant="contained"
        color="primary"
        onClick={() => handleEdit(params.row.id)}
      >
        Editar
      </Button>
      </Box>
      ),
    },
  ];

  const rows = category.map((category) => ({
    id: category.id,
    imagen: "",
    imagenUrl: category.imagenUrl,
    Producto: category.nombre,
    Acciones: "",
  }));

  return (
    <Box sx={{ display: "flex" }}>
      {AdminComponent}
      <Box
        sx={{ display: "flex", flexDirection: "column", marginLeft: "10vh" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color="primary" sx={{ margin: "5vh" }}>
            Categorias
          </Typography>
          <Link to={"/admin/form-category"}>
            <Button
              variant="contained"
              sx={{ marginRight: "5vw", height: "5vh", background: "primary" }}
            >
              Agregar categoria
            </Button>
          </Link>
        </Box>
        <Box sx={{ height: "100%", width: "100%", margin: "2v" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowHeight={() => 80}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[20, 10]}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCategories;