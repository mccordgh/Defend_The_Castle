define(['State', 'World'], function(State, World){

	var GameState = State.extend({
		init:function(_handler){
			this._super(_handler);
			this.world = new World("res/worlds/world1.wrd", _handler);
		},
		tick: function(_dt){
			this.world.tick(_dt);
		},
		render: function(_g){
			this.world.render(_g);
		}
	});

	return GameState;

});