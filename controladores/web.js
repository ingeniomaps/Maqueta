//Configuramos las rutas donde llegara el usuario
exports.index = function(req, res){
	res.render('inicio', { title: 'Maqueta' });
};
