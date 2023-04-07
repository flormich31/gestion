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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormHelperText from "@mui/material/FormHelperText";
import { Paper, Button, Typography } from "@mui/material";
import { Redirect } from "react-router";
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
import ButtonCreateProduct from "../../components/ButtonCreateProduct";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import OutlinedInput from "@mui/material/OutlinedInput";
import Modal from "@mui/material/Modal";
import Pagination from "../../components/Pagination";

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
      detalleedit: "",
      categoriaedit: "",
      IdCategoriaedit: "",
      marcaedit: "",
      IdMarcaedit: "",
      costoedit: "",
      razonsocialedit: "",
      IdProveedoredit: "",
    };
  }

  componentDidMount() {
    this.getProductos();
    this.getTodasCategorias();
    this.getTodasMarcas();
    this.getTodosProveedores();
  }

  onPageChanged = (data) => {
    // const { productos } = this.state;
    // const { currentPage, totalPages, pageLimit } = data;
    // const offset = (currentPage - 1) * pageLimit;
    // const currentProductos = productos.slice(offset, offset + pageLimit);
    // this.setState({ currentPage, currentProductos, totalPages });
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

  getTodasCategorias = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/categorias",
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
      url: "http://localhost:9000/marcas",
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

  handleChangeId = (event) => {
    console.log(event.target.value);
    this.setState({ id: event.target.value });
  };
  handleChangeDetalle = (event) => {
    this.setState({ detalle: event.target.value });
  };
  handleChangeCategoria = (event) => {
    this.setState({ IdCategoria: event.target.value });
  };
  handleChangeMarca = (event) => {
    this.setState({ IdMarca: event.target.value });
  };
  handleChangeCosto = (event) => {
    this.setState({ costo: event.target.value });
  };
  handleChangeProveedor = (event) => {
    this.setState({ IdProveedor: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let _this = this;

    axios
      .post("http://localhost:9000/productos", {
        id: this.state.id,
        detalle: this.state.detalle,
        IdCategoria: this.state.IdCategoria,
        IdMarca: this.state.IdMarca,
        costo: this.state.costo,
        IdProveedor: this.state.IdProveedor,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        _this.getProductos();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ id: "" });
    this.setState({ detalle: "" });
    this.setState({ costo: "" });
    this.setState({ IdCategoria: "" });
    this.setState({ IdMarca: "" });
    this.setState({ IdProveedor: "" });
  };

  //Para editar una categoria
  handleChangeEditId = (event) => {
    this.setState({ id: event.target.value });
  };
  handleChangeEditDetalle = (event) => {
    this.setState({ detalleedit: event.target.value });
  };
  handleChangeEditIdCategoria = (event) => {
    this.setState({ IdCategoriaedit: event.target.value });
  };
  handleChangeEditIdMarca = (event) => {
    this.setState({ IdMarcaedit: event.target.value });
  };
  handleChangeEditCosto = (event) => {
    this.setState({ costoedit: event.target.value });
  };
  handleChangeEditIdProveedor = (event) => {
    this.setState({ IdProveedoredit: event.target.value });
  };
  showModal = (
    IdProducto,
    Detalle,
    categoria,
    Categoria_Id,
    marca,
    Marca_Id,
    Costo,
    Proveedor_Id,
    RazonSocial,
    event
  ) => {
    this.setState({ open: true });
    this.setState({ idedit: IdProducto });
    this.setState({ detalleedit: Detalle });
    this.setState({ categoriaedit: categoria });
    this.setState({ IdCategoriaedit: Categoria_Id });
    this.setState({ IdMarcaedit: Marca_Id });
    this.setState({ marcaedit: marca });
    this.setState({ costoedit: Costo });
    this.setState({ IdProveedoredit: Proveedor_Id });
    this.setState({ razonsocialedit: RazonSocial });
  };

  // This is the put request
  handleEdit = (event) => {
    let _this = this;

    axios
      .put("http://localhost:9000/productos", {
        id: this.state.idedit,
        detalle: this.state.detalleedit,
        Categoria_Id: this.state.IdCategoriaedit,
        Marca_Id: this.state.IdMarcaedit,
        costo: this.state.costoedit,
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
    this.setState({ costo: "" });
    this.setState({ IdCategoria: "" });
    this.setState({ IdMarca: "" });
    this.setState({ IdProveedor: "" });
    this.setState({ open: false });
  };

  //Para buscar un producto

  handleChangeSearch = async (event) => {
    await this.setState({ query: event.target.value });
    console.log(this.state.query);
    this.getProductos();
  };
  handleClickSearch = (event) => {
    event.preventDefault();
    let _this = this;

    axios
      .get("http://localhost:9000/productos", {
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
      url: "http://localhost:9000/productos/" + IdProducto,
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
  redirectHandlerOpen = () => {
    this.setState({ redirect: true });
    this.renderRedirectOpen();
  };
  renderRedirectOpen = () => {
    if (this.state.redirect) {
      return <Redirect to="/productoNuevo" />;
    }
  };

  render() {
    const { productos, currentProductos, currentPage, totalPages } = this.state;
    const totalProductos = this.state.productos.length;

    if (totalProductos === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : "",
    ]
      .join(" ")
      .trim();

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
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {/* Editor de productos */}
                <Grid item xs={12}>
                  <Paper
                    elevation={23}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Editor de productos */}
                    <Typography variant="h8" component="div">
                      <b>Creador de productos</b>
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 0 }}>
                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 120 }}
                        onSubmit={this.handleSubmit}
                      >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="id"
                          label="ID del producto"
                          size="small"
                          value={this.state.id}
                          onChange={this.handleChangeId}
                        />
                      </FormControl>
                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 80 }}
                        onSubmit={this.handleSubmit}
                      >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="detalle"
                          label="Nombre del producto"
                          size="small"
                          value={this.state.detalle}
                          onChange={this.handleChangeDetalle}
                        />
                      </FormControl>
                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 80 }}
                        onSubmit={this.handleSubmit}
                      >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="costo"
                          label="Costo del producto"
                          size="small"
                          value={this.state.costo}
                          onChange={this.handleChangeCosto}
                        />
                      </FormControl>

                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 80 }}
                        size="small"
                        onSubmit={this.handleSubmit}
                      >
                        <FormHelperText>Categoria</FormHelperText>
                        <select
                          name="categorias"
                          value={this.state.IdCategoria}
                          onChange={this.handleChangeCategoria}
                        >
                          {this.state.categorias.map((item, index) => (
                            <option
                              key={item.IdCategoria}
                              value={item.IdCategoria}
                            >
                              {item.Categoria}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 80 }}
                        size="small"
                        onSubmit={this.handleSubmit}
                      >
                        <FormHelperText>Marca</FormHelperText>
                        <select
                          name="marcas"
                          value={this.state.IdMarca}
                          onChange={this.handleChangeMarca}
                        >
                          {this.state.marcas.map((item, index) => (
                            <option key={item.IdMarca} value={item.IdMarca}>
                              {item.Marca}
                            </option>
                          ))}
                        </select>
                      </FormControl>

                      <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 80 }}
                        size="small"
                        onSubmit={this.handleSubmit}
                      >
                        <FormHelperText>Proveedores</FormHelperText>
                        <select
                          name="proveedores"
                          value={this.state.IdProveedor}
                          onChange={this.handleChangeProveedor}
                          input={<OutlinedInput label="proveedores" />}
                        >
                          {this.state.proveedores.map((item, index) => (
                            <option
                              key={item.IdProveedor}
                              value={item.IdProveedor}
                            >
                              {item.RazonSocial}
                            </option>
                          ))}
                        </select>
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
                <ButtonCreateProduct />

                <Grid item xs={12}>
                  <Paper
                    component="form"
                    className="paper"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
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

                <Grid item xs={12} md={12} lg={12}>
                <div
                      align="center"
                      sx={{
                        p: 10,
                      }}
                    >
                      <Typography variant="body" component="div">
                        <b>{totalProductos} Productos</b>
                        <br />
                        {/* <b>Pagina:{currentPage}</b> */}
                        <b>{totalPages}</b>
                      </Typography>
                    </div>
                </Grid>
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
