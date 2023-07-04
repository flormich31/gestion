var express = require("express");
var router = express.Router();

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

module.exports = router;
