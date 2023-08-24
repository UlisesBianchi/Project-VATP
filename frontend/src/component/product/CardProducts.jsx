import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';


import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';


const CardProduct = ({ product, imageMap }) => {
  const productImageUrl = imageMap[product.id];

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Card sx={{ width: 345, height: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            width="200"
            image={productImageUrl || ''}
            alt={product.nombre}
          />
          <CardContent>
            {/* Other card content */}
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ width: 345, height: 250, display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          {/* Card content */}
          <Typography>{product.nombre}</Typography>
          <Typography>{product.precio}</Typography>
          <Typography>{product.descripcion}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CardProduct;