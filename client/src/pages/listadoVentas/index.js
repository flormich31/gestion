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

const mdTheme = createTheme();

class ListadoVentas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ventas: [],
      prodventas: [],
      productos: [],
      ventaProductos: [],
      vendedores: [],
      totalVenta:  [],
      currentPage: null,
      totalPages: null,

      open: false,
      query: "",
      IdVendedor: ' ',
      IdFormaPago: ' ',
      Entregado: ' ',
      Pagado: ' ',
      Descuento: ' ',
      
      Cliente_Id: "",
      Observacion: ' ',
      formaPago: [],
      clientes: [],
      numeroVenta: "",
    };
  }

  componentDidMount() {
    this.getVentas();
    this.getDetalleVentas();
    this.getTotalVentas();
  }

  getVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/ventas?query=${this.state.query}`,
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


  handleClose = async () => {

    await this.setState({ open: false });
    this.setState({ query:""});
    //this.setState({ });
    //console.log("query es", this.state.query);
    //console.log(IdVenta);
    this.getVentas();
  }

getDetalleVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `http://localhost:9000/detalleVentas?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
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
        // console.log(JSON.stringify(response.data));
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

      await this.setState({ open: true, query: IdVenta });
      //this.setState({ });
      console.log("query es", this.state.query);
      //console.log(IdVenta);}
      this.getVentas();
      this.getDetalleVentas();
      this.getTotalVentas();
    }

    handleChangeEntregado = async (event) => {
      this.setState({ Entregado: event.target.value });
    };

  handleBorrarProducto = async (index) => {
    this.state.ventaProductos.splice(index, 1);
    await this.setState({ ventaProductos: this.state.ventaProductos });
  };

  handleRemove = (IdVenta) => {
    
    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/listadoVentas/" + IdVenta,
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
               
              </Grid>

              <Grid m={0} pt={1}>
                <TableContainer component={Paper}>
                 
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>

                        <TableCell bgcolor="pink">
                          <b>N° de venta</b>
                        </TableCell>
                        <TableCell bgcolor="pink">
                          <b>Fecha</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Vendedor</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Cliente</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Forma de pago</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Total</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Productos</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Entregado</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Pagado</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Observacion</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Descuento</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
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
                          <TableCell align="left" component="th" scope="row">
                            {item.IdVenta}
                          </TableCell>
                          <TableCell component="th" scope="row" format="date">
                            {item.Fecha}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.Nombre}
                          </TableCell>
                          <TableCell align="right">{item.Nombre_Cliente}</TableCell>
                          <TableCell align="right">{item.FormaPago}</TableCell>
                          <TableCell align="right">{item.Total}</TableCell>
                          <TableCell align="right">
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
                          <TableCell align="right">
                            <FormControl fullWidth sx={{ m: 1 }} size="small">
                         <NativeSelect
                             value={this.state.Entregado}
                             onChange={this.handleChangeEntregado}
                             inputProps={{
                               id: "uncontrolled-native",
                             }}
                           >
                             <option value={0}>{item.Entregado}</option>
                              <option value={1}>Si</option>
                              <option value={2}>No</option>
                           </NativeSelect>
                           
                       </FormControl>
                             {/* {item.Entregado} */}
                          </TableCell>
                          <TableCell align="right">
                          <FormControl fullWidth sx={{ m: 1 }} size="small">
                         <NativeSelect
                             value={this.state.Pagado}
                             onChange={this.handleChangeEntregado}
                             inputProps={{
                               id: "uncontrolled-native",
                             }}
                           >
                             <option value={0}>{item.Pagado}</option>
                              <option value={1}>Si</option>
                              <option value={2}>No</option>
                           </NativeSelect>
                           
                       </FormControl>
                            
                            </TableCell>
                          <TableCell align="right">{item.Observacion}</TableCell>
                          <TableCell align="right">{item.Descuento}</TableCell>
                          <TableCell align="right">
                            <EditIcon
                              sx={{ color: pink[200] }}
                            />

                            <DeleteIcon
                              sx={{ color: pink[600] }}
                              align="left"
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
                        <DialogTitle >DETALLE DE VENTA</DialogTitle>
                        <DialogContent >
                          <DialogContentText
                           >
                            {this.state.ventas.map((item) => 
                             <Typography> Número de venta: {item.IdVenta}
                              <br />

                              Fecha: {item.Fecha}<br />
                              Vendedor: {item.Nombre}<br />
                              Cliente: {item.Nombre_Cliente}<br />
                              Forma de pago: {item.FormaPago}<br />
                              Entregado: {item.Entregado}<br />
                              Pagado: {item.Pagado}<br />
                              Observaciones: {item.Observacion}<br />
                              </Typography>)}

                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell bgcolor="pink">Código</TableCell>
                                  <TableCell bgcolor="pink">Descripcion</TableCell>
                                  <TableCell bgcolor="pink">Marca</TableCell>
                                  <TableCell bgcolor="pink" align="right">Cantidad</TableCell>
                                  <TableCell bgcolor="pink" align="right">Precio</TableCell>
                                  <TableCell bgcolor="pink" align="right">Subtotal</TableCell>
                                  <TableCell bgcolor="pink" align="right">Descuento</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {this.state.prodventas.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.IdProducto}</TableCell>
                                    <TableCell component="th" scope="row">{item.Detalle}</TableCell>
                                    <TableCell>{item.Marca}</TableCell>
                                    <TableCell align="right">{item.cantidad}</TableCell>
                                    <TableCell align="right">{item.PrecioVenta}</TableCell>
                                    <TableCell align="right">{item.Subtotal}</TableCell>
                                    <TableCell align="right">{item.Descuento}</TableCell>
                                  </TableRow>
                                ))}

                                {this.state.totalVenta.map((item) => (
                                  <TableRow key={item.IdVenta}>
                                   
                                    <TableCell bgcolor="pink" colSpan={6}>TOTAL</TableCell>
                                    <TableCell bgcolor="pink" align="right">{item.Total}</TableCell>
                                  </TableRow>
                                ))} 
                              </TableBody>
                            </Table>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button bgcolor="pink" onClick={this.handleClose}>Cerrar</Button>
                        </DialogActions>
                      </Dialog>



                      {/* <Modal open={this.state.open} >

                        <Box sx={{
                          position: 'absolute',

                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: 'background.paper',
                          border: '2px solid #<000',
                          boxShadow: 24,
                          p: 4,
                        }}>
                          <div>


                            {this.state.prodventas.map((item) => <p> DETALLE DE VENTA N°{item.IdVenta}
                              <br /> Datos:  <br />
                              Fecha:{item.Fecha}<br />
                              Vendedor:{item.Nombre}<br />
                              Cliente:{item.Nombre_Cliente}<br />
                              Forma de pago:{item.FormaPago}<br />
                              Entregado:{item.Entregado}<br />
                              Pagado:{item.Pagado}<br />
                              Observaciones:{item.Observacion}<br />
                            </p>)}

                          </div>

                          

                        </Box>

                      </Modal> */}
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
