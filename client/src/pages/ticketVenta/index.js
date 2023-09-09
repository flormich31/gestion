import { NativeSelect, Typography } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react';
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";


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
      // dateStart: dayjs('2022-04-17'),
      // dateEnd: new Date(),
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
    this.getUrl();
    this.getDatosVenta();
    this.getListadoVentas();
    this.getTotalVentas();
  }

  handleImprimir = () => {
    console.log(this.props.IdTicket);
    window.print();
  }
  //numVenta = props.variable;

  getUrl = async () => {
    //Se obtiene el valor de la URL desde el navegador
    let actual = window.location + '';
    //Se realiza la división de la URL
    let split = actual.split("/");
    //Se obtiene el ultimo valor de la URL
    let num = split[split.length - 1];
    console.log("ID", num);
    await this.setState({ IdVenta: num, query: num });
    console.log("IDVENTA", this.state.IdVenta);
    console.log("query", this.state.query);

  }

  getDatosVenta = () => {
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
      <div >
      {this.state.datosVenta.map((item) =>
      <Box
      sx={{
        width: 900,
        bgcolor: "background.paper",
      }}
    >

        {/* Contenido del ticket de venta */}
        <h2>DIVA FOREVER</h2>
        <p> Av. 9 de Julio 158, N3378 Pto Esperanza, Mnes</p>
        <p>*************************************************</p>
        <p>Ticket: {this.state.IdVenta}</p>
       
        <Typography color="#000000" variant="p">
          <b>Fecha:</b>  {item.Fecha}<br />
          <b> Vendedor:</b>  {item.Nombre}<br />
          <b>Cliente:</b>  {item.Nombre_Cliente}<br />
          <b>Forma de pago:</b>   {item.FormaPago}<br />
          <b>Entregado:</b>  <FormControl o size="small" >
            <NativeSelect
              size="small"
              value={this.state.Entregado}
              onChange={this.onEntregadoChange}
              inputProps={{
                id: "uncontrolled-native",
              }}
            >
              <option value={0}>{item.Entregado}</option>
              <option value={1}>Si</option>
              <option value={2}>No</option>
            </NativeSelect>
          </FormControl>
          <b>Pagado:</b> <FormControl  size="small">
            <NativeSelect
              size="small"
              value={this.state.Pagado}
              inputProps={{
                id: "uncontrolled-native",
              }}
            >
              <option value={0}>{item.Pagado}</option>
              <option value={1}>Si</option>
              <option value={2}>No</option>
            </NativeSelect>

          </FormControl>
          <br />
          <b>Observacion:</b> {item.Observacion}
          <br />      <br />
        </Typography>
        </Box>)}
        {/* ... otros detalles ... */}

        {/* Botón para imprimir */}
        <button onClick={this.handleImprimir}>Imprimir Ticket</button>
      </div>
    );
  }
}

export default TicketVenta;
