  import Paper from '@mui/material/Paper';
  import InputBase from '@mui/material/InputBase';
  import Divider from '@mui/material/Divider';
  import IconButton from '@mui/material/IconButton';
  import { Box, Button, Typography } from '@mui/material';
  import RestaurantIcon from '@mui/icons-material/Restaurant';
  import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';





  const Search = () => {
      return (
          

          <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", height:"30vh", gap:"1vw", background:"#666DF2"}}>
          
          <Typography variant='h5' sx={{color:"#E9EEFC", display:"flex", textAlign:"center"}} >Busca la experiencia que mas se adapte a tu paladar!</Typography>
          <Box sx={{display:"flex", justifyContent:"space-between", gap:"1vw", flexDirection:{xs:"column", xl:"row", md:"row"}, alignItems:{xs:"center"} }}>
          <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width:{xl:"30vw"} , padding:"0" }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <RestaurantIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Elige tu categoria o experiencia"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          
          </Paper>
      
          <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']} sx={{paddingTop:"0"}}>
      
          <DatePicker label="Seleccione la fecha" sx={{  width:{xl:"25vw"} , background:"white"}} />
        </DemoContainer>
      </LocalizationProvider>
        
          <Button variant='outlined' type='submit'  sx={{width:"10vw", background:"white", '&:hover': { background: "white", padding:"0" } }}>Buscar</Button>
          </Box>
        </Box>
        );
  }

  export default Search