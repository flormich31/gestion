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
  };

  const rows = [
    createData("Maria Gonzalez", "4to grado", 1, "20/11/2022 12:34hs"),
    createData("Jose Pereira", "4to grado", 1, "19/11/2022 09:15"),
    createData("Pedro Arguello", "5to grado", 2, "14/11/2022 07:40hs"),
    createData("Natalia Sanchez", "5to grado", 2, "15/11/2022 16:02hs"),
    createData("Sebastian Miranda", "5to grado", 2, "16/11/2022 08:50hs"),
    createData("Jimena Lopez", "6to grado", 1, "21/11/2022 10:23hs"),
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
                        <TableCell>
                          <b>Estudiantes</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Grupo</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Actividades</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Última modificación</b>
                        </TableCell>
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
