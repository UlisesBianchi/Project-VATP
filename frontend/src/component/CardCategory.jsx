import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const CardCategory = ({ data }) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          width="200"
          image={`${data.imgUrl}`}
          alt={`${data.name}`}
        />
        <CardContent>
          <Typography color='primary' gutterBottom variant="h5" component="div">
            {`${data.nombre}`}
          </Typography>          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardCategory;
