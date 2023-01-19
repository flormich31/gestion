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
import { DataGrid } from '@mui/x-data-grid';

const mdTheme = createTheme();

const columns = [
  { field: 'id', headerName: 'Codigo', width: 90, },
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Marca', width: 130 },
  {
    field: 'age',
    headerName: 'Precio',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Categoria',
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 680 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 1000 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 2500 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 3800 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 6530 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 1543 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 1259 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 7845 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 3560 },
];

export default function Proveedores() {


  const history = useHistory();

 /*  React.useEffect(() => {

    var config = {
      method: "get",
      url: "http://localhost:9000/productos",
      headers: {},
    };
    axios(config)
    .then(function (response) {
      console.log(response);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, []); */
  
  const handlePress = (event) => {
    history.push("/activity-editor");
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
              <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                  }}
                >
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
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <div style={{ height: 400, width: '100%', alignContent: "center", backgroundColor:"inherit"}}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div>
              </Grid>
            </Grid>
            <AddButton onPress={handlePress} />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
