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
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const mdTheme = createTheme();

function DashboardContent() {
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
            <Grid container spacing={4}>
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
