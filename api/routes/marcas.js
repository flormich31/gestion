var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Request", req.query);
  const sql = String(req.query.query).split(' ').join('')
    == '' || req.query.query
    == 'undefined' || !req.query || !req.query.query ? `
    SELECT *
    FROM \`marcas\`
    WHERE FechaEliminacion IS NULL
    ORDER BY Marca ASC
  `: `
  SELECT *
  FROM \`marcas\`
  WHERE FechaEliminacion IS NULL
  AND
  Marca LIKE "%${req.query.query}%"
  ORDER BY Marca ASC
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      console.log(err);
      res.send("Error recuperando marcas");
    } else {
      res.json({ marcas: regs });
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
  INSERT INTO \`marcas\`
  ( IdMarca, Marca) values ('${codigo}','${req.body.marca}');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error creando nuevo marca");
    } else {
      res.json({ marca: regs });
    }
  });
});

router.delete("/:IdMarca", function (req, res, next) {
  console.log("Request", req.params.IdMarca);
  const sql = `
  UPDATE \`marcas\`
  SET FechaEliminacion= now()
  WHERE IdMarca = ?
  ORDER BY Marca ASC
  `;
  console.log("Delete IdMarca > " + req.params.IdMarca);
  global.dbConnection.query(sql, [req.params.IdMarca], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error eliminando marca");
    } else {
      res.json({ productos: regs });
    }
  });
});


router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`marcas\`
  SET Marca='${req.body.marca}'
  WHERE IdMarca='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error editando marca");
    } else {
      res.json({ Marcas: regs });
    }
  });
});



module.exports = router;
