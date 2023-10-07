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
import { pink, white } from "@mui/material/colors";
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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DataTableVenta from "../../components/DataTableVenta";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mdTheme = createTheme();

class ListadoCompras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compras: [],
      datosCompra: [],
      prodcompras: [],
      productos: [],
      compraProductos: [],
      usuarios: [],
      totalCompra: [],
      currentPage: null,
      totalPages: null,

      open: false,
      query: "",
      IdCompra: ' ',
      IdVendedor: ' ',
      IdFormaPago: ' ',
      Entregado: ' ',
      Pagado: ' ',
      Descuento: ' ',
      Observacion: ' ',
      // dateStart: dayjs('2022-04-17'),
      // dateEnd: new Date(),
      startDate: '',
      startDateMysql: '',
      endDate: '',
      endDateMysql: '',

      Cliente_Id: "",
      Observacion: ' ',
      formaPago: [],
      clientes: [],
      numeroCompra: "",
    };
  }

  componentDidMount() {
    this.getCompras();
    this.getDatosCompra();
    this.getListadoCompras();
    this.getTotalCompras();
  }

   getCompras = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}compras?query=${this.state.startDateMysql}&query2=${this.state.endDateMysql}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.compras.length === 0) {
          alert("No se encontraron compras");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };
 

 /*  getVentas = () => {
    let _this = this;

    axios
      .get(`${process.env.REACT_APP_API}ventas`, {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      })
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.ventas.length === 0) {
          alert("No se encontraron ventas");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ startDate: "" });
    this.setState({ endDate: "" });
  
  }; */

  getDatosCompra = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}datosCompra?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.datosCompra.length === 0) {
          alert("No se encontraron datos de compra");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  getListadoCompras = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}listadoCompras?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.prodcompras.length === 0) {
          alert("No se encontraron productos en esta compra");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getTotalCompras = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}totalCompras?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.totalCompra.length === 0) {
          alert("No se encontraron totales en esta compra");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showProductos = async (IdCompra) => {

    await this.setState({ open: true, query: IdCompra, IdCompra: IdCompra });
    console.log("query es", this.state.query);

    await this.getDatosCompra();
    await this.getListadoCompras();
    await this.getTotalCompras();
  }

  handleClose = async () => {

    await this.setState({ open: false });
    this.setState({ query: "", });
    this.getCompras();
  }

  onEntregadoChange = async (event) => {
    this.setState({ Entregado: event.target.value });
  };
  onPagadoChange = async (event) => {
    this.setState({ Pagado: event.target.value });
  };

  onObservacionChange = async (e) => {
    this.setState({ Observacion: e.target.value });
  };

  handleBorrarProducto = async (index) => {
    this.state.compraProductos.splice(index, 1);
    await this.setState({ compraProductos: this.state.compraProductos });
  };

  handleRemove = (IdCompra) => {

    let _this = this;
    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_API}compras/` + IdCompra,
      headers: {},
    };
    if (window.confirm("¿Realmente desea borrar esta compra?")) {
      axios(config)
        .then(function (response) {
          _this.getCompras();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  };

  onChangeDate = async (event) => {
    this.setState({ dateStart: event.target.value });
    this.setState({ dateEnd: event.target.value });
  };

  handleUpdate = (e) => {

    if (window.confirm("¿Realmente desea editar esta compra?")) {
      let _this = this;
      axios
        .put(`${process.env.REACT_APP_API}compras/`, {
          IdCompra: this.state.IdCompra,
          Entregado: this.state.Entregado,
          Pagado: this.state.Pagado,
          Observacion: this.state.Observacion,
        })
        .then(function (response) {
          _this.getCompras();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.getCompras();
      this.getListadoCompras();
      this.getTotalCompras();
    }



  };

  handleSearch = async (e) => {
    // Llamar a la función de búsqueda con las fechas seleccionadas
    //onSearch(startDate, endDate);
    //alert("BUSQUEDA POR FECHA");
    console.log(this.state.startDate, this.state.endDate)
    this.getCompras();
  };

  onChangeDateStart = async (date) => {
    
    let sqldate = new Date(date).toISOString().split('T')[0]+ ' 00:00:00';
   
    this.setState({ startDateMysql: sqldate, startDate: date });
    console.log("Date", sqldate)
  };
  onChangeDateEnd = async (date) => {
    let sqldate = new Date(date).toISOString().split('T')[0]+ ' 23:59:59';

    this.setState({ endDate: date, endDateMysql:sqldate });
    console.log("endDate", date)

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

              <Grid m={0} pt={1}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "column",
                  }}
                >
                  <div>
                    <h3>Búsqueda por fechas</h3>
                    <div>
                      <label>Desde:</label>
                      <DatePicker dateFormat="dd/M/yyyy" selected={this.state.startDate} onChange={(date) => this.onChangeDateStart(date)} />
                    </div>
                    <div>
                      <label>Hasta:</label>
                      <DatePicker dateFormat="dd/MM/yyyy" selected={this.state.endDate} onSelect={(date) => this.onChangeDateEnd(date)} />
                    </div>
                    <button onClick={this.handleSearch}>Buscar</button>
                  </div>
                </Paper>
              
              </Grid>
{/* 
              <Grid m={0} pt={1}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "column",
                  }}
                >
                  {/* BUSCADOR  
                  <div
                    component="form"
                    className="search"
                    onSubmit={this.handleClickSearch}
                  >
                    <input
                      type="text"
                      name="query"
                      placeholder={`Buscar...`}
                      className="searchTerm"
                      value={this.state.query}
                      onChange={this.handleChangeSearch}
                    />
                    <button
                      type="submit"
                      className="searchButton"
                      onClick={this.handleClickSearch}
                    >
                      Buscar
                    </button>
                  </div>
                </Paper>
              </Grid>
 */}
              <Grid m={0} pt={1}>
                <TableContainer component={Paper}>

                  <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table"  >
                    <TableHead>
                      <TableRow>
                        <TableCell bgcolor="pink" align="center">
                          <b>Número</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Fecha</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Usuario</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Proveedor</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Total</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Ver detalle</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Acciones</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>

                      {this.state.compras.map((item, index) => (

                        <TableRow
                          key={item.IdProducto}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}

                        >
                          <TableCell align="center" component="th" scope="row" >
                            {item.IdCompra}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row" format="date">
                            {item.Fecha}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {item.Nombre}
                          </TableCell>
                          <TableCell align="center">{item.RazonSocial}</TableCell>
                          <TableCell align="center">${item.Total}</TableCell>
                          <TableCell align="center">
                            <AddIcon
                              aria-label="expand row"
                              size="small"
                              key={item.IdCompra}
                              value={this.state.query}
                              onClick={() => {
                                this.showProductos(item.IdCompra);
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {/* <EditIcon
                              sx={{ color: pink[200] }}
                              onClick={() => {
                                this.handleUpdate(item.IdVenta);
                              }}
                            />*/}
                            <DeleteIcon
                              sx={{ color: pink[600] }}
                              align="center"
                              value
                              onClick={() => {
                                this.handleRemove(item.IdCompra);
                              }}
                            />
                          </TableCell>
                        </TableRow>

                      ))}
                      <TableRow>
                      </TableRow>
                      <Dialog
                        fullScreen
                        open={this.state.open}
                      >
                        <DialogTitle style={{ backgroundColor: "#f73378" }} >
                          <Typography
                            component="h1"
                            variant="h6"
                            color="white"
                            noWrap
                            sx={{ flexGrow: 1 }}
                          >DETALLE DE COMPRA
                          </Typography>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            {this.state.datosCompra.map((item) =>
                              <Box
                                sx={{
                                  width: 300,
                                  bgcolor: "background.paper",
                                }}
                              >
                                <br />
                                <Typography color="#000000" variant="p"> <b>Número de compra:</b> {item.IdCompra}
                                  <br />
                                  <b>Fecha:</b>  {item.Fecha}<br />
                                  <b> Usuario:</b>  {item.Nombre}<br />
                                  <b>Proveedor:</b>  {item.RazonSocial}<br />
                                </Typography>
                              </Box>)}

                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell bgcolor="pink"><b>Código</b></TableCell>
                                  <TableCell bgcolor="pink"><b>Descripcion</b></TableCell>
                                  <TableCell bgcolor="pink"><b>Marca</b></TableCell>
                                  <TableCell bgcolor="pink" align="right"><b>Cantidad</b></TableCell>
                                  <TableCell bgcolor="pink" align="right"><b>Precio</b></TableCell>
                                  <TableCell bgcolor="pink" align="right"><b>Subtotal</b></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {this.state.prodcompras.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.IdProducto}</TableCell>
                                    <TableCell component="th" scope="row">{item.Detalle}</TableCell>
                                    <TableCell>{item.Marca}</TableCell>
                                    <TableCell align="right">{item.cantidad}</TableCell>
                                    <TableCell align="right">${item.PrecioMenor}</TableCell>
                                    <TableCell align="right">${item.Precio}</TableCell>
                                  </TableRow>
                                ))}

                                {this.state.totalCompra.map((item) => (
                                  <TableRow key={item.IdVenta}>

                                    <TableCell bgcolor="pink" colSpan={5}><b>TOTAL</b></TableCell>
                                    <TableCell bgcolor="pink" align="right"><b>${item.Total}</b></TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button 
                          variant="contained" 
                          size="small" 
                          bgcolor="pink" 
                          onClick={this.handleUpdate}>
                            Guardar cambios
                          </Button>
                          <Button 
                          bgcolor="pink" 
                          onClick={this.handleClose}>
                            Cerrar
                            </Button>
                        </DialogActions>
                      </Dialog>
                    </TableBody>
                  </Table>
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

export default ListadoCompras;
