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
/**
 * @description Na malince istnieje plik environment.js w ktorym zadeklarowana jest zmianna po ktorej aplikacja rozpoznaje, ze
 *              jest uruchomiona na srodowisku raspberry. W ty miejscu kod stara sie okreslic, czy taki plik istnieje
 */
try {
    var konfiguracja_env = require('./environment.js');
    console.log("Plik konfiguracyjny znaleziono");
} catch (err) {
    console.error("Nie znaleziono pliku konfiguracyjnego");
}
/**
 * @description Podobnie jak wyzej, z ta roznica, ze ta zmienna nalezy do Daniel Słaby (ponieważ ma on adres sieci wewnetrznej a nie po DNS).
 */
try {
    var nazwaTylkoDoZaladowaniaPliku = require('./env.js');
    console.log("Plik konfiguracyjny znaleziono");
} catch (err) {
    console.error("Nie znaleziono pliku konfiguracyjnego");
}


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
// Link do glyphikonek dla bootstrapa
app.use("/fonts", express.static(path.join(__dirname, './node_modules/bootstrap/fonts')));

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