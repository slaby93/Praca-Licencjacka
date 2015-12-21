/**
 * Created by atulr on 05/07/15.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/user');
var cms = require('./routes/cms');

var app = express();

try {
    var konfiguracja_env = require('environment.js');
    console.log("Plik konfiguracyjny znaleziono");
} catch (err) {
    console.error("Nie znaleziono pliku konfiguracyjnego");
}


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);
app.use('/user', users);
app.use('/cms', cms);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
//================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error' + err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send('error' + err.message);
});


module.exports = app;