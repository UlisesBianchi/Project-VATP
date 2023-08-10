import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';


import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const CardProduct = ({ data }) => {
    return (
        <Box sx={{display:"flex", flexDirection:{ xs:"column", md:"row"} }}>
        <Card sx={{ width: 345, height: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          width="200"
          image={`${data.imgUrl}`}
          alt={`${data.name}`}
        />
        <CardContent>
                
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ width: 345, height: 250, display:"flex", flexDirection:"column", alignItems:"center" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
   </Box>
      );
    };
export default CardProduct;