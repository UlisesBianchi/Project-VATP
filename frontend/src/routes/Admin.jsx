import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';

function Admin() {
  const [open, setOpen] = useState(false);

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', gap: '5vw' }}>
      {/* Menú lateral */}
      <List>
      <Link  style={{ textDecoration: 'none', color: 'inherit' }} to={"/admin"} >
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
          <Link to={'/admin/admin-product'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Productos" />
              </ListItemButton>
            </Link>
            <Link to={'/admin/admin-category'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Categorías" />
              </ListItemButton>
            </Link>
            {/* Agrega más elementos para otras opciones */}
          </List>
        </Collapse>
        
        {/* Agrega más elementos de menú aquí */}
      </List>

      {/* Contenido central */}
      <Outlet />
    </Box>
  );
}

export default Admin;
