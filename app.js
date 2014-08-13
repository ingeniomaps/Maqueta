//Modulos necesarios
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();


module.exports = function(config){

    //Configuracion de express
    app.set('views', path.join(__dirname, 'vistas'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);

    /// Error 404
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    //Errores
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            app.use(logger('dev'));
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    //Permite que varios procesos de nodejs compartan la conexion tcp
    app.use(function(err, req, res, next) {
        app.use(require('raven').middleware.express(config.sentry_dsn));
        /*app.use(function (err, req, res, next) {
           res.status(500).sendfile(__dirname+'/vistas/500.html');
        });*/
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    var routes = require('./routes')(app);

    module.exports = app;

    return app;
}


