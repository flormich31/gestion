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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddButton from "../../components/AddButton";
import { useHistory } from "react-router-dom";

const mdTheme = createTheme();

export default function Activities() {
  function createData(name, uses, percent, updated_at) {
    return { name, uses, percent, updated_at };
  }

  const history = useHistory();

  const handlePress = (event) => {
    history.push("/activity-editor");
  }

  const rows = [
    createData("Actividad #1", 159, 6.0, "15/08/2021 12:34hs"),
    createData("Actividad #2", 159, 16.0, "15/08/2021 12:34hs"),
    createData("Actividad #3", 159, 6.0, "15/08/2021 12:34hs"),
    createData("Actividad #4", 159, 6.0, "15/08/2021 12:34hs"),
    createData("Actividad #5", 159, 6.0, "15/08/2021 12:34hs"),
    createData("Actividad #6", 159, 60.0, "15/08/2021 12:34hs"),
    createData("Actividad #7", 159, 75.0, "15/08/2021 12:34hs"),
    createData("Actividad #8", 159, 45.0, "15/08/2021 12:34hs"),
    createData("Actividad #9", 159, 20.0, "15/08/2021 12:34hs"),
    createData("Actividad #10", 159, 90.0, "15/08/2021 12:34hs"),
  ];
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
          <AddButton onPress={handlePress} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
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
              <Grid item xs={12} md={12} lg={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Actividad</TableCell>
                        <TableCell align="right">Usos</TableCell>
                        <TableCell align="right">Aciertos</TableCell>
                        <TableCell align="right">Última modificación</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.uses}</TableCell>
                          <TableCell align="right">{row.percent}</TableCell>
                          <TableCell align="right">{row.updated_at}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
