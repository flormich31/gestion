var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`forma_pago\`
    WHERE FechaEliminacion IS NULL
    ORDER BY IdFormaPago ASC
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



module.exports = router;
