var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    const sql =  `
    SELECT DISTINCT c.Total, c.IdCompra, c.FechaEliminacion
      FROM \`compras\` as c
      INNER JOIN \`detalle_compras\` as d on d.Compra_Id = c.IdCompra
      WHERE c.FechaEliminacion IS NULL
      AND IdCompra LIKE 	"%${req.query.query}%"
    `;
    global.dbConnection.query(sql, [], (err, regs) => {
      console.log(sql);
      if (err) {
        console.log(err);
        res.send("Error recuperando TOTAL de la compra");
      } else {
        res.json({ totalCompra: regs });
      }
    });
  });
  

  module.exports = router;