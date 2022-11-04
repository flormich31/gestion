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
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
//import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import ButtonCreateGroup from "../../components/ButtonCreateGroup";

const mdTheme = createTheme();

class DashboardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
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
            <ButtonCreateGroup />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12} lg={12}>
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
                </Grid>
                {this.state.groups.map((item, index) => (
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image="/assets/images/bienvenido.png"
                        alt="Cuarto image"
                      />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          align="center"
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Código de acceso: {item.code}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          1 Actividad
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={this.redirectHandlerOpen}>
                          Abrir
                        </Button>
                        {this.renderRedirectOpen()}
                        <Button size="small">Borrar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default DashboardContent;
