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
import { Paper, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import Pagination from "../../components/Pagination";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
const mdTheme = createTheme();

class Productos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      categorias: [],
      marcas: [],
      proveedores: [],

      currentProductos: [],
      currentPage: null,
      totalPages: null,

      open: false,
      query: "",
      idedit: "",
      imagenNew: "test",
      imagen: "",
      imagePreview: "",
      imagenedit: "",
      imageneditURL: "",
      IdCategoria: "",
      IdProveedor: "68601",
      detalleedit: "",
      Observacion: "",
      Codigo: "",
      CodigoEdit: "",
      categoriaedit: "",
      IdCategoriaedit: "",
      marcaedit: "",
      IdMarcaedit: "",
      descuentoedit: "",
      costoedit: "",
      editPrecioMenor: "",
      editPrecioMayor: "",
      editObservacion: "",
      razonsocialedit: "",
      IdProveedoredit: "",

      page: 0,
      rowsPerPage: 25,
    };
  }

  componentDidMount() {
    this.getProductos();
    this.getTodasCategorias();
    this.getTodasMarcas();
    this.getTodosProveedores();
  }

  
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  };

  handleChangeRowsPerPage = async (event) => {
    await this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
  }

  getProductos = () => {
    let _this = this;
    const limit = String(this.state.query).trim() !== "" ? "" : "&limit=15";
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}productos?query=${this.state.query}${limit}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // if (response.data.productos.length === 0) {
        //   // alert("No se encontraron productos");
        // } else {
        //   _this.setState(response.data);
        // }
        _this.setState({ productos: response.data.productos || [] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getTodasCategorias = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}categorias`,
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
  getTodasMarcas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}marcas`,
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

  handleChangeId = (event) => {
    this.setState({ id: event.target.value });
  };
  handleChangeDetalle = (event) => {
    this.setState({ detalle: event.target.value });
  };
  handleChangeCategoria = (event) => {
    this.setState({ IdCategoria: event.target.value });
  };
  handleChangeObservacion = (event) => {
    this.setState({ Observacion: event.target.value });
  };
  handleChangeCodigo = (event) => {
    this.setState({ Codigo: event.target.value });
  };
  handleChangeMarca = (event) => {
    this.setState({ IdMarca: event.target.value });
  };
  handleChangeCosto = (event) => {
    this.setState({ costo: event.target.value });
  };
  handleChangePrecioMenor = (event) => {
    this.setState({ PrecioMenor: event.target.value });
  };
  handleChangePrecioMayor = (event) => {
    this.setState({ PrecioMayor: event.target.value });
  };
  handleChangeProveedor = (event) => {
    this.setState({ IdProveedor: event.target.value });
  };

  handleChangeDescuento = (event) => {
    this.setState({ Descuento: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let _this = this;

    /* function _preventUndefined(value) {
      return value === "" || value === "undefined" || !value ? "68601" : value; 
    } */
    axios
      .post(`${process.env.REACT_APP_API}productos`, {
        id: this.state.id,
        ImagenURL: this.state.imagenNew,
        detalle: this.state.detalle,
        Codigo: this.state.Codigo,
        IdCategoria: this.state.IdCategoria,
        IdMarca: this.state.IdMarca,
        //costo: this.state.costo,
        // Descuento: this.state.Descuento === "" ? "0" : this.state.Descuento,
        PrecioMenor: this.state.PrecioMenor === undefined ? "0" : this.state.PrecioMenor,
        // PrecioMayor: this.state.PrecioMayor,
        //  Observacion: this.state.Observacion,
        // IdProveedor: this.state.IdProveedor  === "" ? "68601" : this.state.IdProveedor,
        IdProveedor: "68601",

      })
      .then((res) => {
        console.log('proveedor', this.state.IdProveedor)
        console.log(res);
        console.log(res.data);
        // console.log(JSON.stringify(response.data));
        if (res.data.productos.length === 0) {
          alert("No se encontraron productos, complete los campos: ");
        } else {
          _this.getProductos();
          // alert("Producto agregado exitosamente");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Asegurese de completar los campos: Descripcion - Precio - Categoria - Marca - Proveedor")
      })

    const formData = new FormData();
    formData.append('file', this.state.imagenedit);
    console.log('imagen uploadcarpeta', this.state.imagenedit)

    axios.post(`${process.env.REACT_APP_API}upload`, formData)
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response);
      })
      .catch(error => {
        // Manejar errores
        console.log(error);
      });

  };

  //Para editar un producto

  handleChangeEditDetalle = (event) => {
    this.setState({ detalleedit: event.target.value });
  };
  handleChangeEditCodigo = (event) => {
    this.setState({ CodigoEdit: event.target.value });
  };
  handleChangeImagen = async (event) => {

    let file = event.target.files[0];

    if (file) {
      let reader = new FileReader();
      let ar = URL.createObjectURL(event.target.files[0])

      reader.onloadend = async () => {
        await this.setState({ imagePreview: [URL.createObjectURL(event.target.files[0])] });
        await this.setState({ imagenNew: event.target.files[0].name });
      };

      reader.readAsDataURL(file);
    }

    let filename = event.target.files[0].name;

    console.log("Nombre del archivo:", file);
    console.log("Nombre del archivo nuevo:", filename);

    this.setState(() => ({ imagenedit: file }));

    await this.setState({ imagenNew: event.target.files[0].name });

    console.log("imagenedit", this.state.imagenedit);
    console.log("imagen nueva", this.state.imagenNew);

  };
  handleChangeEditIdCategoria = (event) => {
    this.setState({ IdCategoriaedit: event.target.value });
    console.log(`handleChangeEditIdCategoria: ${event.target.value}`)
  };
  handleChangeEditIdMarca = (event) => {
    this.setState({ IdMarcaedit: event.target.value });
  };
  handleChangeEditDescuento = (event) => {
    this.setState({ descuentoedit: event.target.value });
  };
  handleChangeEditCosto = (event) => {
    this.setState({ costoedit: event.target.value });
  };
  handleChangeEditPrecioMenor = (event) => {
    this.setState({ editPrecioMenor: event.target.value });
  };
  handleChangeEditPrecioMayor = (event) => {
    this.setState({ editPrecioMayor: event.target.value });
  };
  handleChangeEditObservacion = (event) => {
    this.setState({ editObservacion: event.target.value });
  };
  handleChangeEditIdProveedor = (event) => {
    this.setState({ IdProveedoredit: event.target.value });
  };
  showModal = (
    IdProducto,
    Detalle,
    Codigo,
    categoria,
    Categoria_Id,
    marca,
    Marca_Id,
    Descuento,
    Costo,
    PrecioMenor,
    PrecioMayor,
    Observacion,
    Proveedor_Id,
    RazonSocial,
    ImagenURL,
    event
  ) => {
    this.setState({ open: true });
    this.setState({ idedit: IdProducto });
    this.setState({ detalleedit: Detalle });
    this.setState({ CodigoEdit: Codigo });
    this.setState({ imagen: ImagenURL });
    this.setState({ categoriaedit: categoria });
    this.setState({ IdCategoriaedit: Categoria_Id });
    this.setState({ IdMarcaedit: Marca_Id });
    this.setState({ marcaedit: marca });
    this.setState({ descuentoedit: Descuento });
    this.setState({ costoedit: Costo });
    this.setState({ editPrecioMenor: PrecioMenor });
    this.setState({ editPrecioMayor: PrecioMayor });
    this.setState({ editObservacion: Observacion });
    this.setState({ IdProveedoredit: Proveedor_Id });
    this.setState({ razonsocialedit: RazonSocial });
  };

  //Editar imagen 
  handleEditImagen = (event) => {
    let _this = this;

    let imagen = this.state.imagenNew;
    console.log("imagen", imagen);
    if (imagen === '') {
      alert("No se ha seleccionado una nueva imagen");
      console.log("No se ha seleccionado una nueva imagen");
    }
    else {
      axios
        .put(`${process.env.REACT_APP_API}imagenes`, {
          id: this.state.idedit,
          ImagenURL: this.state.imagenNew,
        })
        .then(function (response) {
          _this.getProductos();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      const formData = new FormData();
      formData.append('file', this.state.imagenedit);
      console.log('imageneditURL', this.state.imagenedit);

      axios.post(`${process.env.REACT_APP_API}upload`, formData)
        .then(response => {
          // Manejar la respuesta del servidor
          console.log(response);
        })
        .catch(error => {
          // Manejar errores
          console.log(error);
        });
    }
  };

  // This is the put request
  handleEdit = (event) => {
    let _this = this;

    axios
      .put(`${process.env.REACT_APP_API}productos`, {
        id: this.state.idedit,
        detalle: this.state.detalleedit,
        Codigo: this.state.CodigoEdit,
        Categoria_Id: this.state.IdCategoriaedit,
        Marca_Id: this.state.IdMarcaedit,
        Descuento: this.state.descuentoedit === "" || "undefined" ? "0" : this.state.Descuento,
        costo: this.state.costoedit,
        PrecioMenor: this.state.editPrecioMenor,
        PrecioMayor: this.state.editPrecioMayor,
        Observacion: this.state.editObservacion,
        Proveedor_Id: this.state.IdProveedoredit,
      })
      .then(function (response) {
        _this.getProductos();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ id: "" });
    this.setState({ detalle: "" });
    this.setState({ Descuento: "" });
    this.setState({ costo: "" });
    this.setState({ PrecioMenor: "" });
    this.setState({ PrecioMayor: "" });
    this.setState({ IdCategoria: "" });
    this.setState({ IdMarca: "" });
    this.setState({ IdProveedor: "" });
    this.setState({ open: false });

  };

  //Para buscar un producto

  handleChangeSearch = async (event) => {
    console.log(`event.target.value: ${event.target.value}`)

    await this.setState({ query: event.target.value });
    if (String(event.target.value).trim() === "" || String(event.target.value).trim().length < 2) {
      return true;
    }
    this.getProductos();
  };
  handleClickSearch = (event) => {
    event.preventDefault();
    let _this = this;

    axios
      .get(`${process.env.REACT_APP_API}productos`, {
        query: this.state.query,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRemove = (IdProducto) => {
    let _this = this;
    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_API}productos/` + IdProducto,
      headers: {},
    };
    if (window.confirm("¿Realmente desea borrar este producto?")) {
      axios(config)
        .then(function (response) {
          _this.getProductos();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };


  render() {
    const { productos, currentProductos, currentPage, totalPages } = this.state;
    const totalProductos = this.state.productos.length;

   
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
                        <Typography variant="h6" component="div" >
                          Agregar nuevo producto
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item xs container direction="column">

                        <Grid item xs>
                          <FormControl
                            variant="standard"
                            onSubmit={this.handleSubmit}

                          >
                            <TextField
                              id="standard-read-only-input"
                              value={this.state.detalle}
                              onChange={this.handleChangeDetalle}
                              label="Descripcion del producto"
                              variant="standard"
                              required
                            />
                          </FormControl>
                        </Grid>
                      
                        <Grid item xs>
                          <FormControl
                            variant="standard"
                            onSubmit={this.handleEdit}

                          >
                            <TextField
                              id="standard-basic"
                              label="Código de barras"
                              variant="standard"
                              value={this.state.Codigo}
                              onChange={this.handleChangeCodigo}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs>
                        
                        </Grid>

                      </Grid>

                      <Grid item xs container direction="column">
                        <Grid item xs>
                          <FormControl
                            variant="standard"
                            onSubmit={this.handleSubmit}
                          >
                            <TextField
                              id="standard-read-only-input"
                              value={this.state.PrecioMenor}
                              onChange={this.handleChangePrecioMenor}
                              label="Precio del producto"
                              variant="standard"
                              required
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs>
                          <FormControl
                            variant="standard"
                            onSubmit={this.handleSubmit}
                            nmethod="post"
                          >
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"

                            >
                              Categoria
                            </InputLabel>
                            <NativeSelect
                              //input={<OutlinedInput id="select-multiple-chip" label="clientes" />}
                              required
                              value={this.state.IdCategoria}
                              onChange={this.handleChangeCategoria}
                              inputProps={{
                                id: "uncontrolled-native",
                              }}
                            >
                              {this.state.categorias.map((item, index) => (
                                <option
                                  key={item.IdCategoria}
                                  value={item.IdCategoria}
                                >
                                  {item.Categoria}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid item xs container direction="column">
                        <Grid item xs>
                          <FormControl
                            variant="standard"
                            onSubmit={this.handleSubmit}
                          >
                            <InputLabel
                              variant="standard"
                              htmlFor="uncontrolled-native"
                              required
                            >
                              Marca
                            </InputLabel>
                            <NativeSelect
                              value={this.state.IdMarca}
                              onChange={this.handleChangeMarca}
                              inputProps={{
                                id: "uncontrolled-native",
                              }}
                            >
                              {this.state.marcas.map((item, index) => (
                                <option key={item.IdMarca} value={item.IdMarca}>
                                  {item.Marca}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </Grid>

                        <Grid item xs>

                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"

                            required
                          >
                            Proveedor
                          </InputLabel>
                          <NativeSelect
                            value={this.state.IdProveedor}
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
                          <FormControl
                            onSubmit={this.handleSubmit}
                            variant="standard"
                          >

                            <input type="file" accept="image/*"
                              onChange={this.handleChangeImagen} />
                            <img src={this.state.imagePreview}
                              height="100px" width="100px"
                              value={this.state.imagenedit}
                              onChange={this.handleChangeImagen}
                              onError={e => e.target.style.display = 'none'}
                            />

                          </FormControl>
                        </Grid>
                        <Grid item xs>
                          <Button
                            type="button"
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                            onClick={this.handleSubmit}
                          >
                            {"Guardar"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>


              <Grid m={0} pt={1}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "column",
                  }}
                >
                  {/* BUSCADOR */}
                  <div
                    component="form"
                    className="search"
                    onSubmit={this.handleClickSearch}
                  >
                    <input
                      type="text"
                      name="query"
                      placeholder={`Buscar por codigo o nombre del producto...`}
                      className="searchTerm"
                      value={this.state.query}
                      onChange={this.handleChangeSearch}
                    />
                    {/* <button
                      type="submit"
                      className="searchButton"
                      onClick={this.handleClickSearch}
                    >
                      Buscar
                    </button> */}
                  </div>
                </Paper>
              </Grid>

              <Grid m={0} pt={1}>
                <TableContainer component={Paper}>
                  <div
                    align="center"
                    sx={{
                      p: 10,
                      overflow: "auto",
                    }}
                  >
                   
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={this.state.productos.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
                  </div>
                  <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                    <TableHead>
                      <TableRow >
                        <TableCell bgcolor="pink" align="center" >
                          <b>Cod</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center"  >
                          <b>Imagen</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Descripcion</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center" >
                          <b>Stock</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="center">
                          <b>Marca</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right" >
                          <b>Categoria</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>P.Menor</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>Prov</b>
                        </TableCell>
                        <TableCell bgcolor="pink" align="right">
                          <b>+</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {this.state.productos.map((item, index) => ( */}
                      {(this.state.rowsPerPage > 0
                        ? this.state.productos.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.state.productos
                      ).map((row) => (
                        <TableRow
                          key={row.IdProducto}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" component="th" scope="row">
                            {row.IdProducto}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <img src={row.ImagenURL} width="80px" onError={e => e.target.style.display = 'none'} />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.Detalle}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.Stock}
                          </TableCell>
                          <TableCell align="right">{row.marca}</TableCell>
                          <TableCell align="right">
                            {row.categoria}
                          </TableCell>
                          <TableCell align="right">${row.PrecioMenor}</TableCell>
                          <TableCell align="right">
                            {row.RazonSocial}
                          </TableCell>
                          <TableCell align="right">
                            <EditIcon
                              sx={{ color: pink[200] }}
                              key={row.IdProducto}
                              value={this.state.idedit}
                              onClick={() => {
                                this.showModal(
                                  row.IdProducto,
                                  row.Detalle,
                                  row.Codigo,
                                  row.categoria,
                                  row.Categoria_Id,
                                  row.marca,
                                  row.Marca_Id,
                                  row.Descuento,
                                  row.Costo,
                                  row.PrecioMenor,
                                  row.PrecioMayor,
                                  row.Observacion,
                                  row.Proveedor_Id,
                                  row.RazonSocial,
                                  row.ImagenURL
                                );
                              }}
                            />
                            <DeleteIcon
                              sx={{ color: pink[600] }}
                              align="left"
                              onClick={() => {
                                this.handleRemove(row.IdProducto);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* EDITOR */}

                      <Modal open={this.state.open} onClose={this.hideModal}>
                        <Box m={1}
                          sx={{
                            maxHeight: "85%",
                            overflowY: "auto",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 500,
                            bgcolor: "background.paper",
                            border: "2px solid #<000",
                            boxShadow: 24,
                            margin: "5px",
                            p: 2,
                          }}
                        >
                          {/* <CancelIcon/> */}
                          <Typography
                            id="modal-modal-description"
                            sx={{ margin: "5px" }}
                          >
                          </Typography>


                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            <b>Editar producto: {this.state.idedit}</b>
                          </Typography>
                          <FormControl
                            onSubmit={this.handleEditImagen}
                            variant="standard"
                            margin="dense"
                            fullWidth
                          >

                            <img src={this.state.imagen}
                              height="80px" width="80px" value={this.state.imagenNew}
                              onChange={this.handleChangeImagen} />

                            <input type="file" id="file"
                              name="image" accept="image/*" capture="user" onChange={this.handleChangeImagen} />

                          </FormControl>
                          <Button
                            variant="outlined"

                            color="success"
                            size="small"
                            onClick={this.handleEditImagen}
                          >
                            Editar imagen
                          </Button>


                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            <b>Datos</b>
                          </Typography>
                          <FormControl
                            variant="standard"
                            onSubmit={this.handleEdit}
                            fullWidth
                          >
                            <TextField
                              label="Producto"
                              id="detalleedit"
                              size="small"
                              margin="dense"
                              value={this.state.detalleedit}
                              onChange={this.handleChangeEditDetalle}
                              inputProps={{ style: { fontSize: 12 } }}

                            />
                          </FormControl>

                          <FormControl
                            variant="standard"
                            onSubmit={this.handleEdit}
                            fullWidth

                          >
                            <TextField
                              label="Codigo de barras"
                              id="Codigo"
                              size="small"
                              margin="dense"
                              value={this.state.CodigoEdit}
                              onChange={this.handleChangeEditCodigo}
                              inputProps={{ style: { fontSize: 12 } }}
                            />
                          </FormControl>

                          <FormControl
                            variant="standard"
                            onSubmit={this.handleEdit}
                            margin="dense"
                          >
                            <TextField
                              label="Precio"
                              id="Precio"
                              size="small"

                              value={this.state.editPrecioMenor}
                              onChange={this.handleChangeEditPrecioMenor}
                              inputProps={{ style: { fontSize: 12 } }}
                            />
                          </FormControl>

                          <FormControl size="small" margin="dense">
                            <InputLabel id="edit-select-categoria-label">
                              Categoría
                            </InputLabel>
                            <Select
                              value={this.state.IdCategoriaedit}
                              label="Categoría"
                              onChange={this.handleChangeEditIdCategoria}
                            >
                              {this.state.categorias.map((item, index) => (
                                <MenuItem
                                  key={item.IdCategoria}
                                  value={item.IdCategoria}
                                >
                                  {item.Categoria}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl size="small" margin="dense">
                            <InputLabel >
                              Marca
                            </InputLabel>
                            <Select
                              value={this.state.IdMarcaedit}
                              label="Marca"
                              onChange={this.handleChangeEditIdMarca}
                              style={{ marginRight: 11 }}
                            >
                              {this.state.marcas.map((item, index) => (
                                <MenuItem
                                  key={item.IdMarca}
                                  value={item.IdMarca}
                                >
                                  {item.Marca}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl size="small" margin="dense">
                            <InputLabel >
                              Proveedor
                            </InputLabel>
                            <Select
                              label="Proveedor"
                              value={this.state.IdProveedoredit}
                              onChange={this.handleChangeEditIdProveedor}
                            >
                              {this.state.proveedores.map((item, index) => (
                                <MenuItem
                                  key={item.IdProveedor}
                                  value={item.IdProveedor}
                                >
                                  {item.RazonSocial}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <Stack direction="row" spacing={2} alignItems="center"
                          >
                            <Button
                              variant="contained"

                              color="success"
                              size="small"
                              onClick={this.handleEdit}
                            >
                              EDITAR
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                              onClick={() => {
                                this.setState({ open: false });
                              }}
                            >
                              CANCELAR
                            </Button>
                          </Stack>
                        </Box>
                      </Modal>
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={this.state.productos.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
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

export default Productos;