var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Request", req.query);

  const sql =  `
  SELECT v.IdVenta, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, vd.Nombre, v.Pagado, c.Nombre_Cliente, f.FormaPago, v.Total, v.Observacion, v.Descuento , CASE WHEN v.Entregado = 1 THEN 'Si' ELSE 'No' END AS Entregado
  FROM \`ventas\` as v 
  INNER JOIN \`vendedores\` as vd on vd.IdVendedor = v.Vendedor_Id
  INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
  INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
  WHERE v.FechaEliminacion IS NULL
  ORDER BY v.Fecha ASC
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log("ventas:",sql);
    if (err) {
      console.log(err);
      res.send("Error recuperando productos");
    } else {
      res.json({ ventas: regs });
      console.log( "todas las ventas", regs );
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
