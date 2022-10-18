import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import { Button, TextField } from "@mui/material";

const mdTheme = createTheme();

export default function GroupCreate() {
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
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={8} md={8} lg={8}>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="namedb"
                    label="Nombre del grupo"
                    name="namedb"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="code"
                    label="Código de acceso"
                    type="text"
                    id="code"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Crear
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
