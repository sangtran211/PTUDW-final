const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const shopRouter = require('./routes/shop');
const aboutRouter = require('./routes/about');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

const Handlebars = require('handlebars');
const hbs = require('express-handlebars');
const hbsHelper = require('handlebars-helpers')();

const app = express();

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    modifyIndex: function(indexNum) {
      return indexNum + 1;
    },
    checkImageActive: function(indexNum) {
      if (indexNum + 1 > 1)
        return true;
    }
  }
}));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/malefashion' || process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
//We enabled the Listener
db.on('error', () => {
  console.error('Error occurred in db connection');
});

db.once('open', () => {
  console.log('DB Connection established successfully');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/shop', shopRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);

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
  res.render('./error/error');
});


module.exports = app;
