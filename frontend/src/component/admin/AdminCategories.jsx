import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react'
import { ContextGlobal } from '../utils/globalContext';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';


const AdminCategories = () => {

 

  const { obj , AdminComponent } = useContext(ContextGlobal);
  const [category, setCategory] = useState(obj.category);

 

 
  const handleFavorite = () => {
    const isProductFavorite = favorites.some((fav) => fav.id === product.id);
    let updatedFavorites;
  
    if (isProductFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }
  
    setFavorites(updatedFavorites); // Actualiza el estado de favoritos en el contexto global
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Actualiza el localStorage
  };

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDelete(params.row.id)}
        >
          Eliminar
        </Button>
      ),
    }

  ];

  const rows = category.map((category) => ({
    id: category.id,
    imagen: "",
    imagenUrl: category.imagenUrl,
    Producto: category.nombre,
    Acciones: "",
  }));

  return (
  
      
      <Box sx={{display:"flex"}}>
      {AdminComponent}
      <Box sx={{display:"flex", flexDirection:"column",marginLeft:"20vh", width:"76%"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" color="primary" sx={{ margin: "5vh" }}>
          Categorias
        </Typography>
        <Link to={"/admin/form-category"} >
          <Button variant="contained" sx={{ marginRight: "5vw", height: "5vh", background: "primary" }}>
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

   
  )
}

export default AdminCategories