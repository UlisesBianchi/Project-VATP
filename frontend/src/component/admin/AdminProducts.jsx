import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ContextGlobal } from "../utils/globalContext";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminProducts = () => {
  const { obj , AdminComponent } = useContext(ContextGlobal);
  const [products, setProducts] = useState(obj.product);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmed) {
      try {
        await axios.delete(`http://18.191.210.53:8082/productos/${productId}`);
        // Eliminar el producto del estado local
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        console.log("producto eliminado");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
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
    { field: "Precio", headerName: "Precio", width: 200, align: "center" },
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
    },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    imagen: "",
    imagenUrl: product.imagenUrl,
    Producto: product.nombre,
    Precio: product.precio,
    Acciones: "",
  }));

  return (
    <Box sx={{display:"flex"}}>
      {AdminComponent}
      <Box sx={{display:"flex", flexDirection:"column", marginLeft:"20vh"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" color="primary" sx={{ margin: "5vh" }}>
          Productos
        </Typography>
        <Link to={"/admin/form-product"}>
          <Button variant="contained" sx={{ marginRight: "5vw", height: "5vh", background: "primary" }}>
            Agregar productos
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

export default AdminProducts;
