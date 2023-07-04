var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    console.log("Request", req.query);

    const sql =  `
  SELECT d.IdDetalleVentas, v.IdVenta, vv.Nombre, DATE_FORMAT(v.Fecha, "%d-%m-%Y %r ") as Fecha, c.Nombre_Cliente, f.FormaPago, 
  v.Entregado, v.Pagado, v.Observacion, p.IdProducto, p.Detalle, m.Marca, d.cantidad, p.PrecioMenor, d.PrecioVenta, v.Descuento, 
  v.Total, v.Subtotal
    FROM \`detalle_ventas\` as d 
    INNER JOIN \`ventas\` as v on v.IdVenta = d.Venta_Id
    INNER JOIN \`clientes\` as c on c.IdCliente = v.Cliente_Id
    INNER JOIN \`usuarios\` as vv on vv.Id = v.Usuario_Id
    INNER JOIN \`forma_pago\` as f on f.IdFormaPago = v.FormaPago_Id
    INNER JOIN \`productos\` as p on p.IdProducto = d.Producto_Id
    INNER JOIN \`marcas\` as m on m.IdMarca = p.Marca_Id
    WHERE d.FechaEliminacion IS NULL
  AND IdVenta LIKE "%${req.query.query}%" 
  `;
    global.dbConnection.query(sql, [], (err, regs) => {
        console.log(sql);
        if (err) {
            console.log(err);
            res.send("Error recuperando detalle de venta");
        } else {
            res.json({ prodventas: regs });
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
