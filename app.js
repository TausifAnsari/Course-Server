var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
const adminRouter = require('./routes/admin')
const faculty = require('./routes/faculty')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter = require('./routes/courseRouter');
var promoRouter = require('./routes/promoRouter');
var facultyRouter = require('./routes/facultyRouter');
const uploadRouter = require('./routes/uploadRouter');
const enrollRouter = require('./routes/enrollRouter');
var commentRouter = require('./routes/commentRouter');
var urlRouter = require('./routes/urlRouter');


var app = express();


//db config
const db=require('./config/keys').MongoURI;


//connection
mongoose.connect(db, { useNewUrlParser:true})
.then(() => console.log('mongo db connected..'))
.catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));


app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/faculty', faculty);


app.use(express.static(path.join(__dirname, 'public')));


app.use('/courses',courseRouter);
app.use('/promotions',promoRouter);
app.use('/instructor',facultyRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites',enrollRouter);
app.use('/comments',commentRouter);
app.use('/urls',urlRouter);

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
