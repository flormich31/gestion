import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "../../components/AppBar";
import Copyright from "../../components/Copyright";
import { useHistory } from "react-router-dom";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import AddButton from "../../components/AddButton";

const mdTheme = createTheme();

export default function ActivityEditor() {
    function createData(name, uses, percent, updated_at) {
        return { name, uses, percent, updated_at };
    }
    const history = useHistory();

    const handleActivitySelect = (event) => {
        history.push("/activity-editor-read");
    }
    const handlePress = (event) => {
        alert("click en crear nuevo tipo de actividad");
    }

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
                    <AddButton onPress={handlePress}/>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            color="text.primary"
                            padding={2}
                            gutterBottom
                        >
                            Tipos de actividades
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6} lg={4}>
                                <Card elevation={3} sx={{ maxWidth: 345 }} onClick={handleActivitySelect}>
                                    
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image='/assets/images/leerpictogramas.png'
                                        alt="Education image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            Leer oraciones
                                        </Typography>
                                    </CardContent>

                                </Card>

                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Card elevation={3} sx={{ maxWidth: 345 }} onClick={handleActivitySelect}>

                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image='/assets/images/completar.png'
                                        alt="Education image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            Completar oraciones
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Card elevation={3} sx={{ maxWidth: 345 }} onClick={handleActivitySelect}>

                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image='/assets/images/unir.png'
                                        alt="Education image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            Unir con flechas
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
