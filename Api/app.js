//const bearerToken = require('express-bearer-token');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('dotenv').load();
//knex package qu'on peut l'utiliser.
var app = express();


const logger = require('./config/logger');
//config/logger')
const db =require('./config/db.config');


const Cors = require("cors");
app.use(Cors());

//body parser
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bearerToken(
//   {
//     bodyKey: 'access_token',
//     queryKey: 'access_token',
//     headerKey: 'Bearer',
//     reqKey: 'token'
//   }
// ));
// app.use(function (req, res) {
//   res.send('Token '+req.token);
// });

db.Sequelize;

require('./routes/Routes.js')(app);
 

var port = process.env.PORT || 4000;
var server = app.listen(port, function() {
  logger.info('Express server listening on port ' + port);
});

module.exports = app;