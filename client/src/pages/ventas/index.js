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
  CircularProgress,
  debounce,
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
      usuarios: [],
      Id: '',
      IdFormaPago: '',
      Entregado: '',
      Pagado: '',
      Descuento: '',
      EditDescuento: '',
      Interes: '',
      Subtotal: '',
      Total: '',
      Cliente_Id: "",
      Observacion: '',
      formaPago: [],
      clientes: [],
      numeroVenta: "",
      loading: false,
      open: false,
      selectedValues: []
    };
  }


  componentDidMount() {
    this.getUsuarios();
    this.getFormaPago();
    this.getClientes();
  }

  getUsuarios = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}usuarios`,
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
      url: `${process.env.REACT_APP_API}formaPago`,
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
      url: `${process.env.REACT_APP_API}clientes?query=${this.state.query}`,
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
    this.state.loading = true;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}productos?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.productos.length === 0) {
          // alert("No se encontraron productos");
        } else {
          _this.setState(response.data);
          _this.state.loading = false;
          console.log(`getProducts() OK setState done!`)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onCantidadChange = async (index, cantidad) => {
    this.state.ventaProductos[index].Cantidad = cantidad;
    this.state.ventaProductos[index].PrecioVenta = this.state.ventaProductos[index].PrecioMenor * cantidad;

    //this.calcularSubtotal();
    this.onDescuentoChange();
    this.calcularTotal();
    //this.calcularDescInt();

    await this.setState({ ventaProductos: this.state.ventaProductos });
  };

  onDescuentoChange = async (index, descuento) => {
    // await this.setState({ EditDescuento: e.target.value });
    // await console.log("EditDescuento", event.target.value)

    //console.log("PrecioVenta", this.state.ventaProductos[index].PrecioVenta)
    this.state.ventaProductos[index].Descuento = descuento;
    console.log("EditDescuento:", descuento)

    let DESCUENTO = descuento / 100;
    console.log("div", DESCUENTO);
    let subtotal = this.state.ventaProductos[index].PrecioVenta;
    console.log(" 1 subtotal", subtotal);

    let precioVenta = subtotal * DESCUENTO;
    console.log(" desc", precioVenta);
    //let subtotal = this.state.Subtotal * DESCUENTO;
    let total = subtotal - precioVenta;
    console.log(" precio con des", total);

    // this.state.ventaProductos[index].PrecioVenta = this.state.ventaProductos[index].PrecioMenor - precioVenta;
    //console.log("subt desc", total);
    //await this.setState({ Subtotal: total });
    this.state.ventaProductos[index].PrecioVenta = total
    this.calcularSubtotal();
    this.calcularTotal();
    await this.setState({ ventaProductos: this.state.ventaProductos });

    //await this.calcularDescInt();
    //await this.calcularSubtotal();
    // await this.calcularTotal();

  };

  calcularDescInt = async (index, descuento) => {
    console.log("EditDescuento22", this.state.EditDescuento)
    //console.log("PrecioVenta", this.state.ventaProductos[index].PrecioVenta)
    this.state.ventaProductos[index].Descuento = descuento;
    let DESCUENTO = this.state.EditDescuento / 100;
    // this.state.ventaProductos[index].PrecioVenta = precioVenta;
    // precioVenta = this.state.ventaProductos[index].PrecioMenor * DESCUENTO;
    let subtotal = this.state.Subtotal * DESCUENTO;
    let total = this.state.Subtotal - subtotal;

    // this.state.ventaProductos[index].PrecioVenta = this.state.ventaProductos[index].PrecioMenor - precioVenta;
    //console.log("subt desc", total);
    //await this.setState({ Subtotal: total });
    total = this.state.ventaProductos[index].PrecioVenta
    this.calcularSubtotal();
    this.calcularTotal();
    await this.setState({ ventaProductos: this.state.ventaProductos });
  };



  calcularSubtotal = () => {
    let subtotal = 0;
    this.state.ventaProductos.map((item) => {
      subtotal += parseInt(item.PrecioVenta);
    });
    this.setState({ Total: subtotal });
    console.log("total es", subtotal);
  };

  calcularTotal = () => {

    // if (this.state.Interes === 0 ) {
    let subtotal = 0;
    this.state.ventaProductos.map((item) => {
      subtotal += parseInt(item.PrecioVenta);
    });
    this.setState({ Total: subtotal });
    console.log("total es", subtotal);
    //}

    //else if (this.state.Interes > 0 ) {
    // console.log(this.state.Interes);
    // let INTERES = this.state.Interes / 100;
    //  let subtotal = this.state.Subtotal * INTERES;
    //  let total = this.state.Subtotal + subtotal;
    //  this.setState({ Total: total });
    //}


  };


  handleBorrarProducto = async (index) => {
    this.state.ventaProductos.splice(index, 1);
    await this.setState({ ventaProductos: this.state.ventaProductos });
    console.log(this.state.ventaProductos);
    //this.calcularTotal();
    this.handleProductChange();

  };

  handleProductInputChange = async (event) => {
    if (
      String(event.target.value).trim() === "" 
      || String(event.target.value).trim().length < 2
      || !event.target.value
      || event.target.value === undefined
      || event.target.value === "undefined"
      ) {
      return true;
    }
    await this.setState({ query: event.target.value });
    console.log(`event.target.value: ${event.target.value}`);
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

      //this.calcularSubtotal();
      this.calcularTotal();

    }
  };



  onInteresChange = async (event) => {
    await this.setState({ Interes: event.target.value });
    // this.calcularSubtotal();
    // this.calcularTotal();
    console.log(this.state.Interes);
    let INTERES = this.state.Interes / 100;
    console.log("paso1", INTERES);

    let subtotal = this.state.Total * INTERES;
    let total = this.state.Total + subtotal;
    console.log("paso3", total);

    await this.setState({ Total: total });

  };

  onSubtotalChange = async (event) => {
    await this.calcularTotal();
    this.calcularSubtotal();
    this.calcularTotal();
  };

  onPrecioChange = async (index, precio) => {
    this.state.ventaProductos[index].PrecioMenor = precio;
    this.state.ventaProductos[index].PrecioVenta =
      this.state.ventaProductos[index].Cantidad * precio;
    await this.setState({ ventaProductos: this.state.ventaProductos });
    this.calcularSubtotal();
    this.calcularTotal();
  };

  handleChangeIdUsuario = async (event) => {
    this.setState({ Id: event.target.value });
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
  handleChangeInteres = async (event) => {
    this.setState({ Interes: event.target.value });
  };
  handleChangeCliente_Id = async (event) => {
    this.setState({ Cliente_Id: event.target.value });
  };
  handleChangeObservacion = async (event) => {
    this.setState({ Observacion: event.target.value });
  };

  handleGuardarVenta = () => {
    if (this.state.ventaProductos.length === 0) {
      return alert("No hay productos");
    }
    const ventaData = {
      Usuario_Id: this.state.Id,
      Cliente_Id: this.state.Cliente_Id,
      FormaPago_Id: this.state.IdFormaPago,
      Total: this.state.Total,
      Subtotal: this.state.Subtotal,
      Entregado: this.state.Entregado === "" ? "2" : this.state.Entregado,
      Pagado: this.state.Pagado === "" ? "2" : this.state.Pagado,
      Observacion: this.state.Observacion === "" ? "ninguna" : this.state.Observacion,
      Descuento: this.state.Descuento === "" ? "0" : this.state.Descuento,
      Interes: this.state.Interes === "" ? "0" : this.state.Interes,
      productos: this.state.ventaProductos,
    };
    let _this = this;
    axios
      .post(`${process.env.REACT_APP_API}ventas`, ventaData)
      .then(function (response) {
        console.log(response);
        console.log("datos de venta", ventaData);
        alert("Se guardó correctamente");

      })
      .catch(function (error) {
        console.log(error);
        alert("No se guardo la venta");
      });
    this.setState({ Id: "" });
    this.setState({ Cliente_Id: "" });
    this.setState({ IdFormaPago: "" });
    this.setState({ Subtotal: "" });
    this.setState({ Total: "" });
    this.setState({ Entregado: "" });
    this.setState({ Pagado: "" });
    this.setState({ Observacion: "" });
    this.setState({ Descuento: "" });
    this.setState({ Interes: "" });
    this.setState({ ventaProductos: [] });
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
              height: "150vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

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
                    // values={this.state.selectedValues}
                    options={this.state.productos}
                    autoHighlight
                    // isOptionEqualToValue={(option, value) => option.Detalle === value.Detalle}
                    getOptionLabel={(option) => option.IdProductoBusqueda}
                    // filterOptions={(x) => x}
                    open={this.state.open}
                    onOpen={() => {
                      this.setState({ open: true });
                    }}
                    onClose={() => {
                      this.setState({ open: false });
                    }}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.IdProducto}>
                        <img
                          loading="lazy"
                          height="80px" width="80px"
                          src={option.ImagenURL}
                          alt=""
                        />
                        [{option.Codigo}] {option.IdProducto} - {option.Detalle} - {option.marca} - ${option.PrecioMenor}
                      </Box>

                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar producto"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                    onChange={this.handleProductChange}
                    onInputChange={debounce(this.handleProductInputChange, 200)}
                  />

                  {/*  <Autocomplete
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
                  /> */}
                </Paper>
              </Grid>

              <Grid m={0} pt={2}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                        {/*  <TableCell bgcolor="pink" align="right">
                          <b>Descuento</b>
                        </TableCell> */}
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
                          {/* <TableCell align="right">
                            <FormControl fullWidth sx={{ m: 1 }} size="small">
                              <Input
                                id="filled-adornment-amount"
                                defaultValue={item.Descuento}
                                onChange={(e) => {
                                  this.onDescuentoChange(index, e.target.value);
                                }}
                              />
                            </FormControl></TableCell> */}
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
                            ${item.PrecioMenor}

                          </TableCell>

                          <TableCell align="right">
                            <FormControl fullWidth sx={{ m: 1 }} size="small">
                              <FilledInput
                                value={item.PrecioVenta}
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
                        <TableCell rowSpan={4} />
                      </TableRow>
                      {/* <TableRow >
                        <TableCell>
                          <FormControl fullWidth sx={{ m: 1 }} size="small">
                            Recargo:<Input
                              id="filled-adornment-amount"
                              value={this.state.Interes}
                              label="Interes"
                              size="small"
                              onChange={this.onInteresChange}
                            />
                          </FormControl>

                        </TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell colSpan={2}>
                          <FormControl fullWidth sx={{ m: 1 }} size="small">
                            Total:
                            <FilledInput
                              value={this.state.Total}
                              startAdornment={
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>

                  {/* <Pagination
                    totalRecords={totalProductos}
                    pageLimit={10}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                  /> */}
                </TableContainer>
              </Grid>

              <Grid m={0} pt={2}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 2,
                    display: "flex",
                  }}
                >

                  <Grid container direction="column" >
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
                              color="warning"
                              focused
                            >
                              Vendedor
                            </InputLabel>
                            <NativeSelect
                              value={this.state.Id}


                              onChange={this.handleChangeIdUsuario}
                              inputProps={{
                                id: "uncontrolled-native",
                              }}
                            >
                              {this.state.usuarios.map((item, index) => (
                                <option
                                  key={item.Id}
                                  value={item.Id}
                                >
                                  {item.Nombre}
                                </option>
                              ))}
                            </NativeSelect>
                          </Grid>
                          <Grid item xs>
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                              color="warning"
                              focused
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
                                  {item.Nombre_Cliente}
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
                        </Grid>
                        <Grid item xs container direction="column">
                          <Grid item xs>

                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                              color="warning"
                              focused
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
                              color="warning"
                              focused
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
                              <option value={0}></option>
                              <option value={1}>Si</option>
                              <option value={2}>No</option>
                            </NativeSelect>
                          </Grid>
                          <Grid item xs>
                            <InputLabel
                              variant="standard"
                              htmlFor="demo-simple-select-label"
                              color="warning"
                              focused
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
                              <option value={0}></option>
                              <option value={1}>Si</option>
                              <option value={2}>No</option>
                            </NativeSelect>
                          </Grid>
                        </Grid>
                        <Grid item xs container direction="column">
                          {/*    
                          <Grid item xs>
                            <TextField
                              id="standard-basic"
                              label="Recargo..%.."
                              variant="standard"
                              value={this.state.Interes}
                              onChange={this.handleChangeInteres}
                            />
                          </Grid> */}

                          <Grid item xs>
                            <TextField
                              id="standard-basic"
                              label="Observaciones"
                              variant="standard"
                              value={this.state.Observacion}
                              onChange={this.handleChangeObservacion}
                            />
                          </Grid>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                            size="small"
                            onClick={this.handleGuardarVenta}
                          >
                            {"Guardar"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
