const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const server = express();

// Configuraciones del servidor
server.set('port', 4500);

// Middlewares
server.use(morgan('dev'));


server.use(multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        limits: {fileSize: 10 * 1024 * 1024},
        filename: function (req, file, cb) {
            cb(null,`${file.originalname}`);
        }
    })
}).single('file'));

// Rutas del server
server.get('/', async(req, res)=> {
    res.send('Esta es una prueba');
});

server.post('/', async(req, res)=> {
    console.log(req.file);
    res.send('Archivo recibido exitosamente');
});

// Inicializacion del server
server.listen(server.get('port'), async()=> {
    console.log(`El server esta corriendo en el puerto: ${server.get('port')}`);

})