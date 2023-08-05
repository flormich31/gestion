var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = String(req.query.query).split(' ').join('')
  == '' || req.query.query
  == 'undefined' || !req.query || !req.query.query ? `
    SELECT *
    FROM \`usuarios\`
    WHERE FechaEliminacion IS NULL 
    ORDER BY Nombre ASC
  `:`
  SELECT *
  FROM \`usuarios\`
  WHERE FechaEliminacion IS NULL 
  AND
  Nombre LIKE "%${req.query.query}%"
  ORDER BY Nombre ASC
`;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      console.log(err);
      res.send("Error recuperando usuarios");
    } else {
      res.json({ usuarios: regs });
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
  INSERT INTO \`usuarios\`
  ( Id, Nombre, Apellidos, FechaCreacion) values ('${codigo}','${req.body.nombre}', '${req.body.apellido}', now());
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error creando nuevo usuarios");
    } else {
      res.json({ usuarios: regs });
    }
  });
});

router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`usuarios\`
  SET Nombre='${req.body.nombre}',
  Apellidos='${req.body.apellido}'
  WHERE Id='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error editando usuarios");
    } else {
      res.json({ usuarios: regs });
    }
  });
});

router.delete("/:IdVendedor", function (req, res, next) {
  const sql = `
  UPDATE \`usuarios\`
  SET FechaEliminacion= now()
  WHERE Id = ?
  `;
  console.log("Delete Id > " + req.params.Id);
  global.dbConnection.query(sql, [req.params.Id], (err, regs) => {
    if (err) {
      res.send("Error eliminando usuario");
    } else {
      res.json({ usuarios: regs });
    }
  });
});

module.exports = router;
