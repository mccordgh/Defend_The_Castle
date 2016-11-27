define(['State', 'GameState'], function(State, GameState){

	var MenuState = State.extend({
		init:function(_handler){
			this._super(_handler);
		},
		tick: function(_dt){
		},
		render: function(_g){

		}
		// click: function(){
		// 	var gameState = new GameState(this.handler);
		// 	State.setState(gameState);			
		// }
	});


	return MenuState;

});