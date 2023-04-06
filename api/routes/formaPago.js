var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`forma_pago\`
    WHERE FechaEliminacion IS NULL
    ORDER BY FormaPago ASC
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      console.log(err);
      res.send("Error recuperando formas de pago");
    } else {
      res.json({ formaPago: regs });
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
  INSERT INTO \`vendedores\`
  ( IdVendedor, Nombre, Domicilio, CodigoPostal,Celular,Correo) values ('${codigo}','${req.body.nombre}', '${req.body.domicilio}', '${req.body.codigoPostal}','${req.body.celular}','${req.body.email}');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log(sql);
    if (err) {
      res.send("Error creando nuevo vendedor");
    } else {
      res.json({ vendedores: regs });
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

router.delete("/:IdVendedor", function (req, res, next) {
  const sql = `
  DELETE FROM \`vendedores\`
  WHERE IdVendedor = ?
  `;
  console.log("Delete IdVendedor > " + req.params.IdVendedor);
  global.dbConnection.query(sql, [req.params.IdVendedor], (err, regs) => {
    if (err) {
      res.send("Error eliminando vendedor");
    } else {
      res.json({ vendedores: regs });
    }
  });
});

module.exports = router;
