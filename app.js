const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const booksRouter = require('./routes/books');
const shopsRouter = require('./routes/shop');
const productsRouter = require('./routes/product');
const aboutsRouter = require('./routes/about');
const blogsRouter = require('./routes/blog');
const contactsRouter = require('./routes/contact');

const Handlebars = require('handlebars');
const hbs = require('express-handlebars');
const hbsHelper = require('handlebars-helpers')();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',hbs({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir: path.join(__dirname,'views'),
  partialsDir: path.join(__dirname,'views/partials'),
  helpers: {
    modifyIndex: function(indexNum){
      return indexNum +1;
    },
    checkImageActive: function(indexNum){
      if (indexNum+1>1)
        return true;
    }
  }
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/books', booksRouter);
app.use('/shop', shopsRouter);
app.use('/product', productsRouter);
app.use('/about', aboutsRouter);
app.use('/blog', blogsRouter);
app.use('/contact', contactsRouter);

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
