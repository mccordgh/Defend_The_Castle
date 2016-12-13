define(['Class'],function(Class){

	var game, world, leaderBoards;

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
		getStateByName: function(_name){
			return game.getStateByName(_name);
		},
		getLeaderBoards(){
			return leaderBoards;
		},
		setLeaderBoards(_LB){
			leaderBoards = _LB;
		}
	
	});

	return Handler;

});