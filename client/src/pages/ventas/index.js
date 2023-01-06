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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import AddButton from "../../components/AddButton";
import axios from "axios";
import {
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Redirect } from "react-router";
import ButtonCreateGroup from "../../components/ButtonCreateGroup";
import DataTableProd from "../../components/DataTableProd";
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import AccountCircle from '@mui/icons-material/AccountCircle';

const mdTheme = createTheme();


class DashboardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = () => {
    let _this = this;
    var config = {
      method: "get",
      url: "http://localhost:9000/groups",
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
  redirectHandlerOpen = () => {
    this.setState({ redirect: true });
    this.renderRedirectOpen();
  };
  renderRedirectOpen = () => {
    if (this.state.redirect) {
      return <Redirect to="/groups-A" />;
    }
  };
  handleRemove = (id) => {
    let _this = this;
    var config = {
      method: "delete",
      url: "http://localhost:9000/groups/" + id,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        _this.getGroups();
      })
      .catch(function (error) {
        console.log(error);
      });
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
                  ? theme.palette.grey[500]
                  : theme.palette.grey[500],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} >
                  <Paper
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: 360,
                      width: 470,
                    }}
                  >
                    <Typography variant="h4" component="div" p={1}>
                      Detalle de venta
                    </Typography>

                    {/* Numero de venta y fecha */}
                    <Grid  >
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <TextField id="standard-read-only-input"
                          defaultValue="3250"
                          label="Venta número:"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard" />
                      </FormControl>

                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <TextField id="standard-read-only-input"
                          defaultValue={new Date().toLocaleString()}
                          label="Fecha"
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard" />
                      </FormControl>
                    </Grid>
                    {/* Vendedor y forma de pago */}
                    <Grid >
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Vendedor
                        </InputLabel>
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={10}>Alu</option>
                          <option value={20}>Georgi</option>
                          <option value={30}>Ceci</option>
                        </NativeSelect>
                      </FormControl>

                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Forma de pago
                        </InputLabel>
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={10}>Efectivo</option>
                          <option value={20}>Debito</option>
                          <option value={30}>Credito</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    {/* Entregado y Pagado */}
                    <Grid>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        Entregado:<NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={10}>Si</option>
                          <option value={20}>No</option>
                        </NativeSelect>
                      </FormControl>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        Pagado:
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={10}>Si</option>
                          <option value={20}>No</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    {/* Descuento */}
                    <Grid>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <TextField
                          id="standard-basic" label="Descuento" variant="standard"
                        />
                      </FormControl>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={6}  >
                  <Paper
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: 360,
                      width: 470,
                    }}
                  >
                    {/* Cliente */}
                    <Typography variant="h4" component="div">
                      Cliente <br />
                      <Grid >
                      <FormControl variant="standard">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-sx" label="Nombre del cliente..." variant="standard" />
                      </Box>
                      </FormControl>
                      </Grid>
                      
                    </Typography>
                    <Typography variant="p" component="div" Align="left">
                      <br />Observaciones
                      <br />
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue="Escriba aquí..."

                      />
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>

              <Grid m={0} pt={2}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 200,
                  }}
                >
                  <Typography variant="h4" component="div">
                    Producto
                  </Typography>
                  <br />
                  <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                      Buscar
                    </InputLabel>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Paper>
              </Grid>

              <Grid m={0} pt={2}><DataTableProd /></Grid>
             
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default DashboardContent;
