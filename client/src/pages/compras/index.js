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
import { Redirect } from "react-router-dom";
import ButtonCreateProduct from "../../components/ButtonCreateProduct";
import DataTableVenta from "../../components/DataTableVenta";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddButton from "../../components/AddButton";

const mdTheme = createTheme();
class DashboardContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            productos: [],
            ventaProductos: [],
            usuarios: [],
            proveedores: [],

            IdProveedor: "",
            Id: '',
            Subtotal: '',
            Total: '',
            numeroVenta: "",
        };
    }

    componentDidMount() {
        this.getUsuarios();
        this.getTodosProveedores();
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
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getTodosProveedores = () => {
        let _this = this;
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_API}proveedores`,
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

    calcularSubtotal = () => {
        let subtotal = 0;
        this.state.ventaProductos.map((item) => {
            subtotal += parseInt(item.PrecioVenta);
        });
        this.setState({ Subtotal: subtotal });
    };

    calcularTotal = () => {
        let subtotal = 0;
      this.state.ventaProductos.map((item) => {
        subtotal += parseInt(item.PrecioVenta);
      });
      this.setState({ Total: subtotal });
      console.log("total es", subtotal);
    };

    handleBorrarProducto = async (index) => {
        this.state.ventaProductos.splice(index, 1);
        await this.setState({ ventaProductos: this.state.ventaProductos });
        this.calcularSubtotal();
        this.calcularTotal();
        this.setState({ Subtotal: "" });
        this.setState({ Descuento: "" });
        this.setState({ Interes: "" });
        this.setState({ Total: "" });
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
            this.calcularTotal();
        }
    };

    onCantidadChange = async (index, cantidad) => {
        this.state.ventaProductos[index].Cantidad = cantidad;
        this.state.ventaProductos[index].PrecioVenta = this.state.ventaProductos[index].PrecioMenor * cantidad;

        this.calcularSubtotal();
        this.calcularTotal();

        await this.setState({ ventaProductos: this.state.ventaProductos });
    };

    onDescuentoChange = async (event) => {
        await this.setState({ Descuento: event.target.value });

        this.calcularSubtotal();
        this.calcularTotal();

    };

    onInteresChange = async (event) => {
        await this.setState({ Interes: event.target.value });
        this.calcularSubtotal();
        this.calcularTotal();

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

    handleChangeProveedor = (event) => {
        this.setState({ Proveedor_Id: event.target.value });
      };
/*     handleChangeIdFormaPago = async (event) => {
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
    }; */
   /*  handleChangeCliente_Id = async (event) => {
        this.setState({ Cliente_Id: event.target.value });
    }; */
    handleChangeObservacion = async (event) => {
        this.setState({ Observacion: event.target.value });
    };

    handleGuardarCompra = () => {
      if (this.state.ventaProductos.length === 0) {
            return alert("No hay productos");
        }
        const ventaData = {
            Usuario_Id: this.state.Id,
            Proveedor_Id: this.state.Proveedor_Id,
            Total: this.state.Total,
            Subtotal: this.state.Subtotal,
            Observacion: this.state.Observacion === "" ? "ninguna" : this.state.Observacion,
            productos: this.state.ventaProductos,
        };
        let _this = this;
        axios
            .post(`${process.env.REACT_APP_API}compras`, ventaData)
            .then(function (response) {
                console.log(response);
                console.log("datos de venta", ventaData);
              alert("Se guardó correctamente");

              _this.setState({ Id: "" });
              _this.setState({ Total: "" });
              _this.setState({ productos:  [] });
              _this.setState({ usuarios:  [] });
              _this.setState({ proveedores:  [] });
            _this.setState({ ventaProductos: [] });
                  
                
            })
            .catch(function (error) {
                console.log(error);
                alert("Asegurese de completar los campos: Usuario - Proveedor")
            });
        
            
    };

    redirectHandlerOpen = () => {
        this.setState({ redirect: true });
        this.renderRedirectOpen();
    };
    renderRedirectOpen = () => {
        if (this.state.redirect) {
            return <Redirect to="/productos" />;

        }
    }

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
                  }}
                >

                  <Grid container direction="column" >
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item xs={12}>
                          <Typography variant="h5" component="div" p={1}>
                            Detalle de compra
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item xs container direction="column">
                          <Grid item xs>
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
                            
                          </Grid>
                        </Grid>
                        <Grid item xs container direction="column">
                          <Grid item xs>

                          <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            >
                              Usuario
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
                          </Grid>
                          <Grid item xs>
                          </Grid>
                        </Grid>
                        <Grid item xs container direction="column">
                          <Grid item xs>
                          <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                            >
                              Proveedor
                            </InputLabel>
                            <NativeSelect
                              value={this.state.Usuario_Id_Id}
                              onChange={this.handleChangeProveedor}
                              inputProps={{
                                id: "uncontrolled-native",
                              }}
                            >
                              {this.state.proveedores.map((item, index) => (
                                <option
                                  key={item.IdProveedor}
                                  value={item.IdProveedor}
                                >
                                  {item.RazonSocial}
                                </option>
                              ))}
                            </NativeSelect>
                          </Grid>
                          </Grid>
                        <Grid item xs container direction="column">
                          <Grid item xs>
                          </Grid>
                          <Grid item xs>
                          </Grid>
                          <Grid item xs>
                          </Grid>
                          <Grid item xs>
                           
                          </Grid>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                            size="small"
                            onClick={this.handleGuardarCompra}
                          >
                            {"Guardar"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

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
                                        options={this.state.productos}
                                        autoHighlight
                                        getOptionLabel={(option) => option.Detalle}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    height="80px" width="80px"
                                                    src={option.ImagenURL}
                                                    alt=""
                                                />
                                                {option.IdProducto} - {option.Detalle} - {option.marca} - ${option.PrecioMenor}
                                            </Box>

                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Buscar producto"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />

                                        )}
                                        onChange={this.handleProductChange}
                                        onInputChange={this.handleProductInputChange}
                                    />

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
                                                       $ {item.PrecioMenor}{/* <Input
                                                                defaultValue={item.PrecioMenor}
                                                                onChange={(e) => {
                                                                    this.onPrecioChange(index, e.target.value);
                                                                }}
                                                                startAdornment={
                                                                    <InputAdornment position="start">
                                                                        $
                                                                    </InputAdornment>
                                                                }
                                                            /> */}
                                                        </FormControl>
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
                                              {/*  <TableCell size="small" colSpan={2}>
                                                     <FormControl fullWidth sx={{ m: 1 }} size="small">
                                                        Subtotal:
                                                        <FilledInput
                                                            value={this.state.Subtotal}
                                                            onChange={this.onSubtotalChange}
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    $
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>
                                                </TableCell> */}
                                            </TableRow>
                                            <TableRow >
                                              {/*   <TableCell>
                                                    <FormControl fullWidth sx={{ m: 1 }} size="small">
                                                        Descuento:<Input
                                                            id="filled-adornment-amount"
                                                            value={this.state.Descuento}
                                                            label="Descuento"
                                                            size="small"
                                                            onChange={this.onDescuentoChange}
                                                        />
                                                    </FormControl>

                                                </TableCell> */}
                                            </TableRow>
                                             {/*<TableRow >
                                                <TableCell>
                                                    <FormControl fullWidth sx={{ m: 1 }} size="small">
                                                        Interes:<Input
                                                            id="filled-adornment-amount"
                                                            value={this.state.Interes}
                                                            label="Interes"
                                                            size="small"
                                                            onChange={this.onInteresChange}
                                                        />
                                                    </FormControl>

                                                </TableCell> 
                                            </TableRow>*/}
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

                         {/*    <Grid m={0} pt={2}>
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
                                                        Datos de compra
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

                                                        <InputLabel
                                                            variant="standard"
                                                            htmlFor="uncontrolled-native"
                                                        >
                                                            Usuario
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

                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            sx={{ mt: 1, mb: 1 }}
                                                            size="small"
                                                            onClick={this.handleGuardarCompra}
                                                        >
                                                            {"Guardar"}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid> */}
                            <AddButton  />
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default DashboardContent;
