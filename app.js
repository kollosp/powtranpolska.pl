var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

require('./global.service')

var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var usersRouter = require('./routes/users');
var middlewareRouter = require('./routes/middleware');
var pricesRouter = require('./routes/prices');

var app = express();

const db = require('./models/index');
const queries = require('./databaseQueries');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', (req, res, next) => {
  console.log("url: ", req.url);
  next()
});

app.use('/', middlewareRouter);
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/prices', pricesRouter);
app.use('/users', usersRouter);


app.get("/database", (req, res) => {

    queries.findSubcategoriesFor(db, 1, sub => {
        res.send(sub)
    })
    
    console.log("dataabase");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get("*", (req, res) => {

})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development

    req.render.errorCode = "404"
    req.render.errorDesc = "Żądana strona nie występuje w naszym serwisie"

    res.status(err.status || 500);
    res.render('errorMessage', {render: req.render});   
    
});

module.exports = app;
