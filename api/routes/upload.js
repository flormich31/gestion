var express = require("express");
var multer = require("multer");

var router = express.Router();
const sharp = require('sharp');
const fs = require('fs');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/productos'); // Directorio donde se guardarán los archivos   cb(null, '../client/public/productos'  'c:/nginx/html/productos' '../nginx/html/productos'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre de archivo único
  }
});

var upload = multer({ storage: storage });

// Rutas del server
/* router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  console.log("Esta es una prueba")
}); */

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
    ${limit}
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

router.post("/", upload.single('file'), (req, res, err) => {
  if (req.file) {
    res.send('Archivo subido con éxito---');
    console.log('Archivo subido con éxito----')
    console.log(req.file);
    sharp(req.file.path)
      .resize(400)
      .withMetadata()
      .toBuffer(function (err, buffer) {
        fs.writeFile(req.file.path, buffer,(err)=>{});
      });
    // .toFile(req.file.path)
  } else {
    res.status(400).send('No se ha seleccionado ningún archivo');
    console.log('no')
    console.log('err', err)
  }
});


/* router.post("/", upload.single('file'), (req, res,err) => {
  if (req.file) {
    res.send('Archivo subido con éxito');
    console.log('Archivo subido con éxito')
  } else {
    res.status(400).send('No se ha seleccionado ningún archivo');
    console.log('no')
    console.log('err',err)
  }
});
*/


module.exports = router;