import { useState } from 'react';
import { TextField, Button, Container, CssBaseline, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://18.191.210.53:8082/api/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );

            const responseData = response.data;
            console.log(responseData);

            if (responseData.message === "Email not exists") {
                alert("Email not exists");
            } else if (responseData.message === "Login Success") {
                navigate('/home');
            } else {
                alert("Incorrect Email and Password do not match");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while logging in");
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{height:"50vh",border:"1px solid grey",borderRadius:"15px"}}>
            <CssBaseline  />
            <Box sx={{display:"flex",flexDirection:"column",marginTop:"10vh"}} >
                <Typography component="h1" variant="h5" sx={{color:"#E23333"}}>
                    Iniciar sesión
                </Typography>
                <form className="form" onSubmit={login}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Iniciar sesión
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default LoginForm;