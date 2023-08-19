import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import CardProduct from '../product/CardProducts';

const AdminProducts = () => {
    let producto = [

        {
            id:"1",
            name:"producto 1",
            imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
            descripcion:""
        },
        {
          id:"2",
          name:"producto 2",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"3",
          name:"producto 3",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"4",
          name:"producto 4",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"5",
          name:"producto 5",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"6",
          name:"producto 6",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"7",
          name:"producto 7",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"8",
          name:"producto 8",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"9",
          name:"producto 9",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
        {
          id:"10",
          name:"producto 10",
          imgUrl:"https://i.imgur.com/mCha6F0.jpeg",
          descripcion:""
        },
    ]

    const [product, setProducts] = useState([]);

  useEffect(() => {
    setProducts(producto);
  }, []);

  


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{width:"12vw", marginTop:"5vh", display:"flex"}}>
    <Link to={'product-form'}>    
    <Button >Agregar Producto</Button>
    </Link>
    </Box>
    <Box sx={{ marginTop: "3vh", background: "#E9EEFC", paddingBottom: "10vh" }}>
        <Typography color="secondary" variant="h5" sx={{ marginLeft: "2vw", paddingTop: "5vh" }}>Productos</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center" }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xl: "repeat(2 ,1fr)", xs: "repeat(1 ,1fr)" }, gap: '3rem', marginTop: '2rem', columnGap: "3rem" }}>
                {product.map((data) => (
                    <Box key={data.id}>
                        <CardProduct data={data} />
                        <Button>Eliminar</Button>
                        <Button>Editar</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    </Box>
</Box>
  )
}

export default AdminProducts