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
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, pink } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const mdTheme = createTheme();

export default function Profile() {
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
                    height: 130,
                  }}
                >
                  <Stack direction="columns" spacing={2}>
                    <div>
                      <ListItem>
                        <Avatar
                          sx={{
                            bgcolor: pink[300],
                            width: 60,
                            height: 60,
                          }}
                        >
                          DF
                        </Avatar>
                        <ListItemIcon />
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography variant="h4">Diva Forever</Typography>
                          }
                        />
                      </ListItem>
                    </div>
                  </Stack>
                </Paper>
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 140,
                  }}
                >
                  <Typography variant="h4" component="div">
                    Contacto
                  </Typography>
                  Telefono: +54 9 3757 65-1761
                  <br />
                  Email: divaforever@gmail.com
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 140,
                  }}
                >
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
