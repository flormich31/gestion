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

router.post("/", function (req, res, next) {
  const sql = `
  INSERT INTO \`groups\`
  (id, author_id, name, code, created_at) values (5,1,'Grupo DIFERENTE', 102, '2022-11-19 14:31:20');
  `;
  global.dbConnection.query(sql, [], (err, regs) => {
    if (err) {
      res.send("Error creando nuevo grupo");
    } else {
      res.json({ groups: regs });
    }
  });
});

module.exports = router;
