import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material'; // Importa el componente Box

const Filter = ({ category }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const checkboxes = category.map((data) => (
    <FormControlLabel
      key={data.id}
      control={<Checkbox icon={icon} checkedIcon={checkedIcon} />}
      label={data.nombre}
    />
    
  ));

  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {checkboxes}

      
    </Box>
  );
}

export default Filter;
