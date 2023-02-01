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
import SearchBox from "../../components/SearchBox";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {
    Paper,
    Button,
    Typography,
} from "@mui/material";
import { Redirect } from "react-router";
import DataTableVenta from "../../components/DataTableVenta";
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonCreateProduct from "../../components/ButtonCreateProduct";
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

const mdTheme = createTheme();


class Categorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
        };
    }

    componentDidMount() {
        this.getCategorias();
    }

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
    handleChangeCategoria = event => {
        this.setState({ categoria: event.target.value });
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
        this.setState({});
    }
    // This is the put request
    handleEdit = () => {
       
    }

    handleRemove = (IdCategoria) => {
        let _this = this;
        var config = {
            method: "delete",
            url: "http://localhost:9000/categorias/" + IdCategoria,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                _this.getCategorias();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                                        {/* Editor de categorias */}
                                        <Typography variant="h8" component="div">
                                            <b>Editor de categorias</b>
                                        </Typography>


                                        <Box component="form" noValidate sx={{ mt: 1 }}>

                                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onSubmit={this.handleSubmit} >
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
                                        <FormControl variant="standard" >
                                            <TextField
                                                id="input-with-icon-adornment"
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" >
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={23}>
                                        <div style={{ height: 400, width: '100%', alignContent: "center" }}>

                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell bgcolor="pink" > <b>Codigo</b></TableCell>
                                                        <TableCell bgcolor="pink" align="right"><b>Categorias</b></TableCell>
                                                        <TableCell bgcolor="pink" align="right"><b>Acciones</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.categorias.map((item, index) => (
                                                        <TableRow
                                                            key={item.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {item.IdCategoria}
                                                            </TableCell>
                                                            <TableCell align="right">{item.Categoria}</TableCell>
                                                            <TableCell align="right"><EditIcon sx={{ color: pink[200] }} onClick={() => {
                                                                this.handleEdit(item.IdCategoria);
                                                            }}/><DeleteIcon sx={{ color: pink[600] }} onClick={() => {
                                                                this.handleRemove(item.IdCategoria);
                                                            }} /></TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                        </div>
                                    </Paper>
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

export default Categorias;
