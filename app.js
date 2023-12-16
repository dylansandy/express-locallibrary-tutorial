//const { MongoClient } = require('mongodb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var coolRouter = require('./routes/users/cool');
const catalogRouter = require("./routes/catalog"); 
//const compression = require("compression");
//const helmet = require("helmet");


const  app = express();
// Set up mongoose connection
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const mongoDB = "insert_your_database_url_here";
const dev_db_url =
  "mongodb+srv://your_user_name:your_password@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.connect(mongoDB,{ useNewUrlParser: true });
const client = new MongoClient( mongoDB);
//const db = mongoose.connectiondb.on("error",console.error.bind(console,'MongoDb connect error:'));
//const dbName = 'local_library';


main().catch((err) => console.log(err));
async function main() {
  console.log("connect to");
  await mongoose.connect(mongoDB);
 // const db = mongoose.connectiondb.on('err',console.error.bind(console,'test'));
 //  await client.connect();
//  const db = client.db(dbName); 
//  const db= mongoDB.db('local_library');
  //const db = client.db(dbName);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter); 
//app.use('/users/cool', coolRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
