var express = require("express");
var multer = require("multer");

var router = express.Router();
const sharp = require('sharp');
const fs = require('fs');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'c:/nginx/html/productos'); // Directorio donde se guardarán los archivos  opcion vscode cb(null, '../client/public/productos'  opcion servidor: 'c:/nginx/html/productos' 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre de archivo único
  }
});

var upload = multer({ storage: storage });

// Rutas del server
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  console.log("Esta es una prueba")
});

router.post("/", upload.single('file'), (req, res, err) => {
  if (req.file) {
    res.send('Archivo subido con éxito---');
    console.log('Archivo subido con éxito----')
    console.log(req.file);
    sharp(req.file.path)
      .resize(400)
      .withMetadata()
      .toBuffer(function (err, buffer) {
        fs.writeFile(req.file.path, buffer,(err)=>{});
      });
    // .toFile(req.file.path)
  } else {
    res.status(400).send('No se ha seleccionado ningún archivo');
    console.log('no')
    console.log('err', err)
  }
});


/* router.post("/", upload.single('file'), (req, res,err) => {
  if (req.file) {
    res.send('Archivo subido con éxito');
    console.log('Archivo subido con éxito')
  } else {
    res.status(400).send('No se ha seleccionado ningún archivo');
    console.log('no')
    console.log('err',err)
  }
});
*/


module.exports = router;