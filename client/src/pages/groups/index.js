import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import AddButton from "../../components/AddButton";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const mdTheme = createTheme();

function DashboardContent() {
  const history = useHistory();

  const handleGroupASelect = (event) => {
    history.push("/groups-A");
  };
  const handlePressNew = (event) => {
    history.push("/group-create");
  };

  const handleClick5 = (event) => {
    alert("click en ABRIR grupo 5");
  };
  const handleClick6 = (event) => {
    alert("click en ABRIR grupo 6");
  };

  const handleClickCod = (event) => {
    alert("Código: 2022");
  };

  React.useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:9000/groups",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <AddButton onPress={handlePressNew} />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} lg={12}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Buscar
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image="/assets/images/cuarto.png"
                    alt="Cuarto image"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      4to - Cuarto grado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2 Estudiantes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      1 Actividad
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleGroupASelect}>
                      Abrir
                    </Button>
                    <Button size="small" onClick={handleClickCod}>
                      Ver código
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image="/assets/images/quinto.png"
                    alt="Quinto image"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      5to - Quinto grado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      3 Estudiantes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2 Actividades
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleClick5}>
                      Abrir
                    </Button>
                    <Button size="small" onClick={handleClickCod}>
                      Ver código
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image="/assets/images/sexto.png"
                    alt="Sexto image"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="center"
                    >
                      6to - Sexto grado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      1 Estudiante
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      1 Actividad
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleClick6}>
                      Abrir
                    </Button>
                    <Button size="small" onClick={handleClickCod}>
                      Ver código
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Groups() {
  return <DashboardContent />;
}
