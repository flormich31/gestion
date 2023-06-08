var express = require("express");
var router = express.Router();

/* 
router.get("/", function (req, res, next) {
  console.log("req.body1111", req.body);
  const sql = String(req.body).split(' ').join('')
  == '' || req.body
  == 'undefined' || !req.body || !req.body.body ? `
   SELECT v.IdVenta, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, vd.Nombre, v.Pagado, c.Nombre_Cliente, f.FormaPago, 
  v.Total, v.Subtotal, v.Observacion, v.Descuento, CASE WHEN v.Pagado = 1 THEN 'Si' ELSE 'No' END AS Pagado, 
  CASE WHEN v.Entregado = 1 THEN 'Si' ELSE 'No' END AS Entregado
  FROM \`ventas\` as v 
  INNER JOIN \`vendedores\` as vd on vd.IdVendedor = v.Vendedor_Id
  INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
  INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
  WHERE v.FechaEliminacion IS NULL
  
  ORDER BY v.Fecha desc
  `:`SELECT v.IdVenta, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, vd.Nombre, v.Pagado, c.Nombre_Cliente, f.FormaPago,
  v.Total, v.Subtotal, v.Observacion, v.Descuento , CASE WHEN v.Pagado = 1 THEN 'Si' ELSE 'No' END AS Pagado, 
  CASE WHEN v.Entregado = 1 THEN 'Si' ELSE 'No' END AS Entregado
  FROM \`ventas\` as v 
  INNER JOIN \`vendedores\` as vd on vd.IdVendedor = v.Vendedor_Id
  INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
  INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
  WHERE v.FechaEliminacion IS NULL
  
  AND v.Fecha >= "%${req.body.startDate}%" AND v.Fecha <= "%${req.body.endDate}%"
   
  ORDER BY v.Fecha ASC	`;

  global.dbConnection.query(sql, [], (err, regs) => {
    console.log("req.body 2222", req.body);
    if (err) {
      console.log(err);
      res.send("Error recuperando ventas");
    } else {
      res.json({ ventas: regs });
      console.log(regs);
    }
  });
}); */

router.get("/", function (req, res, next) {
  const sql = String(req.query.query).split(' ').join('')
  == '' || req.query.query
  == 'undefined' || !req.query || !req.query.query ? `
   SELECT v.IdVenta, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, vd.Nombre, v.Pagado, c.Nombre_Cliente, f.FormaPago, 
  v.Total, v.Subtotal, v.Observacion, v.Descuento, CASE WHEN v.Pagado = 1 THEN 'Si' ELSE 'No' END AS Pagado, 
  CASE WHEN v.Entregado = 1 THEN 'Si' ELSE 'No' END AS Entregado
  FROM \`ventas\` as v 
  INNER JOIN \`vendedores\` as vd on vd.IdVendedor = v.Vendedor_Id
  INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
  INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
  WHERE v.FechaEliminacion IS NULL
  
  ORDER BY v.Fecha desc
  `:`SELECT v.IdVenta, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, vd.Nombre, v.Pagado, c.Nombre_Cliente,
  f.FormaPago, v.Total, v.Observacion, v.Descuento, v.Interes , CASE WHEN v.Pagado = 1 THEN 'Si' ELSE 'No' END AS Pagado, CASE WHEN v.Entregado = 1 THEN 'Si' ELSE 'No' END AS Entregado
    FROM ventas as v 
    INNER JOIN vendedores as vd on vd.IdVendedor = v.Vendedor_Id
    INNER JOIN clientes as c on c.IdCliente = v.Cliente_Id
    INNER JOIN forma_pago as f on f.IdFormaPago = v.FormaPago_Id
    WHERE v.FechaEliminacion IS NULL
     and IdVenta LIKE 16
    ORDER BY v.Fecha ASC	`;

  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.query);
    if (err) {
      console.log(err);
      res.send("Error recuperando ventas");
    } else {
      res.json({ datosVenta: regs });
      console.log(regs);
    }
  });
}); 

module.exports = router;
