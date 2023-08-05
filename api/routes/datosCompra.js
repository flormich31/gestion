var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {
  const sql = String(req.query.query).split(' ').join('')
  == '' || req.query.query
  == 'undefined' || !req.query || !req.query.query ? `
  SELECT c.IdCompra, DATE_FORMAT(c.Fecha, "%d-%m-%Y %r ") as Fecha, u.Nombre, p.RazonSocial
  FROM compras as c 
  INNER JOIN usuarios as u on u.Id = c.Usuario_Id
  INNER JOIN proveedores as p on p.IdProveedor = c.Proveedor_Id
  WHERE c.FechaEliminacion IS NULL
  
  ORDER BY c.Fecha desc
  `:`SELECT c.IdCompra, DATE_FORMAT(c.Fecha, "%d-%m-%Y %r ") as Fecha, u.Nombre, p.RazonSocial
  FROM compras as c 
  INNER JOIN usuarios as u on u.Id = c.Usuario_Id
  INNER JOIN proveedores as p on p.IdProveedor = c.Proveedor_Id
  WHERE c.FechaEliminacion IS NULL
  
     and IdCompra LIKE "%${req.query.query}%" 
    
  ORDER BY c.Fecha desc	`;

  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.query);
    if (err) {
      console.log(err);
      res.send("Error recuperando detalle compras");
    } else {
      res.json({ datosCompra: regs });
      console.log(regs);
    }
  });
}); 

module.exports = router;
