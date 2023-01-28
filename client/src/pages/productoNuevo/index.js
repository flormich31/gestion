import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar";
import axios from "axios";
import Copyright from "../../components/Copyright";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const mdTheme = createTheme();

export default function ProductoNuevo() {
  const history = useHistory();
  const handleProductos = (event) => {
    history.push("/productos");
  };

  const [id, setId] = React.useState("");
  const [detalle, setDetalle] = React.useState("");
  const [categoriaId, setCategoriaId] = React.useState("");
  const [marcaId, setMarcaId] = React.useState("");
  const [costo, setCosto] = React.useState("");
  const [proveedorId, setProveedorId] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      id: id,
      detalle: detalle,
      categoriaId: categoriaId,
      marcaId: marcaId,
      costo: costo,
      proveedorId: proveedorId,
    };
    axios
      .post("http://localhost:9000/productos", data)
      .then((res) => {
        setData(res.data);
        setId("");
        setDetalle("");
        setCategoriaId("");
        setMarcaId("");
        setCosto("");
        setProveedorId("");
        setLoading(false);
        history.push("/productos");

        console.log((res.data));
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
      });
  };
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
                    id="id"
                    label="ID del producto"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="detalle"
                    label="Nombre del producto"
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="categoria"
                    label="Categoria ID del producto"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="marca"
                    label="Marca ID del producto"
                    value={marcaId}
                    onChange={(e) => setMarcaId(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="costo"
                    label="Costo del producto"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="proveedor"
                    label="proveedor ID del producto"
                    value={proveedorId}
                    onChange={(e) => setProveedorId(e.target.value)}
                    autoFocus
                  />
                  {isError && (
                    <small className="mt-3 d-inline-block text-danger">
                      Something went wrong. Please try again later.
                    </small>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Crear"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}