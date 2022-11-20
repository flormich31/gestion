import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import { Button, ImageList, ImageListItem, TextField } from "@mui/material";
import PictoBar from "../../components/PictoBar";

const mdTheme = createTheme();

// export default function ActivityEditorRead() {
class ActivityEditorRead extends React.Component {
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
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={8} md={8} lg={8}>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="namedb"
                      label="Nombre de actividad"
                      name="namedb"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="grupodb"
                      label="Grupo"
                      type="text"
                      id="grupodb"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="consigabd"
                      label="Consigna"
                      name="consignabd"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="oraciondb"
                      label="Oracion"
                      type="text"
                      id="oraciondb"
                    />
                    <div>
                      <ImageList
                        sx={{ width: 400, height: 200, "padding-left": "5px" }}
                        cols={3}
                        rowHeight={130}
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
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 1 }}
                    >
                      Guardar
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                  <PictoBar
                    onSelectPictograma={this.handleOnSelectPictograma}
                  ></PictoBar>
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

export default ActivityEditorRead;
