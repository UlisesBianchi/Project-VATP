import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const CardProduct = ({ data }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
            <Card sx={{ width: 345, height: 250 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        width="200"
                        image={data.imagenUrl} // Fixed this line
                        alt={data.name} // Fixed this line
                    />
                    <CardContent>
                        {console.log(data.id)}
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ width: 345, height: 250, display: "flex", flexDirection: "column" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        {data.nombre}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {data.descripcion}
                    </Typography>
                    <Typography variant="body2">
                        ${data.precio}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/product/${data.id}`}> {/* Fixed this line */}
                        <Button size="small">Learn More</Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    );
};

export default CardProduct;
