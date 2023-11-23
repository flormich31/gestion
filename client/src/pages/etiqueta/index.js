import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react';
import Box from "@mui/material/Box";
import { withRouter } from 'react-router-dom';


class Etiqueta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productos: [],
            open: false,
            IdProducto: ' ',
        };
    }
    componentDidMount() {
        this.GetID();
    }

    handleImprimir = () => {
        console.log(this.props.IdTicket);
        window.print();
    }

    GetID = async () => {
        // Accede a los parámetros de la URL, incluido el "id" que definiste en la ruta
        let { IdProducto } = this.props.match.params;
        await this.setState({ query: IdProducto });
        await this.setState({ IdProducto: IdProducto });

        console.log('url', IdProducto)
        await this.getProductos();

    }

    getProductos = () => {
        let _this = this;
        // const limit = String(this.state.query).trim() !== "" ? "" : "&limit=15";
        var config = {
            method: "get",
            url: `${process.env.REACT_APP_API}productos?query=${this.state.query}`,
            headers: {},
        };
        axios(config)
            .then(function (response) {
                _this.setState({ productos: response.data.productos || [] });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        return (
            <Container maxWidth="155px" width="155px" sx={{ mt: 4, mb: 4 }}>
                <Grid >
                    <div >
                        {this.state.productos.map((item) =>
                            <Box>
                                {/* Contenido de la etiqueta */}

                                <ul type="none" color="#000000" variant="body2" align="center"
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                    }} >

                                    {this.state.productos.map((item, index) => (
                                        <li>{item.Detalle}-{ item.marca} #
                                            {item.IdProducto}</li>
                                    ))}
                                </ul>
                                <ul type="none" color="#000000" variant="h6" align="center"
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                    }} >

                                    {this.state.productos.map((item, index) => (
                                        <li><b>${item.PrecioMenor}</b></li>
                                    ))}
                                </ul>

                            </Box>)}
                        {/* Botón para imprimir */}
                        <button class="oculto-impresion" onClick={this.handleImprimir}>Imprimir etiqueta</button>
                    </div>

                </Grid>
            </Container>
        );
    }
}

export default withRouter(Etiqueta);
