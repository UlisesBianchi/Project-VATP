import { Box, Typography } from '@mui/material'
import React from 'react'

const Error = () => {
  return (
    <>
        <Box sx={{display:'flex', justifyContent: 'center', margin: '18rem'}}>
            <Typography variant= 'h4' sx={{color: 'primary'}} >
            Está pagina no existe. Por favor vuelva a la home.
            </Typography>
        </Box>
    </>
  )
}

export default Error