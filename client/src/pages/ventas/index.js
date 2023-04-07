import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import AddButton from "../../components/AddButton";
import axios from "axios";
import { Autocomplete, Button, Paper, Typography } from "@mui/material";
import { Redirect } from "react-router";
import ButtonCreateProduct from "../../components/ButtonCreateProduct";
import DataTableVenta from "../../components/DataTableVenta";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import AccountCircle from "@mui/icons-material/AccountCircle";

const mdTheme = createTheme();

class DashboardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      ventaProductos: [],
      vendedores: [],
      formaPago: [],
      clientes: [],
      numeroVenta: "",
    };
  }

  componentDidMount() {
    this.getVendedores();
    this.getFormaPago();
    this.getClientes();
  }

  getVendedores = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/vendedores",
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

  getFormaPago = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/formaPago",
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
  getClientes = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/clientes?query=${this.state.query}`,
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
  getProductos = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/productos?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.productos.length === 0) {
          // alert("No se encontraron productos");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  redirectHandlerOpen = () => {
    this.setState({ redirect: true });
    this.renderRedirectOpen();
  };
  renderRedirectOpen = () => {
    if (this.state.redirect) {
      return <Redirect to="/groups-A" />;
    }
  };
  makeid = (length) => {
    const result = "";
    const characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.setState.numeroVenta = result(5);
    console.log(this.numeroVenta);
  };
  handleRemove = (id) => {
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
  };

  handleProductInputChange = async (event) => {
    await this.setState({ query: event.target.value });
    this.getProductos();
  };
  handleProductChange = async (event, selectedProduct) => {
    if (selectedProduct) {
      console.log(selectedProduct);
      this.state.ventaProductos.push(selectedProduct);
      console.log(this.state.ventaProductos);
      await this.setState({ ventaProductos: this.state.ventaProductos });
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
              <Paper
                elevation={10}
                sx={{
                  p: 2,
                  display: "flex",
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs={12}>
                        <Typography variant="h5" component="div" p={1}>
                          Detalle de venta
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs container direction="column">
                        <Grid item xs>
                          <TextField
                            id="standard-read-only-input"
                            defaultValue={this.numeroVenta}
                            label="Venta número:"
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            id="standard-read-only-input"
                            defaultValue={new Date().toLocaleString()}
                            label="Fecha"
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Vendedor
                          </InputLabel>
                          <NativeSelect
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            {this.state.vendedores.map((item, index) => (
                              <option
                                key={item.IdVendedor}
                                value={item.IdVendedor}
                              >
                                {item.Nombre}
                              </option>
                            ))}
                          </NativeSelect>
                        </Grid>
                      </Grid>
                      <Grid item xs container direction="column">
                        <Grid item xs>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Forma de pago
                          </InputLabel>
                          <NativeSelect
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            {this.state.formaPago.map((item, index) => (
                              <option
                                key={item.IdFormaPago}
                                value={item.IdFormaPago}
                              >
                                {item.FormaPago}
                              </option>
                            ))}
                          </NativeSelect>
                        </Grid>
                        <Grid item xs>
                          <InputLabel
                            variant="standard"
                            htmlFor="demo-simple-select-label"
                          >
                            Entregado
                          </InputLabel>
                          <NativeSelect
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            <option>Si</option>
                            <option>No</option>
                          </NativeSelect>
                        </Grid>
                        <Grid item xs>
                          <InputLabel
                            variant="standard"
                            htmlFor="demo-simple-select-label"
                          >
                            Pagado
                          </InputLabel>
                          <NativeSelect
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            <option>Si</option>
                            <option>No</option>
                          </NativeSelect>
                        </Grid>
                      </Grid>
                      <Grid item xs container direction="column">
                        <Grid item xs>
                          <TextField
                            id="standard-basic"
                            label="Descuento..%.."
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={this.state.clientes}
                            getOptionLabel={(option) => option.Nombre}
                            renderInput={(params) => (
                              <TextField {...params} label="Cliente" />
                            )}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            id="standard-basic"
                            label="Observaciones"
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>

              <Grid m={0} pt={2}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Autocomplete
                    disablePortal
                    id="combo-box-producto"
                    size="small"
                    options={this.state.productos}
                    getOptionLabel={(option) => option.Detalle}
                    renderInput={(params) => (
                      <TextField {...params} label="Buscar producto..." />
                    )}
                    onChange={this.handleProductChange}
                    onInputChange={this.handleProductInputChange}
                  />
                </Paper>
              </Grid>

              <Grid m={0} pt={2}>
                <Paper elevation={10}>
                  <DataTableVenta />
                </Paper>
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
