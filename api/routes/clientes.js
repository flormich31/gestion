var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`clientes\`
    WHERE FechaEliminacion IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      console.log(err);
      res.send("Error recuperando productos");
    } else {
      res.json({ clientes: regs });
    }
  });
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* router.post("/", function (req, res, next) {
  const codigo = makeid(5);
  console.log(codigo);
  console.log(req.body);
  const sql = `
  INSERT INTO \`groups\`
  ( author_id, name, code, created_at) values (1,'${req.body.name}', '${codigo}', now());
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error creando nuevo grupo");
    } else {
      res.json({ groups: regs });
    }
  });
});

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
