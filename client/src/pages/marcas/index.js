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
import {
  Paper,
  Button,
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


class Marcas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      marcas: [],

      currentMarcas: [],
      currentPage: null,
      totalPages: null,

      open: false,
      query: '',
      idedit: '',
      marcaedit: '',
    };
  }

  componentDidMount() {
    this.getMarcas();
  }

  onPageChanged = data => {
    const { marcas } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentMarcas = marcas.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentMarcas, totalPages });
  };

  getMarcas = () => {
    let _this = this;
         var config = {
            method: "get",
            url: `http://localhost:9000/marcas?query=${this.state.query}`,
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

  handleChangeId = event => {
    console.log(event.target.value);
    this.setState({ id: event.target.value });
    console.log(event.target.value);
  }
  handleChangeMarca = event => {
    this.setState({ marca: event.target.value });
  }
  //Para editar una marca

  handleChangeEditMarca = event => {
    this.setState({ marcaedit: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    let _this = this;

    axios.post("http://localhost:9000/marcas", {
      marca: this.state.marca,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        _this.getMarcas();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ marca: "" });
  }
  //Mostrar ventana editar
  showModal = (IdMarca, Marca, event) => {
    this.setState({ open: true })
    this.setState({ idedit: IdMarca });
    this.setState({ marcaedit: Marca });
    console.log(IdMarca);
    console.log(this.state.idedit);
    console.log(this.state.marcaedit);
  }


  // This is the put request
  handleEdit = event => {
    let _this = this;

    axios.put("http://localhost:9000/marcas", {
      id: this.state.idedit,
      marca: this.state.marcaedit,
    })
      .then(function (response) {
        _this.getMarcas();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ idedit: "" });
    this.setState({ marcaedit: "" });
    this.setState({ open: false });
  }

 //Para buscar una categoria

 handleChangeSearch = async event => {
  await this.setState({ query: event.target.value });
  console.log(this.state.query);
  this.getMarcas();
}
handleClickSearch = (event) => {
  event.preventDefault();
  let _this = this;

  axios.get("http://localhost:9000/marcas", {
      query: this.state.query,
  })
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      });
}


  handleRemove = (IdMarca) => {
    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/marcas/" + IdMarca,
      headers: {},
    };
    if (window.confirm("¿Realmente desea borrar esta marca?")) {
      axios(config)
        .then(function (response) {
          _this.getMarcas();
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
      return <Redirect to="/productoNuevo" />;
    }
  };

  render() {
    const {
      marcas,
      currentMarcas,
      currentPage,
      totalPages
    } = this.state;
    const totalMarcas = this.state.marcas.length;

    if (totalMarcas === 0) return null;

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

                {/* Creador de marcas */}
                <Grid item xs={12} >
                  <Paper elevation={23}
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",

                    }}>

                    <Typography variant="h8" component="div">
                      <b>Crear nueva marca</b>
                    </Typography>


                    <Box component="form" noValidate sx={{ mt: 1 }}>

                      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onSubmit={this.handleSubmit} >
                      
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="marca"
                          label="Nombre de la marca"
                          size="small"
                          value={this.state.marca}
                          onChange={this.handleChangeMarca}
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

                <Grid item xs={12} md={12} lg={12} >
                  <Paper
                    sx={{

                      display: "flex",
                      flexDirection: "column",
                      height: 40,
                      elevation: 100,
                    }}
                  >
                    {/* BUSCADOR */}
                    <div component="form" class="search" onSubmit={this.handleClickSearch}>
                                            <input
                                                type="text"
                                                name="query"
                                                placeholder={`Buscar...`}
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
                          <TableCell bgcolor="pink" > <b>Codigo</b></TableCell>
                          <TableCell bgcolor="pink" align="left"><b>Marcas</b></TableCell>
                          <TableCell bgcolor="pink" align="left"><b>Acciones</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.marcas.map((item, index) => (
                          <TableRow
                            key={item.IdMarca}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {item.IdMarca}
                            </TableCell>
                            <TableCell align="left">{item.Marca}</TableCell>
                            <TableCell align="left">
                              <EditIcon sx={{ color: pink[200] }}
                                key={item.IdMarca}
                                value={this.state.idedit}
                                onClick={() => { this.showModal(item.IdMarca, item.Marca); }}
                              />
                              <DeleteIcon sx={{ color: pink[600] }}
                                onClick={() => { this.handleRemove(item.IdMarca); }} />
                            </TableCell>

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
                              <b>Ingrese el nombre de la marca que desea modificar</b>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              Codigo: {this.state.idedit}
                            </Typography>

                            <FormControl variant="standard" onSubmit={this.handleEdit}>
                              <TextField
                                id="marcaedit"
                                size="small"
                                margin="normal"
                                value={this.state.marcaedit}
                                onChange={this.handleChangeEditMarca}
                              />
                            </FormControl>
                            <Button
                              sx={{ mt: 2, left: '5%', }}
                              margin variant="contained"
                              onClick={this.handleEdit}>EDITAR
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
                        <b>{totalMarcas}</b> {" "} Marcas
                        {currentPage && (
                          <span> {" "} <b>|</b>{" "} Pagina {" "}
                            <span><b>{currentPage}</b></span><b>/</b>
                            <span><b>{totalPages}</b></span>
                          </span>
                        )}
                      </div>
                     {/*  <div>
                    <Pagination
                      totalRecords={totalMarcas}
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

export default Marcas;
