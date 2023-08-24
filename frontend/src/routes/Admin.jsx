import { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
 
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore, Inbox as InboxIcon, StarBorder } from '@mui/icons-material';
import AdminProducts from '../component/admin/AdminProducts';
import AdminCategories from '../component/product/AdminCategories';
import { Link } from 'react-router-dom';

function Admin() {
  const [selectedContent, setSelectedContent] = useState('inicio');
  const [open, setOpen] = useState(false);

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  const renderSelectedContent = () => {
    switch (selectedContent) {
      case 'productos':
        return <AdminProducts />;
      case 'categorias':
        return <AdminCategories />;
     
       
    }
  };

  return (
    <Box sx={{display:"flex", gap:"5vw"}}>
      {/* Menú lateral */}
      <List >
        <Link  style={{textDecoration:"none"}} to={"/admin"} >
        <ListItemButton onClick={() => handleMenuClick('inicio')}>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        </Link>
        <ListItemButton onClick={handleCollapseClick}>
          <ListItemText primary="Productos" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuClick('productos')}>
              <ListItemText primary="Productos" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuClick('categorias')}>
              <ListItemText primary="Categorías" />
            </ListItemButton>
            {/* Agrega aquí más elementos para categorías */}
          </List>
        </Collapse>
        {/* Agrega más elementos de menú aquí */}
      </List>

      {/* Contenido central */}
      <Box flexGrow={1} p={2}>
        {renderSelectedContent()}
      </Box>
    </Box>
  );
}

export default Admin;
