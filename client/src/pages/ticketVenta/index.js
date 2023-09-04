import React from 'react';


class TicketVenta extends React.Component {
  handleImprimir = () => {
    window.print();
  }

  render() {
    return (
      <div>
        {/* Contenido del ticket de venta */}
        <h1>Ticket de Venta</h1>
        <p>Detalles de la compra:</p>
        <p>{this.props.variable}</p>
        {/* ... otros detalles ... */}
        
        {/* Botón para imprimir */}
        <button onClick={this.handleImprimir}>Imprimir Ticket</button>
      </div>
    );
  }
}

export default TicketVenta;
