var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    console.log("Request", req.query);
    const sql = String(req.query.query).split(' ').join('')
      == '' || req.query.query
      == 'undefined' || !req.query || !req.query.query ? `
    SELECT p.IdProducto,
      p.Detalle, p.Codigo, p.Costo, p.PrecioMenor, p.PrecioMayor, 
       m.marca, 
      p.FechaCreacion, p.FechaModificacion
      FROM \`productos\` as p 
      INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
      INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
      INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
      WHERE p.FechaEliminacion IS NULL
      ORDER BY p.Detalle ASC
     
    `: `
      SELECT 
      p.IdProducto,
      p.Detalle, p.Codigo, p.Costo, p.PrecioMenor, p.PrecioMayor, 
       m.marca, 
      p.FechaCreacion, p.FechaModificacion
      FROM \`productos\` as p 
      INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
      INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
      INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
      WHERE 
      p.IdProducto LIKE "%${req.query.query}%"
      AND p.FechaEliminacion IS NULL
      ORDER BY p.Detalle ASC 
    
    `;
    console.log(sql);
    global.dbConnection.query(sql, [], (err, regs) => {
      if (err) {
        console.log(err);
        res.send("Error recuperando productos");
      } else {
        res.json({ productos: regs });
      }
    });
  });

module.exports = router;
