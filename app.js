global.__base = __dirname;

const cors = require("cors");
const express = require("express");
const app = express();
var path = require("path");
const env = require("dotenv").config();

global.__basedir = __dirname;


// var corsOptions = {
//   origin: "http://localhost:3000",
// };
// app.use(cors(corsOptions));

var corsOptions = {
  origin: '*', 
};
app.use(cors(corsOptions));


app.set("view engine", "jade");
app.use(express.static("./frontend/my-app/build/index.html"));
app.use(express.json({ limit: '50mb' }));
//app.use(express.json());
// const swaggerUi =  require('swagger-ui-express');
// const YAML=require('yamljs');
// const swaggerDocument = YAML.load('./api-document.yaml');
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use("/assets", express.static(path.join(__dirname, 'frontend/build/assets')));

var indexRouter = require("./index"); 
var apiRouter = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
// app.use('/api-document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/*splat", indexRouter);

const port = normalizePort(process.env.PORT || "3000");
// var server = http.createServer(app);
// server.listen(port);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


