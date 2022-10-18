import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import { Button, ImageList, ImageListItem, Typography } from "@mui/material";
import PictoBar from "../../components/PictoBar";

const mdTheme = createTheme();

class ActivityRead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemData: [],
    };

    this.handleOnSelectPictograma = function (imgUrl, imgTitle) {
      this.state.itemData.push({
        img: imgUrl,
        title: "Bicicleta",
      });
      this.setState(this.state);
    };
    this.handleOnSelectPictograma = this.handleOnSelectPictograma.bind(this);
    this.onSelectPictograma = (indice) => {
      this.state.itemData.splice(indice, 1);
      this.setState(this.state);
    };
  }

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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      height: 140,
                    }}
                  >
                    <Typography variante="h5">
                      <h1>Actividad: Leer oraciones</h1>
                      <h4>
                        Ordena las imagenes segun la oración: "El niño habla con
                        la abuela"
                      </h4>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                  <PictoBar
                    onSelectPictograma={this.handleOnSelectPictograma}
                  ></PictoBar>
                </Grid>
                <Grid item xs={5} md={4} lg={5}>
                  <Paper>
                    <ImageList
                      sx={{ width: 340, height: 340, "padding-left": "5px" }}
                      cols={3}
                      rowHeight={90}
                    >
                      {this.state.itemData.map((item, index) => (
                        <ImageListItem
                          key={item.img}
                          onClick={this.onSelectPictograma.bind(this, index)}
                        >
                          <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              border: "2px solid #555",
                              cursor: "pointer",
                            }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Paper>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Enviar
                  </Button>
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

export default ActivityRead;
