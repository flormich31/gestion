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
  Paper,
  Typography,
} from "@mui/material";
import { Redirect } from "react-router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddButton from "../../components/AddButton";
const mdTheme = createTheme();


class Proveedores extends React.Component {

   constructor(props) {
    super(props);

    this.state = {
      proveedores: [],
    };
  }

  componentDidMount() {
    this.getProveedores();
  }

  getProveedores = () => {
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
              <Grid item xs={12} md={12} lg={12} >
              <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                  }}
                >
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

              <Grid item xs={12} md={12} lg={12}>
                <Paper elevation={23}>
                <div style={{ height: 400, width: '100%', alignContent: "center"}}>
                  
                  <Table sx={{ minWidth: 650  }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell bgcolor="pink" > <b>ID</b></TableCell>
                      <TableCell bgcolor="pink" ><b>Razon Social</b></TableCell>
                      <TableCell bgcolor="pink" ><b>Domicilio</b></TableCell>
                      <TableCell bgcolor="pink" > <b>Web</b></TableCell>
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
                       
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
                </Paper>
              </Grid>
              
              <AddButton/>
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

