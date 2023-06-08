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
  `:`SELECT v.IdVenta, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, vd.Nombre, v.Pagado, c.Nombre_Cliente, f.FormaPago,
  v.Total, v.Subtotal, v.Observacion, v.Descuento , CASE WHEN v.Pagado = 1 THEN 'Si' ELSE 'No' END AS Pagado, 
  CASE WHEN v.Entregado = 1 THEN 'Si' ELSE 'No' END AS Entregado
  FROM \`ventas\` as v 
  INNER JOIN \`vendedores\` as vd on vd.IdVendedor = v.Vendedor_Id
  INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
  INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
  WHERE v.FechaEliminacion IS NULL

  AND v.Fecha >= "${req.query.query}" AND v.Fecha <= "${req.query.query2}"
   
  ORDER BY v.Fecha ASC	`;

  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.query);
    if (err) {
      console.log(err);
      res.send("Error recuperando ventas");
    } else {
      res.json({ ventas: regs });
      console.log(regs);
    }
  });
}); 

router.post("/", function (req, res, next) {
  console.log(req.body);
  const ventaData = req.body;

  const ventaParams = [
    new Date(),
    ventaData.Vendedor_Id,
    ventaData.Cliente_Id,
    ventaData.FormaPago_Id,
    ventaData.Total,
    ventaData.Subtotal,
    ventaData.Entregado,
    ventaData.Pagado,
    ventaData.Observacion,
    ventaData.Descuento,
    ventaData.Interes,
  ];
  const sql = `
  INSERT INTO ventas
  ( Fecha, Vendedor_Id, Cliente_Id, FormaPago_Id, Total, Subtotal, Entregado, Pagado, Observacion, Descuento, Interes) 
  VALUES (?,?,?,?,?,?,?,?,?,?,?);
  `;
  
  global.dbConnection.query(sql, ventaParams, (err, result) => {
    console.log(sql, ventaParams);
    if (err) {
      res.status(500).send("Error insertando venta");
    } else {
      ventaData.IdVenta = result.insertId;
      const paramsDetalleVenta = [];
      const sqlDetalleVenta = `
        INSERT INTO detalle_ventas (Venta_Id, Producto_Id, Cantidad, PrecioVenta, PrecioCosto) VALUES ?
      `;

      ventaData.productos.map((producto) => {
        paramsDetalleVenta.push([
          ventaData.IdVenta,
          producto.IdProducto,
          producto.Cantidad,
          producto.PrecioVenta,
          producto.Costo,
        ]);
      });
      global.dbConnection.query(
        sqlDetalleVenta,
        [paramsDetalleVenta],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error insertando detalle venta");
          } else {
            res.json({ data: ventaData });
          }
        }
      );
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


router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`ventas\`
  SET Entregado='${req.body.Entregado}',
  Pagado='${req.body.Pagado}',
  Observacion='${req.body.Observacion}'
  WHERE IdVenta='${req.body.IdVenta}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    console.log(regs);
    if (err) {
      res.send("Error editando venta");
    } else {
      //res.json({ ventas?: regs });
    }
  });
});

module.exports = router;
