var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`categorias\`
    WHERE FechaEliminacion IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      console.log(err);
      res.send("Error recuperando categorias");
    } else {
      res.json({ categorias: regs });
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
  console.log(req.body);;
  const sql = `
  INSERT INTO \`categorias\`
  ( IdCategoria, Categoria) values ('${codigo}','${req.body.categoria}');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error creando nueva categoria");
    } else {
      res.json({ categorias: regs });
    }
  });
});

router.delete("/:IdCategoria", function (req, res, next) {
  console.log("Request",req.params.IdProducto);
  const sql = `
  DELETE FROM \`categorias\`
  WHERE IdCategoria = ?
  `;
  //console.log("Delete IdCategoria > " + req.params.IdCategoria);
  global.dbConnection.query(sql, [req.params.IdCategoria], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error eliminando categoria");
    } else {
      res.json({ categorias: regs });
    }
  });
});


router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`categorias\`
  SET Categoria='${req.body.categoria}'
  WHERE IdCategoria='${req.body.IdCategoria}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error editando categoria");
    } else {
      res.json({ categorias: regs });
    }
  });
});

 

module.exports = router;
