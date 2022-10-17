import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import backgroundImg from "../../assets/images/homeABC.png";

const mdTheme = createTheme();

function DashboardContent() {
  const history = useHistory();

  const handleActivitySelect = (event) => {
    history.push("/activity-read");
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
                  elevation={3}
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                    backgroundImage: `url('${backgroundImg}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Stack direction="columns" spacing={2}></Stack>
                  <Typography variant="h4" component="div" color={"#f5f5f5"}>
                    Grupo "A"
                  </Typography>

                  <Typography variant="p" mt={1} color={"#f5f5f5"}>
                    Cuarto grado
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 350,
                  }}
                >
                  <Typography variant="h4" component="div">
                    Alumnos
                  </Typography>
                  <Divider variant="subheader" />
                  <br />
                  <div>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircleIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Maria Gonzalez" />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <AccountCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Jose Pereira" />
                    </ListItem>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 350,
                  }}
                >
                  <Typography variant="h4" component="div">
                    Actividades a realizar
                  </Typography>
                  <Divider variant="subheader" />
                  <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                    <Grid item xs={8} md={3} lg={4}>
                      <Card
                        elevation={5}
                        sx={{ maxWidth: 345 }}
                        onClick={handleActivitySelect}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image="/assets/images/leerpictogramas.png"
                          alt="Education image"
                        />

                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="center"
                          >
                            Leer oraciones
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Container>
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

export default function GroupsA() {
  return <DashboardContent />;
}
