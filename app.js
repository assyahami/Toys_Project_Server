var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
dotenv.config({ path: "./config/.env" })
var products = require('./routes/products');
var usersRouter = require('./routes/users');
const { verifyToken } = require('./middleware/verifyAccessToken');

var app = express();


app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/products', products);
app.use('/api/v1/users', usersRouter);

app.set('port', 5000)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message:err.message,
    status:false
  });
  
});



module.exports = app;
