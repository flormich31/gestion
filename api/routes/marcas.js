var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`marcas\`
    WHERE FechaEliminacion IS NULL
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
  console.log("Request",req.params.IdMarca);
  const sql = `
  DELETE FROM \`marcas\`
  WHERE IdMarca = ?
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
  UPDATE \`productos\`
  SET detalle='${req.body.IdProducto}'
  WHERE IdProducto='${req.body.IdProducto}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error editando producto");
    } else {
      res.json({ productos: regs });
    }
  });
});

 
 
module.exports = router;
