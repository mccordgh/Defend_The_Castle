define(['Class','Game'], function(Class,Game){

	let Launcher = Class.extend({
		init:function(_title, _width, _height) {
			let game = new Game(_title, _width, _height);
			game.start();
		}
	});

	return Launcher;

});