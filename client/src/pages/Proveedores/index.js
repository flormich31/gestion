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
  Paper, Button,
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


class Proveedores extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      proveedores: [],
    };
  }

  componentDidMount() {
    this.getProveedores();
  }

  getProveedores = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/proveedores",
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


  handleChangeRazonSocial = event => {
    this.setState({ razonSocial: event.target.value });
  }
  handleChangeDomicilio = event => {
    this.setState({ domicilio: event.target.value });
  }
  handleChangeWeb = event => {
    this.setState({ web: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    let _this = this;

    axios.post("http://localhost:9000/proveedores", {
      razonSocial: this.state.razonSocial,
      domicilio: this.state.domicilio,
      web: this.state.web,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        _this.getProveedores();
      })
      .catch((err) => {
        console.log(err);
      });
      this.setState({ razonSocial: "" }); 
      this.setState({ domicilio: "" }); 
      this.setState({ web: "" }); 
  }

  handleRemove = (IdProveedor) => {
    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/proveedores/" + IdProveedor,
      headers: {},
    };
    if (window.confirm("¿Realmente desea borrar este proveedor?")) {
      axios(config)
      .then(function (response) {
          _this.getProveedores();
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

                {/* Editor de proveedores */}
                <Grid item xs={12} >
                  <Paper elevation={23}
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",

                    }}>
                    {/* Editor de proveedores */}
                    <Typography variant="h8" component="div">
                      <b>Editor de proveedores</b>
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>

                      <FormControl  variant="filled" sx={{ m: 1, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="razonSocial"
                          label="Nombre"
                          size="small"
                          value={this.state.razonSocial}
                          onChange={this.handleChangeRazonSocial}
                        />
                      </FormControl>
                      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onSubmit={this.handleSubmit} >
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
                      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onSubmit={this.handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="web"
                          label="Web"
                          size="small"
                          value={this.state.web}
                          onChange={this.handleChangeWeb}
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
                    <div style={{ height: 400, width: '100%', alignContent: "center" }}>

                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell bgcolor="pink" > <b>ID</b></TableCell>
                            <TableCell bgcolor="pink" ><b>Nombre</b></TableCell>
                            <TableCell bgcolor="pink" ><b>Domicilio</b></TableCell>
                            <TableCell bgcolor="pink" > <b>Web</b></TableCell>
                            <TableCell bgcolor="pink" align="right"><b>Acciones</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.proveedores.map((item, index) => (
                            <TableRow
                              key={item.IdProveedor}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {item.IdProveedor}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.RazonSocial}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.Domicilio}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {item.Web}
                              </TableCell>
                              <TableCell align="right"><EditIcon sx={{ color: pink[200] }} />
                              <DeleteIcon 
                              sx={{ color: pink[600] }} 
                              onClick={() => {
                                this.handleRemove(item.IdProveedor);
                              }} /></TableCell>

                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </Grid>

                <AddButton />
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Proveedores;

