var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT p.IdProducto, p.Detalle, p.Categoria_Id, p.Costo, p.Marca_Id, p.Proveedor_Id, m.marca, c.categoria, r.RazonSocial
    FROM \`productos\` as p 
    INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
    INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
    INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
    WHERE p.FechaEliminacion IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.body);
    if (err) {
      console.log(err);
      res.send("Error recuperando ventas");
    } else {
      res.json({ ventas: regs });
    }
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const ventaData = req.body;

  const ventaParams = [
    ventaData.Fecha,
    ventaData.Vendedor_Id,
    ventaData.Cliente_Id,
    ventaData.FormaPago_Id,
    ventaData.Total,
    ventaData.Entregado,
    ventaData.Pagado,
    ventaData.Observacion,
    ventaData.Descuento,
  ];
  const sql = `
  INSERT INTO ventas
  ( Fecha, Vendedor_Id, Cliente_Id, FormaPago_Id, Total, Entregado, Pagado, Observacion, Descuento) VALUES (?,?,?,?,?,?,?,?,?);
  `;
  console.log(sql);
  global.dbConnection.query(sql, ventaParams, (err, result) => {
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
