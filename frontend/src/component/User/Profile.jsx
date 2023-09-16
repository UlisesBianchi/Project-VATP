import { Box, Typography } from '@mui/material'

const Profile = () => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  if (!userFromLocalStorage) {
    return null;
  }

  const { firstName, lastName } = userFromLocalStorage;

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "6vh" }}>
      <Typography color="primary" variant='h4'>Perfil del usuario</Typography>
      <Box sx={{ background: "grey" }}>
        <Typography>{`${firstName} ${lastName}`}</Typography>
      </Box>
    </Box>
  )
}

export default Profile
