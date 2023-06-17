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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Pagination from '../../components/Pagination';


const mdTheme = createTheme();


class Proveedores extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      proveedores: [],

      currentProveedores: [],
      currentPage: null,
      totalPages: null,

      open: false,
      query: '',
      idedit: '',
      nombredit: '',
      domicilioedit: '',
      webedit: '',
    };
  }

  componentDidMount() {
    this.getProveedores();
  }

  onPageChanged = data => {
    const { proveedores } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentProveedores = proveedores.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProveedores, totalPages });
  };

  getProveedores = () => {
    let _this = this;
        var config = {
            method: "get",
            url: `${process.env.REACT_APP_API}proveedores?query=${this.state.query}`,
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

    axios.post(`${process.env.REACT_APP_API}proveedores`, {
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

  //Para editar un cliente
  showModal = (IdProveedor, RazonSocial, Domicilio, Web) => {
    this.setState({ open: true })
    this.setState({ idedit: IdProveedor });
    this.setState({ nombredit: RazonSocial });
    this.setState({ domicilioedit: Domicilio });
    this.setState({ webedit: Web });
    console.log(IdProveedor);
    console.log(this.state.idedit);
    console.log(this.state.nombredit);
  }

  //Para editar un cliente
  handleChangeIdE = event => {
    this.setState({ idedit: event.target.value });
  }
  handleChangeNombreE = event => {
    this.setState({ nombredit: event.target.value });
  }
  handleChangeDomicilioE = event => {
    this.setState({ domicilioedit: event.target.value });
  }
  handleChangeWebE = event => {
    this.setState({ webedit: event.target.value });
  }

  // This is the put request
  handleEdit = event => {
    let _this = this;

    axios.put(`${process.env.REACT_APP_API}proveedores`, {
      id: this.state.idedit,
      razonSocial: this.state.nombredit,
      domicilio: this.state.domicilioedit,
      web: this.state.webedit,
    })
      .then(function (response) {
        _this.getProveedores();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ idedit: "" });
    this.setState({ nombredit: "" });
    this.setState({ domicilioedit: "" });
    this.setState({ webedit: "" });
    this.setState({ open: false });
  }

//Para buscar una proveedores

handleChangeSearch = async event => {
  await this.setState({ query: event.target.value });
  console.log(this.state.query);
  this.getProveedores();
}
handleClickSearch = (event) => {
  event.preventDefault();
  let _this = this;

  axios.get(`${process.env.REACT_APP_API}proveedores`, {
      query: this.state.query,
  })
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      });
}

  //Borrar cliente
  handleRemove = (IdProveedor) => {
    let _this = this;
    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_API}proveedores/` + IdProveedor,
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

    const {
      proveedores,
      currentProveedores,
      currentPage,
      totalPages
    } = this.state;
    const totalProveedores = this.state.proveedores.length;

    if (totalProveedores === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
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

              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                {/* Editor de proveedores */}
                <Grid item xs={12} >
                  <Paper elevation={2}
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",

                    }}>
                    {/* Editor de proveedores */}
                    <Typography variant="h8" component="div">
                      <b>Crear nuevo proveedor</b>
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>

                      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onSubmit={this.handleSubmit} >
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

               {/* BUSCADOR */}
               <Grid item xs={12}  >
                                    <Paper
                                        component="form" class="paper"
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 1040 }
                                        }
                                    >
                     <div component="form" class="search" onSubmit={this.handleClickSearch}>
                                            <input
                                                type="text"
                                                name="query"
                                                placeholder={`Buscar proveedor...`}
                                                class="searchTerm"
                                                value={this.state.query}
                                                onChange={this.handleChangeSearch}
                                            />
                                            <button type="submit"
                                                class="searchButton"
                                                onClick={this.handleClickSearch}

                                            >
                                                Buscar
                                            </button>
                                        </div>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
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
                            <TableCell align="right">
                              <EditIcon
                                sx={{ color: pink[200] }}
                                key={item.IdProveedor}
                                value={this.state.IdProveedor}
                                onClick={() => { this.showModal(item.IdProveedor, item.RazonSocial, item.Domicilio, item.Web); }}
                              />
                              <DeleteIcon
                                sx={{ color: pink[600] }}
                                onClick={() => {
                                  this.handleRemove(item.IdProveedor);
                                }} /></TableCell>

                          </TableRow>
                        ))}
                        <Modal open={this.state.open} onClose={this.hideModal}>
                          <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #<000',
                            boxShadow: 24,
                            p: 4,
                          }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              <b>Editor de proveedores</b>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              Codigo: {this.state.idedit}
                            </Typography>

                            <FormControl variant="standard" onSubmit={this.handleEdit}>
                              <TextField
                                id="nombredit"
                                label="Nombre"
                                size="small"
                                margin="normal"
                                value={this.state.nombredit}
                                onChange={this.handleChangeNombreE}
                              />
                            </FormControl>
                            <FormControl variant="standard" onSubmit={this.handleEdit}>
                              <TextField
                                id="domicilioedit"
                                label="Domicilio"
                                size="small"
                                margin="normal"
                                value={this.state.domicilioedit}
                                onChange={this.handleChangeDomicilioE}
                              />
                            </FormControl>
                            <FormControl variant="standard" onSubmit={this.handleEdit}>
                              <TextField
                                id="WebEdit"
                                label="Sitio Web"
                                size="small"
                                margin="normal"
                                value={this.state.webedit}
                                onChange={this.handleChangeWebE}
                              />
                            </FormControl>
                            <Button
                              sx={{ mt: 2, left: '5%', }}
                              margin variant="contained"
                              onClick={this.handleEdit}>
                                EDITAR
                            </Button>
                            <Button
                              sx={{ mt: 2, left: '30%', }}
                              variant="outlined"
                              color="error"
                              onClick={() => { this.setState({ open: false }); }}>CANCELAR</Button>
                          </Box>

                        </Modal>
                      </TableBody>
                    </Table>
                    <div className="container mb-5">
                      <div className="textPag ">
                        <b>{totalProveedores}</b> {" "} Proveedores
                        {currentPage && (
                          <span> {" "} <b>|</b>{" "} Pagina {" "}
                            <span><b>{currentPage}</b></span><b>/</b>
                            <span><b>{totalPages}</b></span>
                          </span>
                        )}
                      </div>
                      {/* <div>
                    <Pagination
                      totalRecords={totalProveedores}
                      pageLimit={10}
                      pageNeighbours={1}
                      onPageChanged={this.onPageChanged}
                    />
                    
                    </div> */}
                    </div>
                  </TableContainer>
                 
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

export default Proveedores;

