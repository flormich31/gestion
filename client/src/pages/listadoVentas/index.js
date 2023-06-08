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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mdTheme = createTheme();

class ListadoVentas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ventas: [],
      datosVenta: [],
      prodventas: [],
      productos: [],
      ventaProductos: [],
      vendedores: [],
      totalVenta: [],
      currentPage: null,
      totalPages: null,

      open: false,
      query: "",
      IdVenta: ' ',
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
      numeroVenta: "",
    };
  }

  componentDidMount() {
    this.getVentas();
    this.getDatosVenta();
    this.getListadoVentas();
    this.getTotalVentas();
  }

   getVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/ventas?query=${this.state.startDateMysql}&query2=${this.state.endDateMysql}`,
      headers: {},
    };
    axios(config)
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

  };
 

 /*  getVentas = () => {
    let _this = this;

    axios
      .get("http://localhost:9000/ventas", {
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

  getDatosVenta = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/datosVenta?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.datosVenta.length === 0) {
          alert("No se encontraron datos de venta");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  getListadoVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/listadoVentas?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.prodventas.length === 0) {
          alert("No se encontraron productos en esta venta");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getTotalVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/totalVentas?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.totalVenta.length === 0) {
          alert("No se encontraron Totales en esta venta");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showProductos = async (IdVenta) => {

    await this.setState({ open: true, query: IdVenta, IdVenta: IdVenta });
    console.log("query es", this.state.query);

    await this.getDatosVenta();
    await this.getListadoVentas();
    await this.getTotalVentas();
  }

  handleClose = async () => {

    await this.setState({ open: false });
    this.setState({ query: "", });
    this.getVentas();
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
    this.state.ventaProductos.splice(index, 1);
    await this.setState({ ventaProductos: this.state.ventaProductos });
  };

  handleRemove = (IdVenta) => {

    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/ventas/" + IdVenta,
      headers: {},
    };
    if (window.confirm("¿Realmente desea borrar esta venta?")) {
      axios(config)
        .then(function (response) {
          _this.getVentas();
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

    if (window.confirm("¿Realmente desea editar esta venta?")) {
      let _this = this;
      axios
        .put("http://localhost:9000/ventas/", {
          IdVenta: this.state.IdVenta,
          Entregado: this.state.Entregado,
          Pagado: this.state.Pagado,
          Observacion: this.state.Observacion,
        })
        .then(function (response) {
          _this.getVentas();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.getVentas();
      this.getListadoVentas();
      this.getTotalVentas();
    }



  };

  handleSearch = async (e) => {
    // Llamar a la función de búsqueda con las fechas seleccionadas
    //onSearch(startDate, endDate);
    //alert("BUSQUEDA POR FECHA");
    console.log(this.state.startDate, this.state.endDate)
    this.getVentas();
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
              height: "100vh",
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
                {/*  
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2023-05-01')} />
                    <DatePicker
                      label="Controlled picker"
                      value={this.state.dateEnd}
                      onChange={(event) => this.onChangeDate()}
                    />
                  </DemoContainer>
                </LocalizationProvider>
  */}
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
                          <b>Vendedor</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Cliente</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Forma de pago</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Total</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Ver detalle</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Entregado</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Pagado</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Observacion</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Descuento</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Acciones</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>

                      {this.state.ventas.map((item, index) => (

                        <TableRow
                          key={item.IdProducto}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}

                        >
                          <TableCell align="center" component="th" scope="row" >
                            {item.IdVenta}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row" format="date">
                            {item.Fecha}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {item.Nombre}
                          </TableCell>
                          <TableCell align="center">{item.Nombre_Cliente}</TableCell>
                          <TableCell align="center">{item.FormaPago}</TableCell>
                          <TableCell align="center">${item.Total}</TableCell>
                          <TableCell align="center">
                            <AddIcon
                              aria-label="expand row"
                              size="small"
                              key={item.IdVenta}
                              value={this.state.query}
                              onClick={() => {
                                this.showProductos(item.IdVenta);
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">{item.Entregado}</TableCell>
                          <TableCell align="center">{item.Pagado}</TableCell>
                          <TableCell align="center">{item.Observacion}</TableCell>
                          <TableCell align="center">{item.Descuento}</TableCell>
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
                                this.handleRemove(item.IdVenta);
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
                          >DETALLE DE VENTA
                          </Typography>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            {this.state.datosVenta.map((item) =>
                              <Box
                                sx={{
                                  width: 300,
                                  bgcolor: "background.paper",
                                }}
                              >
                                <br />
                                <Typography color="#000000" variant="p"> <b>Número de venta:</b> {item.IdVenta}
                                  <br />
                                  <b>Fecha:</b>  {item.Fecha}<br />
                                  <b> Vendedor:</b>  {item.Nombre}<br />
                                  <b>Cliente:</b>  {item.Nombre_Cliente}<br />
                                  <b>Forma de pago:</b>   {item.FormaPago}<br />
                                  <b>Entregado:</b>  <FormControl onSubmit={this.handleUpdate} size="small" >
                                    <NativeSelect
                                      size="small"
                                      placeholder='size="small"'
                                      value={this.state.Entregado}
                                      onChange={this.onEntregadoChange}
                                      inputProps={{
                                        id: "uncontrolled-native",
                                      }}
                                    >
                                      <option value={0}>{item.Entregado}</option>
                                      <option value={1}>Si</option>
                                      <option value={2}>No</option>
                                    </NativeSelect>
                                  </FormControl>
                                  <b>Pagado:</b> <FormControl onSubmit={this.handleUpdate} size="small">
                                    <NativeSelect
                                      size="small"
                                      placeholder='size="small"'
                                      value={this.state.Pagado}
                                      onChange={this.onPagadoChange}
                                      inputProps={{
                                        id: "uncontrolled-native",
                                      }}
                                    >
                                      <option value={0}>{item.Pagado}</option>
                                      <option value={1}>Si</option>
                                      <option value={2}>No</option>
                                    </NativeSelect>

                                  </FormControl>
                                  <b>Observacion: </b>
                                  <FormControl onSubmit={this.handleUpdate} variant="standard" size="small">
                                    <TextField
                                      size="small"
                                      placeholder='size="small"'
                                      id="Observacion"
                                      defaultValue={item.Observacion}
                                      onChange={this.onObservacionChange}
                                      autoComplete="on"
                                    />
                                  </FormControl>
                                  <br />      <br />
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
                                  <TableCell bgcolor="pink" align="right"><b>Descuento</b></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {this.state.prodventas.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.IdProducto}</TableCell>
                                    <TableCell component="th" scope="row">{item.Detalle}</TableCell>
                                    <TableCell>{item.Marca}</TableCell>
                                    <TableCell align="right">{item.cantidad}</TableCell>
                                    <TableCell align="right">${item.PrecioVenta}</TableCell>
                                    <TableCell align="right">${item.Subtotal}</TableCell>
                                    <TableCell align="right">{item.Descuento}</TableCell>
                                  </TableRow>
                                ))}

                                {this.state.totalVenta.map((item) => (
                                  <TableRow key={item.IdVenta}>

                                    <TableCell bgcolor="pink" colSpan={6}><b>TOTAL</b></TableCell>
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

export default ListadoVentas;
