import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {
  Paper,
  Typography,
} from "@mui/material";
import { Redirect } from "react-router";
import DataTableVenta from "../../components/DataTableVenta";
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const mdTheme = createTheme();


class DashboardContent extends React.Component {

   constructor(props) {
    super(props);

    this.state = {
      productos: [],
    };
  }

  componentDidMount() {
    this.getProductos();
  }

  getProductos = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/productos",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        _this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 /*  componentDidUpdate (){
    this.getProductosBus();
  }; */
  redirectHandlerOpen = () => {
    this.setState({ redirect: true });
    this.renderRedirectOpen();
  };
 /*  getProductosBus = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/productos",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        _this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }; */
  renderRedirectOpen = () => {
    if (this.state.redirect) {
      return <Redirect to="/groups-A" />;
    }
  };
  /* handleRemove = (id) => {
    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/productos/" + id,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        _this.getGroups();
      })
      .catch(function (error) {
        console.log(error);
      });
  };  */

  render() {
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
            
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={12} lg={12} >
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
                <Paper elevation={23}>
                <div style={{ height: 400, width: '100%', alignContent: "center"}}>
                  
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell bgcolor="pink" > <b>Descripcion del producto</b></TableCell>
                      <TableCell bgcolor="pink" align="right"><b>Precio</b></TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.productos.map((item, index) => (
                      <TableRow
                        key={item.Costo}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {item.Detalle}
                        </TableCell>
                        <TableCell align="right">{item.Costo}</TableCell>
                       
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
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
}

export default DashboardContent;


/* const columns = [
  { field: 'id', headerName: 'Codigo', width: 90, },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'mark', headerName: 'Marca', width: 130 },
  {
    field: 'category',
    headerName: 'Categoria',
    width: 160,
  },
  {
    field: 'price',
    headerName: 'Precio',
    type: 'number',
    width: 90,
  },
 
];

const rows = [
  { id: 1, name: 'Snow', mark: 'Jon', category: "Maquillaje", price: 680 },
  { id: 2, name: 'Lannister', mark: 'Cersei',  category: "Maquillaje", price: 1000 },
  { id: 3, name: 'Lannister', mark: 'Jaime',  category: "Maquillaje", price: 2500 },
  { id: 4, name: 'Stark', mark: 'Arya', category: "Maquillaje",  price: 3800 },
  { id: 5, name: 'Targaryen', mark: 'Daenerys', category: "Maquillaje",  price: 6530 },
  { id: 6, name: 'Melisandre', mark: null,  category: "Maquillaje", price: 1543 },
  { id: 7, name: 'Clifford', mark: 'Ferrara',  category: "Maquillaje", price: 1259 },
  { id: 8, name: 'Frances', mark: 'Rossini', category: "Maquillaje",  price: 7845 },
  { id: 9, name: 'Roxie', mark: 'Harvey',  category: "Maquillaje", price: 3560 },
];

export default function Productos() {

  const history = useHistory();

  const handlePress = (event) => {
    history.push("/activity-editor");
  };
  React.useEffect(() => {

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
         
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={12} lg={12} >
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
                <Paper>
                <div style={{ height: 400, width: '100%', alignContent: "center"}}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div>
                </Paper>
              </Grid>

            </Grid>
            <AddButton onPress={handlePress} />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
} */
