import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react';
import Box from "@mui/material/Box";
import { withRouter } from 'react-router-dom';


class TicketVenta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ventas: [],
      datosVenta: [],
      prodventas: [],
      productos: [],
      ventaProductos: [],
      usuarios: [],
      totalVenta: [],
      currentPage: null,
      totalPages: null,

      open: false,
      openEdit: false,
      query: "",
      IdVenta: ' ',
      IdVendedor: ' ',
      IdFormaPago: ' ',
      Entregado: ' ',
      Pagado: ' ',
      Descuento: ' ',
      Observacion: ' ',
      startDate: '',
      startDateMysql: '',
      endDate: '',
      endDateMysql: '',

      Cliente_Id: "",
      Observacion: ' ',
      formaPago: [],
      clientes: [],
      numeroVenta: "",
      variable: "",
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
    let { IdVenta } = this.props.match.params;
    await this.setState({ query: IdVenta });
    await this.setState({ IdVenta: IdVenta });

    console.log('url', IdVenta)
    await this.getDatosVenta();
    await this.getListadoVentas();
    await this.getTotalVentas();
  }

  getDatosVenta = () => {
    console.log('getventaid', this.state.query)
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}datosVenta?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.datosVenta.length === 0) {
          alert("No se encontraron datos de venta");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  getListadoVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}listadoVentas?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.prodventas.length === 0) {
          alert("No se encontraron productos en esta venta");
        } else {
          _this.setState(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getTotalVentas = () => {
    let _this = this;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API}totalVentas?query=${this.state.query}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.totalVenta.length === 0) {
          alert("No se encontraron Totales en esta venta");
        } else {
          _this.setState(response.data);
        }
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
            {this.state.datosVenta.map((item) =>
              <Box>
                {/* Contenido del ticket de venta */}
                <Typography color="#000000" variant="h6" align='inherit'>
                  <b>DIVA FOREVER</b>
                </Typography>
                <ul type="none" color="#000000" variant="body2"
                  style={{
                    padding: 0,
                    margin: 0,
                  }} >
                  <li>Av. 9 de Julio 158, 3378 Pto Esperanza, Mnes</li>
                  <li>Contáctese: +54 9 3757 651761</li>
                  <li>*************************************************</li>
                  <li>Ticket: {this.state.IdVenta}</li>

                  <b>Fecha:</b>  {item.Fecha}<br />
                  <b>Vendedor:</b>  {item.Nombre}<br />
                  <b>Cliente:</b>  {item.Nombre_Cliente}<br />
                  <b>Forma de pago:</b>   {item.FormaPago}<br />
                  <br />
                </ul>
                  <table >
                  <thead>
        <tr>
                        <th >
                          <b>Cant.</b>
                        </th>
                        <th >
                          <b>Descripcion</b>
                        </th>
                        <th >
                          <b>Precio</b>
                        </th>
                        </tr>
      </thead>
      <tbody>
                      {this.state.prodventas.map((item, index) => (
                        <tr>
                          <td>
                            {item.cantidad}
                          </td>
                          <td>
                            {item.Detalle}-{item.Marca}
                          </td>
                          <td>
                            ${item.PrecioVenta}
                          </td>
                          </tr>
                      ))}
                    </tbody>
    </table>
             
                <b>TOTAL:</b>  ${item.Total}
                < ul type="none" color="#000000" variant="body2"
                  style={{
                    padding: 0,
                    margin: 0,
                  }} >
                  <li>*************************************************</li>
                  <li>¡GRACIAS POR SU COMPRA!</li>
                </ul>
              </Box>)}
            {/* Botón para imprimir */}
            <button class="oculto-impresion" onClick={this.handleImprimir}>Imprimir Ticket</button>
          </div>

        </Grid>
      </Container>
    );
  }
}

export default withRouter(TicketVenta);
