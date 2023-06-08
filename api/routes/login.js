var express = require("express");
const cors = require('cors');
var router = express.Router();

router.use(cors());

router.post("/", function (req, res, next) {
    console.log("req body es", req.body);
  
    const sql =  `
    SELECT * FROM \`usuarios\` 
    WHERE Usuario='${req.body.usuario}'  AND Clave='${req.body.clave}'
    `;
    global.dbConnection.query(sql, [], (err, regs) => {
      console.log(sql);
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error en el servidor' });
        res.send({err: err});
      } 
      
      if (regs.length > 0 ){
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
        console.log("resultados", regs);
      } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    });
  });
  
  //router.listen(9000, () => console.log('API is running on http://localhost:9000/login'));

  module.exports = router;