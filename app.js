var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('dotenv').config();
var session = require('express-session');
var pool = require('./models/bd');
var fileUpload = require('express-fileupload');

var indexRouter= require('./routes/index');
var contactoRouter= require('./routes/contacto');
var tiendaRouter= require('./routes/tienda');
var loginRouter= require('./routes/admin/login');
var homeRouter= require('./routes/admin/home');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));


app.use(session({
  secret: 'h2j13hk121jk4g15ikb4124jhu30da',
  resave:false,
  saveUninitialized:true
}));

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
};

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/temp/'
}));


app.use('/', indexRouter);
app.use('/contacto', contactoRouter);
app.use('/tienda', tiendaRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/home', secured, homeRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/agregar', loginRouter);

app.get('/prueba', function(req, res,next){
  res.send('pagina de prueba');
});
app.get('/contacto', function(req, res, next){
    res.render('/contacto');
  });
app.get('/tienda', function(req, res, next){
    res.render('/tienda');
  });
app.get('/admin/login', function(req, res, next){
    res.render('/admin/login');
  });
app.get('/admin/home', function(req, res, next){
    res.render('/admin/home');
});


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

module.exports = app
