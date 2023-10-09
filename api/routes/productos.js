require('dotenv').config();
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Request", req.query);
  const limit = req.query?.limit ? `LIMIT ${req.query.limit}` : '';
  const sql = String(req.query.query).split(' ').join('')
    == '' || req.query.query
    == 'undefined' || !req.query || !req.query.query ? `
  SELECT p.IdProducto, p.Imagen, 
    CONCAT('${process.env.FRONTOFFICE}productos/', p.ImagenURL) AS ImagenURL,
    p.Detalle, p.Codigo, p.Categoria_Id, p.Stock, p.Descuento, p.Costo, p.PrecioMenor, p.PrecioMayor, 
    P.Observacion, p.Marca_Id, p.Proveedor_Id, m.marca, c.categoria, r.RazonSocial,
    p.FechaCreacion, p.FechaModificacion
    FROM \`productos\` as p 
    INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
    INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
    INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
    WHERE p.FechaEliminacion IS NULL
    ORDER BY p.Detalle ASC
   
  `: `
    SELECT p.IdProducto,  p.Imagen,  
    CONCAT('${process.env.FRONTOFFICE}productos/', p.ImagenURL) AS ImagenURL, 
    p.Detalle, p.Codigo, p.Categoria_Id,p.Stock, p.Descuento, p.Costo, p.PrecioMenor, p.PrecioMayor, P.Observacion, 
    p.Marca_Id, p.Proveedor_Id, m.marca, c.categoria, r.RazonSocial,
    p.FechaCreacion, p.FechaModificacion,
    p.Busqueda, CONCAT(p.IdProducto, ' ', p.Busqueda) AS IdProductoBusqueda
    FROM \`productos\` as p 
    INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
    INNER JOIN \`categorias\` as c on c.IdCategoria = p.Categoria_Id
    INNER JOIN \`proveedores\` as r on r.IdProveedor = p.Proveedor_Id
    WHERE 
    p.FechaEliminacion IS NULL
    AND
     (
      IdProducto LIKE "%${req.query.query}%"
      OR
			Busqueda LIKE "%${req.query.query}%"
     )
    ORDER BY p.Detalle ASC 
    ${limit}
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

function makeid(length) {
  var result = "";
  var characters =
    "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


router.post("/", function (req, res, next) {
  const codigo = makeid(5);
  console.log("BODY CREATE PROD", req.body);
  const sql = `
  INSERT INTO \`productos\`
  ( IdProducto, ImagenURL, Detalle, Codigo, Categoria_Id, Marca_Id, PrecioMenor,
 Proveedor_Id, FechaCreacion) values ('${codigo}', '${req.body.ImagenURL}','${req.body.detalle}','${req.body.Codigo}', 
    '${req.body.IdCategoria}','${req.body.IdMarca}', '${req.body.PrecioMenor}','${req.body.IdProveedor}', NOW());
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
  console.log("Request", req.params.IdProducto);

  const sql = `
  UPDATE \`productos\`
  SET FechaEliminacion= now()
  WHERE IdProducto = ?
  `;
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
  Codigo='${req.body.Codigo}',
  Categoria_Id='${req.body.Categoria_Id}',
  Marca_Id='${req.body.Marca_Id}',
  Descuento='${req.body.Descuento}',
  Costo='${req.body.costo}',
  PrecioMenor='${req.body.PrecioMenor}',
  PrecioMayor='${req.body.PrecioMayor}',
  Observacion='${req.body.Observacion}',
  Proveedor_Id='${req.body.Proveedor_Id}',
  FechaModificacion=NOW()
  WHERE IdProducto='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log("sql", sql);
    if (err) {
      res.send("Error editando producto");
    } else {
      res.json({ productos: regs });
    }
  });
});



module.exports = router;
