require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors"); 

var indexRouter = require("./routes/index");
var uploadRouter = require("./routes/upload");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var productosRouter = require("./routes/productos");
var comprasRouter = require("./routes/compras");
var ventasRouter = require("./routes/ventas");
var categoriasRouter = require("./routes/categorias");
var marcasRouter = require("./routes/marcas"); 
var clientesRouter = require("./routes/clientes");
var proveedoresRouter = require("./routes/proveedores");
var datosVentaRouter = require("./routes/datosVenta");
var listadoVentasRouter = require("./routes/listadoVentas");
var totalVentasRouter = require("./routes/totalVentas");
var vendedoresRouter = require("./routes/vendedores");
var formaPagoRouter = require("./routes/formaPago");
var testAPIRouter = require("./routes/testAPI");

/* Conexión a mysql */
var mysql = require("mysql");
var dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dbConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("MySql connected as id " + dbConnection.threadId);
});

global.dbConnection = dbConnection;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/upload", uploadRouter);
app.use("/login", loginRouter);
app.use("/productos", productosRouter);
app.use("/categorias", categoriasRouter);
app.use("/marcas", marcasRouter);
app.use("/clientes", clientesRouter);
app.use("/proveedores", proveedoresRouter);
app.use("/vendedores", vendedoresRouter);
app.use("/formaPago", formaPagoRouter);
app.use("/testAPI", testAPIRouter);
app.use("/compras", comprasRouter);
app.use("/ventas", ventasRouter);
app.use("/datosVenta", datosVentaRouter);
app.use("/listadoVentas", listadoVentasRouter);
app.use("/totalVentas", totalVentasRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
