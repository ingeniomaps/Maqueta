//Variables de las rutas y controladores a utilizar
var routes = require('./controladores/web');

//Modulo que recibe los datos necesarios para la creacion de rutas
module.exports = function(app){
	//Creacion de las rutas que manejara el sitio web
	app.get('/', routes.index);
}
