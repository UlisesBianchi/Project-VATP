import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { ContextGlobal } from "../utils/globalContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { obj } = useContext(ContextGlobal);
 

  async function handleLogin(event) {
    event.preventDefault();
    obj.login(email, password);
    // Llama a la función de inicio de sesión del contexto
  }
 
  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "2vh" }}>
      <CssBaseline />
      <div className="paper">
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form className="form" onSubmit={handleLogin}>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
