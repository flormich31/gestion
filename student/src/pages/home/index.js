import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import Typography from "@mui/material/Typography";
import backgroundImg from "../../assets/images/homeABC.png";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";

const mdTheme = createTheme();

export default function Home() {
  const history = useHistory();

  const handlePress = (event) => {
    history.push("/groups-A");
  };

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

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2} d>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 180,
                    backgroundImage: `url('${backgroundImg}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 490,
                  }}
                >
                  <Typography variant="h5" component="div" align="center">
                    ¡Bienvenido Estudiante!
                  </Typography>
                  <Divider variant="subheader" sx={{ pt: 1 }} />
                +0.</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 490,
                  }}
                >
                  <Grid item xs={8} sx={{ p: 2, align: "center" }}>
                    <Card sx={{ maxWidth: 400 }}>
                      <CardMedia
                        component="img"
                        height="210"
                        image="/assets/images/cuarto.png"
                        alt="Cuarto image"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          align="center"
                        >
                          4to - Cuarto grado
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <TextField
                          margin="normal"
                          required
                          id="code"
                          label="Código"
                          name="codigo"
                          autoComplete="codigo"
                          size="small"
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handlePress}
                        >
                          ingresar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
