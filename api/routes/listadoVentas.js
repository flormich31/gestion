var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Request", req.query);

  const sql =  `
 SELECT d.IdDetalleVentas, v.IdVenta, vv.Nombre, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, c.Nombre_Cliente, f.FormaPago, 
v.Entregado, v.Pagado, v.Observacion, p.IdProducto, p.Detalle, m.Marca, d.cantidad, p.PrecioMenor, d.PrecioVenta, v.Descuento, 
v.Total, v.Subtotal
  FROM \`detalle_ventas\` as d 
  INNER JOIN \`ventas\` as v on v.IdVenta = d.Venta_Id
  INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
  INNER JOIN \`usuarios\` as vv on vv.Id = v.Usuario_Id
  INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
  INNER JOIN \`productos\` as p on p.IdProducto = d.Producto_Id
  INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
  WHERE d.FechaEliminacion IS NULL
AND IdVenta LIKE "%${req.query.query}%" 
`;
  global.dbConnection.query(sql, [], (err, regs) => {
      console.log(sql);
      if (err) {
          console.log(err);
          res.send("Error recuperando detalle de venta");
      } else {
          res.json({ prodventas: regs });
          console.log('LISTADO PROD regs:',regs);
      }
  });
});


router.delete("/:IdVenta", function (req, res, next) {
  console.log("Request",req.params.IdVenta);
  
  const sql = `
  UPDATE \`ventas\`
  SET FechaEliminacion= now()
  WHERE IdVenta = ?
  `;
  global.dbConnection.query(sql, [req.params.IdVenta], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error eliminando venta");
    } else {
      res.json({ventas: regs });
    }
  });
});



module.exports = router;
