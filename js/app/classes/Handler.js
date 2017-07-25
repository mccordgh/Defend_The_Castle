define(['Class'],function(Class){

	let game, world, leaderBoards = [], soundManager;

	let Handler = Class.extend({
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
		},
		getGameCamera: function() {
			return game.getGameCamera();
		},
		getWorld: function(){
			return world;
		},
		setWorld: function(_world){
			world = _world;
		},
		getGame: function(_name){
			return game;
		},
		getLeaderBoards(){
			return leaderBoards;
		},
		setLeaderBoards(_LB){
			leaderBoards = _LB;
		},
		getSoundManager(){
			return soundManager;
		},
		setSoundManager(_sm){
			soundManager = _sm;
		}
	
	});

	return Handler;

});