var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var autorRouter = require('./domain/autor/interface/autor.route');
var feedRouter = require('./domain/feed/interface/feed.route');
var messengerRouter = require('./domain/messenger/interface/messenger.route');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'presentation/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'presentation/public')));

app.use('/', autorRouter);
app.use('/messenger', messengerRouter);
app.use('/feed', feedRouter);

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
