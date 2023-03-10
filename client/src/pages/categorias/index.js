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
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
    Paper,
    Button,
    Typography,
    TableContainer,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Pagination from '../../components/Pagination';

const mdTheme = createTheme();


class Categorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            count: [],
            rows: [],
            rowsPerPage: [10],
            onPageChange: [],

            currentCategorias: [],
            currentPage: null,
            totalPages: null,

            busqueda: [],
            open: false,
            edit: [],
            idedit: '',
            catedit: '',
        };
    }

    componentDidMount() {
        this.getCategorias();
    }

    onPageChanged = data => {
        const { categorias } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCategorias = categorias.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCategorias, totalPages });
    };

    getCategorias = () => {
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
                console.log(response.data.categorias.length);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    handleChangeId = event => {
        this.setState({ id: event.target.value });
    }
    handleChangeCategoria = event => {
        this.setState({ categoria: event.target.value });
    }

    //Para editar una categoria
    handleChangeEditCategoria = event => {
        this.setState({ catedit: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        let _this = this;

        axios.post("http://localhost:9000/categorias", {
            id: this.state.id,
            categoria: this.state.categoria,

        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                _this.getCategorias();
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({ categoria: "" });
    }

    handleChangeSearch = event => {
        this.setState({ busqueda: event.target.value });
        console.log(event.target.value);
    }

    showModal = (IdCategoria, Categoria, event) => {
        this.setState({ open: true })
        this.setState({ idedit: IdCategoria });
        this.setState({ catedit: Categoria });
        console.log(IdCategoria);
        console.log(this.state.idedit);
        console.log(this.state.catedit);
    }

    handleClickSearch = (busqueda) => {
        let _this = this;
        axios.get("http://localhost:9000/categorias", + busqueda,)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                _this.getCategorias();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // This is the put request
    handleEdit = event => {
        let _this = this;

        axios.put("http://localhost:9000/categorias", {
            id: this.state.idedit,
            categoria: this.state.catedit,
        })
            .then(function (response) {
                _this.getCategorias();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ idedit: "" });
        this.setState({ catedit: "" });
        this.setState({ open: false });
    }

    handleRemove = (IdCategoria) => {
        let _this = this;
        var config = {
            method: "delete",
            url: "http://localhost:9000/categorias/" + IdCategoria,
            headers: {},
        };
        if (window.confirm("??Realmente desea borrar esta categor??a?")) {
            axios(config)
                .then(function (response) {
                    _this.getCategorias();
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {

        const {
            categorias,
            currentCategorias,
            currentPage,
            totalPages
        } = this.state;
        const totalCategorias = this.state.categorias.length;

        if (totalCategorias === 0) return null;

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

                                {/* Editor de categorias */}
                                <Grid item xs={12} >
                                    <Paper elevation={23}
                                        sx={{
                                            p: 3,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}>
                                        <Typography variant="h8" component="div">
                                            <b>Crear nueva categoria</b>
                                        </Typography>

                                        <Box component="form" noValidate sx={{ mt: 1 }}>

                                            <FormControl variant="filled" sx={{ minWidth: 120 }} onSubmit={this.handleSubmit} >

                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="categoria"
                                                    label="Nombre de la categoria"
                                                    size="small"
                                                    value={this.state.categoria}
                                                    onChange={this.handleChangeCategoria}
                                                />
                                            </FormControl>
                                            <br />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 1 }}
                                                size="small"
                                                onClick={this.handleSubmit}
                                            >
                                                {"Crear"}
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                                {/* BUSCADOR */}
                                {/* <Grid item xs={12}  >
                                    <Paper
                                        sx={{
                                            p: 3,
                                            display: "flex",
                                            flexDirection: "column",

                                        }}
                                    >
                                        <FormControl variant="standard" onSubmit={this.handleSubmit}>
                                            <TextField
                                                id="busqueda"
                                                size="small"
                                                name="form"
                                                value={this.state.busqueda}
                                                onChange={this.handleChangeSearch}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" >
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 1 }}
                                                size="small"
                                                onClick={this.handleClickSearch}
                                            >
                                                {"Buscar"}
                                            </Button>
                                        </FormControl>
                                    </Paper>
                                </Grid> */}

                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={23}>
                                        <div style={{ height: 500, width: '100%', alignContent: "center" }}>


                                            <TableContainer>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell bgcolor="pink" > <b>Codigo</b></TableCell>
                                                            <TableCell bgcolor="pink" align="left"><b>Categorias</b></TableCell>
                                                            <TableCell bgcolor="pink" align="right"><b>Acciones</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {this.state.currentCategorias.map((item, index) => (
                                                            <TableRow
                                                                key={item.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {item.IdCategoria}
                                                                </TableCell>
                                                                <TableCell align="left">{item.Categoria}</TableCell>
                                                                <TableCell align="right" >
                                                                    <EditIcon
                                                                        sx={{ color: pink[200] }}
                                                                        key={item.IdCategoria}
                                                                        value={this.state.idedit}
                                                                        onClick={() => { this.showModal(item.IdCategoria, item.Categoria); }}
                                                                    />
                                                                    <DeleteIcon
                                                                        sx={{ color: pink[600] }}
                                                                        onClick={() => { this.handleRemove(item.IdCategoria); }}
                                                                    />
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
                                                                    <b>Ingrese el nombre de la categoria que desea modificar</b>
                                                                </Typography>
                                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                    Codigo: {this.state.idedit}
                                                                </Typography>

                                                                <FormControl variant="standard" onSubmit={this.handleEdit}>
                                                                    <TextField
                                                                        id="catedit"
                                                                        size="small"
                                                                        margin="normal"
                                                                        value={this.state.catedit}
                                                                        onChange={this.handleChangeEditCategoria}
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
                                            </TableContainer>
                                                <Pagination
                                                    totalRecords={totalCategorias}
                                                    pageLimit={5}
                                                    pageNeighbours={1}
                                                    onPageChanged={this.onPageChanged}
                                                />
                                            <div
                                                align="center"
                                                sx={{
                                                    p: 10,
                                                }}>
                                                    
                                                <Typography variant="body" component="div" >
                                                    <b>Total categorias:{totalCategorias}</b><br/>
                                                    <b>Pagina:{currentPage}</b>
                                                    <b>/{totalPages}</b>
                                                </Typography>
                                                </div>

                                            </div>
                                    </Paper>
                                </Grid>

                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider >
        );
    }
}

export default Categorias;
