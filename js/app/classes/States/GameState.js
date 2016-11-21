define(['State', 'Player', 'World'], function(State, Player, World){

	var x = 0;
	var y = 0;

	var GameState = State.extend({
		init:function(_handler){
			this._super(_handler);
			this.world = new World("res/worlds/world1.wrd", _handler);
			this.player = new Player(_handler, this.world.spawnX, this.world.spawnY);
		},
		tick: function(_dt){
			this.world.tick(_dt);
			this.player.tick(_dt);
		},
		render: function(_g){
			this.world.render(_g);
			this.player.render(_g);
		}
	});

	return GameState;

});