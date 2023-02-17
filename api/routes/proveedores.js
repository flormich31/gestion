var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`proveedores\`
    WHERE FechaEliminacion IS NULL
    ORDER BY RazonSocial ASC
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
  INSERT INTO \`proveedores\`
  ( IdProveedor, RazonSocial, Domicilio, Web) values ('${codigo}','${req.body.razonSocial}', '${req.body.domicilio}', '${req.body.web}');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(req.body);
    if (err) {
      res.send("Error creando nuevo proveedor");
    } else {
      res.json({ proveedores: regs });
    }
  });
});

router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`proveedores\`
  SET RazonSocial='Grupo SUPER Pro'
  WHERE IdProveedor='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error editando proveedor");
    } else {
      res.json({ proveedores: regs });
    }
  });
});

router.delete("/:IdProveedor", function (req, res, next) {
  const sql = `
  DELETE FROM \`proveedores\`
  WHERE IdProveedor = ?
  `;
  console.log("Delete IdProveedor > " + req.params.IdProveedor);
  global.dbConnection.query(sql, [req.params.IdProveedor], (err, regs) => {
    if (err) {
      res.send("Error eliminando proveedor");
    } else {
      res.json({ proveedores: regs });
    }
  });
});

module.exports = router;
