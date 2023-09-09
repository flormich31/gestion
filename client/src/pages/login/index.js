import * as React from "react";
import { useState } from 'react';
import { pink, purple } from '@mui/material/colors';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Copyright";
import { useHistory, Redirect } from "react-router-dom";
import backgroundImg from "../../assets/images/diva2.jpg";
import axios from "axios";
import PropTypes from 'prop-types';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: pink[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

export default function Login({ }) {
  const history = useHistory();
  const [usuario, setUsuario] = useState();
  const [clave, setClave] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    history.push("/ventas")
    /* axios
      .post(`${process.env.REACT_APP_API}login`, {
        usuario: usuario,
        clave: clave,
      })
      .then(function (response) {
        // Maneja la respuesta del servidor en caso de éxito
        console.log(response.data);
        // Redirecciona al usuario a otra página
        history.push("/ventas")
      })
      .catch((error) => {
        // Maneja el error en caso de fallo de autenticación
        alert("¡Combinación incorrecta de usuario/contraseña!")
      }); */
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url('${backgroundImg}')`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box
              component="form"
              noValidate

              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Correo electrónico"

                autoComplete="email"
                autoFocus
                //onChange={e => setUsuario(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth

                label="Contraseña"
                type="password"
                id="clave "
                autoComplete="current-password"
               // onChange={e => setClave(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />

              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}


              >
                Iniciar sesi&oacute;n
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidé mi contraseña
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Crear cuenta de usuario"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

