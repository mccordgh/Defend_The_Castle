define(['State', 'GameState', 'KeyManager', 'Assets', 'MainMenu'], function(State, GameState, KeyManager, Assets, MainMenu){

	let fontSize = 0;

	let MenuState = State.extend({
		init:function(_handler){
			this._super(_handler);
			this.menu = new MainMenu(_handler);
		},
		tick:function(_dt){
			this.menu.tick();
		},
		render:function(_g){
			this.menu.render();
		}
});

	return MenuState;

});