var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`clientes\`
    WHERE FechaEliminacion IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
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
    "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


router.post("/", function (req, res, next) {
  const codigo = makeid(5);
  console.log(codigo);
  console.log(req.body);
  const sql = `
  INSERT INTO \`clientes\`
  ( IdCliente, Nombre, Domicilio, CodigoPostal,Celular,Email,Cuit) values ('${codigo}','${req.body.nombre}', '${req.body.domicilio}', '${req.body.codigoPostal}','${req.body.celular}','${req.body.email}','${req.body.cuit}');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error creando nuevo cliente");
    } else {
      res.json({ clientes: regs });
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

router.delete("/:IdCliente", function (req, res, next) {
  const sql = `
  DELETE FROM \`clientes\`
  WHERE IdCliente = ?
  `;
  console.log("Delete IdCliente > " + req.params.IdCliente);
  global.dbConnection.query(sql, [req.params.IdCliente], (err, regs) => {
    if (err) {
      res.send("Error eliminando cliente");
    } else {
      res.json({ clientes: regs });
    }
  });
});

module.exports = router;
