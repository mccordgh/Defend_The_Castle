define(['Class','Game'], function(Class,Game){

	var Launcher = Class.extend({
		init:function(_title, _width, _height) {
			var game = new Game(_title, _width, _height);
			game.start();
		}
	});

	return Launcher;

});