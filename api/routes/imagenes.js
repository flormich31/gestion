require('dotenv').config();
var express = require("express");
var router = express.Router();

router.put("/", function (req, res, next) {
  console.log(req.body);
  const sql = `
  UPDATE \`productos\`
  SET ImagenURL='${req.body.ImagenURL}'
  WHERE IdProducto='${req.body.id}';
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    console.log("PUT Imag",sql);
    if (err) {
      res.send("Error editando producto");
    } else {
      res.json({ productos: regs });
    }
  });
});

 

module.exports = router;
