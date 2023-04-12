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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import AddButton from "../../components/AddButton";
import axios from "axios";
import {
  Autocomplete,
  Button,
  FilledInput,
  Paper,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
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
      IdVendedor: ' ',
      IdFormaPago: ' ',
      Entregado: ' ',
      Pagado: ' ',
      Descuento: ' ',
      Subtotal:'',
      Cliente_Id: "",
      Observacion: ' ',
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

  calcularSubtotal = ()=>{
    let subtotal=0;
    this.state.ventaProductos.map( (item)=>{
    subtotal += parseInt(item.PrecioVenta);
    });
    this.setState({Subtotal: subtotal});
    };
  
  handleBorrarProducto = async (index) => {
    this.state.ventaProductos.splice(index, 1);
    await this.setState({ ventaProductos: this.state.ventaProductos });
  };

  handleProductInputChange = async (event) => {
    await this.setState({ query: event.target.value });
    this.getProductos();
  };
  handleProductChange = async (event, selectedProduct) => {
    if (selectedProduct) {
      console.log(selectedProduct);

      selectedProduct.Cantidad = 1;
      selectedProduct.PrecioVenta = selectedProduct.PrecioMenor;
      selectedProduct.PrecioVenta = selectedProduct.PrecioMenor;

      this.state.ventaProductos.push(selectedProduct);
      console.log(this.state.ventaProductos);
      await this.setState({ ventaProductos: this.state.ventaProductos });

      this.calcularSubtotal();
    }
  };

  onCantidadChange = async (index, cantidad) => {
    this.state.ventaProductos[index].Cantidad = cantidad;
    this.state.ventaProductos[index].PrecioVenta = this.state.ventaProductos[index].PrecioMenor * cantidad;
  
    this.calcularSubtotal();
    
    this.setState({ ventaProductos: this.state.ventaProductos });
  };

  onPrecioChange = async (index, precio) => {
    this.state.ventaProductos[index].PrecioMenor = precio;
    this.state.ventaProductos[index].PrecioVenta =
      this.state.ventaProductos[index].Cantidad * precio;
    this.setState({ ventaProductos: this.state.ventaProductos });
    this.calcularSubtotal();
  };
  
  handleChangeIdVendedor = async (event) => {
    this.setState({ IdVendedor: event.target.value });
  };
  handleChangeIdFormaPago = async (event) => {
    this.setState({ IdFormaPago: event.target.value });
  };
  handleChangeEntregado = async (event) => {
    this.setState({ Entregado: event.target.value });
  };
  handleChangePagado = async (event) => {
    this.setState({ Pagado: event.target.value });
  };
  handleChangeDescuento = async (event) => {
    this.setState({ Descuento: event.target.value });
  };
  handleChangeCliente_Id = async (event) => {
    this.setState({ Cliente_Id: event.target.value });
    alert(event.target.value);
  };
  handleChangeObservacion = async (event) => {
    this.setState({ Observacion: event.target.value });
  };

  handleGuardarVenta = () => {
    if (this.state.ventaProductos.length === 0) {
      return alert("No hay productos");
    }
    const ventaData = {
      Vendedor_Id: this.state.IdVendedor,
      Cliente_Id: this.state.Cliente_Id,
      FormaPago_Id: this.state.IdFormaPago,
      Total: this.state.Subtotal,
      Entregado: this.state.Entregado,
      Pagado: this.state.Pagado,
      Observacion: this.state.Observacion,
      Descuento: this.state.Descuento,
      productos: this.state.ventaProductos,
    };
    let _this = this;
    axios
      .post("http://localhost:9000/ventas", ventaData)
      .then(function (response) {
        console.log(response);
        alert("Se guardó correctamente");
      })
      .catch(function (error) {
        console.log(error);
      });
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
                            value={this.state.IdVendedor}
                            onChange={this.handleChangeIdVendedor}
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
                            value={this.state.IdFormaPago}
                            onChange={this.handleChangeIdFormaPago}
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
                            value={this.state.Entregado}
                            onChange={this.handleChangeEntregado}
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            <option value={0}>--</option>
                            <option value={1}>Si</option>
                            <option value={2}>No</option>
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
                            value={this.state.Pagado}
                            onChange={this.handleChangePagado}
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            <option value={0}>--</option>
                            <option value={1}>Si</option>
                            <option value={2}>No</option>
                          </NativeSelect>
                        </Grid>
                      </Grid>
                      <Grid item xs container direction="column">
                        <Grid item xs>
                          <TextField
                            id="standard-basic"
                            label="Descuento..%.."
                            variant="standard"
                            value={this.state.Descuento}
                            onChange={this.handleChangeDescuento}
                          />
                        </Grid>
                        <Grid item xs>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Clientes
                          </InputLabel>
                          <NativeSelect
                            //input={<OutlinedInput id="select-multiple-chip" label="clientes" />}
                            value={this.state.Cliente_Id}
                            onChange={this.handleChangeCliente_Id}
                            inputProps={{
                              id: "uncontrolled-native",
                            }}
                          >
                            {this.state.clientes.map((item, index) => (
                              <option
                                key={item.IdCliente}
                                value={item.IdCliente}
                              >
                                {item.Nombre}
                              </option>
                            ))}
                          </NativeSelect>

                          {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            
                            onChange={this.handleChangeCliente_Id}
                            options={this.state.clientes}
                            getOptionLabel={(option) => option.Nombre}
                            renderInput={(params) => (
                              <TextField {...params}  value={this.state.Cliente_Id} label="Cliente" />
                            )}
                          /> */}
                        </Grid>
                        <Grid item xs>
                          <TextField
                            id="standard-basic"
                            label="Observaciones"
                            variant="standard"
                            value={this.state.Observacion}
                            onChange={this.handleChangeObservacion}
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell bgcolor="pink">
                          {" "}
                          <b>Codigo</b>
                        </TableCell>
                        <TableCell bgcolor="pink">
                          {" "}
                          <b>Producto</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Marca</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Cant</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Precio</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Subtotal</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Acciones</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.ventaProductos.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" component="th" scope="row">
                            {item.IdProducto}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.Detalle}
                          </TableCell>
                          <TableCell align="right">{item.marca}</TableCell>
                          <TableCell align="right">
                            <FormControl fullWidth sx={{ m: 1 }} size="small">
                              <Input
                                id="filled-adornment-amount"
                                defaultValue={item.Cantidad}
                                onChange={(e) => {
                                  this.onCantidadChange(index, e.target.value);
                                }}
                              />
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <FormControl fullWidth sx={{ m: 1 }} size="small">
                              <Input
                                defaultValue={item.PrecioMenor}
                                onChange={(e) => {
                                  this.onPrecioChange(index, e.target.value);
                                }}
                                startAdornment={
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <FormControl fullWidth sx={{ m: 1 }} size="small">
                              <FilledInput
                                value={item.PrecioVenta}
                                startAdornment={
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <DeleteIcon
                              sx={{ color: pink[600] }}
                              align="left"
                              onClick={() => {
                                this.handleBorrarProducto(index);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}><FormControl fullWidth sx={{ m: 1 }} size="small">Subtotal:
                              <FilledInput
                                value={this.state.Subtotal}
                                startAdornment={
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                }
                              />
                            </FormControl></TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Descuento</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    size="small"
                    onClick={this.handleGuardarVenta}
                  >
                    {"Guardar"}
                  </Button>
                  {/* <Pagination
                    totalRecords={totalProductos}
                    pageLimit={10}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                  /> */}
                </TableContainer>
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
