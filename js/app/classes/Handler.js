define(['Class'],function(Class){

	var game;

	var Handler = Class.extend({
		init:function(_game){
			game = _game;
		},
		getWidth: function() {
			return game.getWidth();
		},
		getHeight: function() {
			return game.getHeight();
		},
		getKeyManager: function() {
			return game.getKeyManager();
		}
	});

	return Handler;

});