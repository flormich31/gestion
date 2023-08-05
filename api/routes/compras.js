var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {
  const sql = String(req.query.query).split(' ').join('')
  == '' || req.query.query
  == 'undefined' || !req.query || !req.query.query ? `
  SELECT c.IdCompra, DATE_FORMAT(c.Fecha, "%d-%m-%Y %r ") as Fecha, p.RazonSocial, u.Nombre,
  c.Total
  FROM \`compras\` as c 
  INNER JOIN \`usuarios\` as u on u.Id = c.Usuario_Id
  INNER JOIN \`proveedores\` as p on p.IdProveedor = c.Proveedor_Id
  WHERE c.FechaEliminacion IS NULL
  `:`SELECT c.IdCompra, DATE_FORMAT(c.Fecha, "%d-%m-%Y %r ") as Fecha, p.RazonSocial, u.Nombre,
  c.Total
  FROM \`compras\` as c 
  INNER JOIN \`usuarios\` as u on u.Id = c.Usuario_Id
  INNER JOIN \`proveedores\` as p on p.IdProveedor = c.Proveedor_Id
  WHERE c.FechaEliminacion IS NULL

  AND c.Fecha >= "${req.query.query}" AND c.Fecha <= "${req.query.query2}"
   
  ORDER BY c.Fecha ASC	`;

  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.query);
    if (err) {
      console.log(err);
      res.send("Error recuperando compras");
    } else {
      res.json({ compras: regs });
      console.log(regs);
    }
  });
}); 


router.post("/", function (req, res, next) {
    console.log(req.body);
    const ventaData = req.body;
  
    const ventaParams = [
      new Date(),
      ventaData.Proveedor_Id,
      ventaData.Usuario_Id,
      ventaData.Total,
    ];
    const sql = `
    INSERT INTO compras
    ( Fecha, Proveedor_Id, Usuario_Id, Total) 
    VALUES (?,?,?,?);
    `;
    
    global.dbConnection.query(sql, ventaParams, (err, result) => {
      console.log("sql and parametros", sql, ventaParams);
      if (err) {
        res.status(500).send("Error insertando compra");
        console.log(err);
      } else {
        ventaData.IdVenta = result.insertId;
        const paramsDetalleVenta = [];
        const sqlDetalleVenta = `
          INSERT INTO detalle_compras (Compra_Id, Producto_Id, Cantidad, Precio) VALUES ?
        `;
  
        ventaData.productos.map((producto) => {
          paramsDetalleVenta.push([
            ventaData.IdVenta,
            producto.IdProducto,
            producto.Cantidad,
            producto.PrecioVenta,
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


  router.delete("/:IdCompra", function (req, res, next) {
    console.log("Request",req.params.IdCompra);
    
    const sql = `
    UPDATE \`compras\`
    SET FechaEliminacion= now()
    WHERE IdCompra = ?
    `;
    global.dbConnection.query(sql, [req.params.IdCompra], (err, regs) => {
      console.log(sql);
      if (err) {
        res.send("Error eliminando compra");
      } else {
        res.json({compras: regs });
      }
    });
  });

module.exports = router;
