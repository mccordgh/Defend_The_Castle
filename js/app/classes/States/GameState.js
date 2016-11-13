define(['State', 'Player', 'World'], function(State, Player, World){

	var x = 0;
	var y = 0;

	var GameState = State.extend({
		init:function(_handler){
			this._super(_handler);
			this.player = new Player(_handler, 20, 20);
			this.world = new World("");
		},
		tick: function(_dt){
			this.world.tick(_dt);
			this.player.tick(_dt);
		},
		render: function(_g){
			this.world.render(_g);// Tile.tiles[1].render(_g, 0, 0);
			this.player.render(_g);
		}
	});

	return GameState;

});