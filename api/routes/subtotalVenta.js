var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    const sql =  `
    SELECT DISTINCT v.Subtotal, v.IdVenta, v.FechaEliminacion
      FROM \`ventas\` as v
      INNER JOIN \`detalle_ventas\` as d on d.Venta_Id = v.IdVenta
      WHERE v.FechaEliminacion IS NULL
      AND IdVenta LIKE 	"%${req.query.query}%"
    `;
    global.dbConnection.query(sql, [], (err, regs) => {
      console.log(sql);
      if (err) {
        console.log(err);
        res.send("Error recuperando Subtotal de la venta");
      } else {
        res.json({ subtotalVenta: regs });
      }
    });
  });
  

  module.exports = router;