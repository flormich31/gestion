var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`productos\`
    WHERE FechaEliminacion IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
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
  ( IdProducto, Detalle, Categoria_Id, Marca_Id, Costo, Proveedor_Id) values ('${req.body.id}','${req.body.detalle}', '${req.body.categoriaId}','${req.body.marcaId}','${req.body.costo}','${req.body.proveedorId}');
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

/* 
router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`groups\`
  SET name='Grupo SUPER Pro'
  WHERE id='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error editando grupo");
    } else {
      res.json({ groups: regs });
    }
  });
});

router.delete("/:id", function (req, res, next) {
  const sql = `
  DELETE FROM \`groups\`
  WHERE id = ?
  `;
  console.log("Delete id > " + req.params.id);
  global.dbConnection.query(sql, [req.params.id], (err, regs) => {
    if (err) {
      res.send("Error eliminando grupo");
    } else {
      res.json({ groups: regs });
    }
  });
}); */

module.exports = router;
