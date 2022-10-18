var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const sql = `
    SELECT *
    FROM \`groups\`
    WHERE deleted_at IS NULL
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error recuperando grupos");
    } else {
      res.json({ groups: regs });
    }
  });
});

module.exports = router;
