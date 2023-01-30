var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`proveedores\`
    WHERE FechaEliminacion IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      console.log(err);
      res.send("Error recuperando proveedores");
    } else {
      res.json({ proveedores: regs });
    }
  });
});



/* router.put("/", function (req, res, next) {
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
