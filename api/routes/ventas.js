var express = require("express");
var router = express.Router();

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
 
   and IdVenta LIKE 	"%${req.query.query}%"
  ORDER BY v.Fecha ASC	`;

  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.body);
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

router.delete("/:IdProducto", function (req, res, next) {
  console.log("Request", req.params.IdProducto);

  const sql = `
  DELETE FROM \`productos\`
  WHERE IdProducto = ?
  `;
  //console.log("Delete IdProducto > " + req.params.IdProducto);
  global.dbConnection.query(sql, [req.params.IdProducto], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error eliminando producto");
    } else {
      res.json({ productos: regs });
    }
  });
});

router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`productos\`
  SET detalle='${req.body.IdProducto}'
  WHERE IdProducto='${req.body.IdProducto}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error editando producto");
    } else {
      res.json({ productos: regs });
    }
  });
});

module.exports = router;
