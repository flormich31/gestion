var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Request", req.query);
  
  const sql = String(req.query.query).split(' ').join('')
  == '' || req.query.query
  == 'undefined' || !req.query || !req.query.query ?`
  SELECT p.IdProducto, p.Detalle, p.Categoria_Id, p.Costo, p.Marca_Id, p.Proveedor_Id, m.marca, c.categoria, r.RazonSocial
    FROM \`productos\` as p 
    INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
    INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
    INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
    WHERE p.FechaEliminacion IS NULL
    ORDER BY p.Detalle ASC
  `:`
    SELECT p.IdProducto, p.Detalle, p.Categoria_Id, p.Costo, p.Marca_Id, p.Proveedor_Id, m.marca, c.categoria, r.RazonSocial
    FROM \`productos\` as p 
    INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
    INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
    INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
    WHERE p.FechaEliminacion IS NULL
    AND
						Detalle LIKE "%${req.query.query}%"
    ORDER BY p.Detalle ASC
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      console.log(err);
      res.send("Error recuperando productos");
    } else {
      res.json({ productos: regs });
    }
  });
});


router.post("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  INSERT INTO \`productos\`
  ( IdProducto, Detalle, Categoria_Id, Marca_Id, Costo, Proveedor_Id) values ('${req.body.id}','${req.body.detalle}', '${req.body.IdCategoria}','${req.body.IdMarca}','${req.body.costo}','${req.body.IdProveedor}');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error creando nuevo producto");
    } else {
      res.json({ productos: regs });
    }
  });
});

router.delete("/:IdProducto", function (req, res, next) {
  console.log("Request",req.params.IdProducto);
  
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
  SET detalle='${req.body.detalle}',
  Categoria_Id='${req.body.Categoria_Id}',
  Marca_Id='${req.body.Marca_Id}',
  Costo='${req.body.costo}',
  Proveedor_Id='${req.body.Proveedor_Id}'
  WHERE IdProducto='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error editando producto");
    } else {
      res.json({ productos: regs });
    }
  });
});

 

module.exports = router;
