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
  Button,
  Typography,
} from "@mui/material";
import { Redirect } from "react-router";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddButton from "../../components/AddButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
const mdTheme = createTheme();


class Clientes extends React.Component {

   constructor(props) {
    super(props);

    this.state = {
      clientes: [],
    };
  }

  componentDidMount() {
    this.getClientes();
  }

  getClientes = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/clientes",
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

  handleChangeNombre = event => {
    this.setState({ nombre: event.target.value });
  }
  handleChangeCuit = event => {
    this.setState({ cuit: event.target.value });
  }
  handleChangeDomicilio = event => {
    this.setState({ domicilio: event.target.value });
  }
  handleChangeCelular = event => {
    this.setState({ celular: event.target.value });
  }
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }
  handleChangeCodigoPostal = event => {
    this.setState({ codigoPostal: event.target.value });
  }
 

  handleSubmit = event => {
    event.preventDefault();
    let _this = this;

    axios.post("http://localhost:9000/clientes", {
      nombre: this.state.nombre,
      cuit: this.state.cuit,
      domicilio: this.state.domicilio,
      celular: this.state.celular,
      email: this.state.email,
      codigoPostal: this.state.codigoPostal
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        _this.getClientes();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({});
  }
  // This is the put request
  handleEdit = (IdProducto) => {
    let _this = this;
    var config = {
      method: "put",
      url: "http://localhost:9000/productos/${IdProducto}",
      headers: {},
    }
    axios(config)
      .then(function (response) {
        _this.getClientes();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemove = (IdCliente) => {
    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/clientes/" + IdCliente,
      headers: {},
    };
    if (window.confirm("¿Realmente desea borrar este cliente?")) {
      axios(config)
      .then(function (response) {
          _this.getClientes();
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
  } 
  }

  redirectHandlerOpen = () => {
    this.setState({ redirect: true });
    this.renderRedirectOpen();
  };
 
  renderRedirectOpen = () => {
    if (this.state.redirect) {
      return <Redirect to="/groups-A" />;
    }
  };

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
              
              {/* Editor de clientes */}
              <Grid item xs={12} >
                  <Paper elevation={23}
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    
                    <Typography variant="h8" component="div">
                      <b>Editor de clientes</b>
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>

                      <FormControl variant="filled" sx={{ m:0.5,minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="categoria"
                          label="Nombre del cliente"
                          size="small"
                          value={this.state.nombre}
                          onChange={this.handleChangeNombre}
                        />
                      </FormControl>
                      <FormControl variant="filled" sx={{ m:0.5, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="cuit"
                          label="CUIT"
                          size="small"
                          value={this.state.cuit}
                          onChange={this.handleChangeCuit}
                        />
                      </FormControl>
                      <FormControl variant="filled" sx={{m:0.5, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="domicilio"
                          label="Domicilio"
                          size="small"
                          value={this.state.domicilio}
                          onChange={this.handleChangeDomicilio}
                        />
                         </FormControl>
                        <FormControl variant="filled" sx={{ m:0.5, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="celular"
                          label="Celular"
                          size="small"
                          value={this.state.celular}
                          onChange={this.handleChangeCelular}
                        />
                        
                      </FormControl>
                      <FormControl variant="filled" sx={{ m:0.5, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          size="small"
                          value={this.state.email}
                          onChange={this.handleChangeEmail}
                        />
                      </FormControl>
                      <FormControl variant="filled" sx={{ m:0.5, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="codigoPostal"
                          label="Codigo Postal"
                          size="small"
                          value={this.state.CodigoPostal}
                          onChange={this.handleChangeCodigoPostal}
                        />
                      </FormControl>
                      
                      
                      <br />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}
                        size="small"
                        onClick={this.handleSubmit}
                      >
                        {"Guardar"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              
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
                  
                  <Table sx={{ minWidth: 650  }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell bgcolor="pink" > <b>Nombre</b></TableCell>
                      <TableCell bgcolor="pink" ><b>CUIT</b></TableCell>
                      <TableCell bgcolor="pink" > <b>Domicilio</b></TableCell>
                      <TableCell bgcolor="pink" > <b>Celular</b></TableCell>
                      <TableCell bgcolor="pink" > <b>Email</b></TableCell>
                      <TableCell bgcolor="pink" > <b>Codigo Postal</b></TableCell>
                      <TableCell bgcolor="pink" > <b>Acciones</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.clientes.map((item, index) => (
                      <TableRow
                        key={item.Nombre}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {item.Nombre}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.Cuit}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.Domicilio}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.Celular}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.Email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.CodigoPostal}
                        </TableCell>
                        <TableCell align="right"><EditIcon sx={{ color: pink[200] }} /><DeleteIcon sx={{ color: pink[600] }} onClick={() => {
                                this.handleRemove(item.IdCliente);
                              }} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
                </Paper>
              </Grid>
              
              <AddButton/>
             </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Clientes;

