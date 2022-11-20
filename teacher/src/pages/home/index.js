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
import Calendar from "../../components/Calendar";
import { Divider } from "@mui/material";

const mdTheme = createTheme();

export default function Home() {
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
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                    backgroundImage: `url('${backgroundImg}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Paper>
              </Grid>

              <Grid item xs={10} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 410,
                  }}
                >
                  <Typography variant="h4" component="div" align="center">
                    Calendario
                  </Typography>
                  <Divider variant="subheader" sx={{ pt: 1 }} />
                  <Grid item p={2}>
                    <Calendar />
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 160,
                  }}
                >
                  <Typography variant="h4" component="div">
                    ¡Bienvenido Docente!
                  </Typography>
                  <Divider variant="subheader" Align="center" sx={{ pt: 1 }} />
                  <Typography variant="p" component="div" Align="left" p={2}>
                    {" "}
                    "Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo
                    aprendo"
                    <br />- Benjamin Franklin -
                  </Typography>
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
