var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Request", req.query);

  const sql =  `
  SELECT d.IdDetalleCompra, c.IdCompra, u.Nombre, DATE_FORMAT(c.Fecha, "%d-%m-%Y %r ") as Fecha, pr.RazonSocial, p.IdProducto, p.Detalle, m.Marca,
  d.cantidad, p.PrecioMenor, d.Precio, c.Total
   FROM \`detalle_compras\` as d 
   INNER JOIN \`compras\` as c on c.IdCompra = d.Compra_Id
   INNER JOIN \`proveedores\` as pr on pr.IdProveedor = c.Proveedor_Id
   INNER JOIN \`usuarios\` as u on u.Id = c.Usuario_Id
   INNER JOIN \`productos\` as p on p.IdProducto = d.Producto_Id
   INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
   WHERE d.FechaEliminacion IS NULL
AND IdCompra LIKE "%${req.query.query}%" 
`;
  global.dbConnection.query(sql, [], (err, regs) => {
      console.log(sql);
      if (err) {
          console.log(err);
          res.send("Error recuperando detalle de compra");
      } else {
          res.json({ prodcompras: regs });
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
