define(['State', 'GameState', 'KeyManager'], function(State, GameState, KeyManager){

	var fontSize;

	var MenuState = State.extend({
		init:function(_handler){
			this._super(_handler);
		},
		tick: function(_dt){
			this.getInput(_dt);
			this.render();
		},
		render: function(_g){
      if (_g){
				_g.fillStyle = "black";
				_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
      	_g.drawCenterText({
      		borderColor: 'white',
      		fillColor: 'red',
      		text: 'Defend the Castle!',
      		fontSize: 56,
      		font: 'serif',
      		x: function() {return _g.centerTextOnX(this.text);},
      		y: function() {return _g.centerTextOnY() - (this.fontSize * 2);},
      	});
      	_g.drawCenterText({
      		borderColor: 'white',
      		fillColor: 'green',
      		text: 'Press Space Bar to start the Game!',
      		fontSize: 56,
      		font: 'serif',
      		x: function() {return _g.centerTextOnX(this.text);},
      		y: function() {return _g.centerTextOnY();},
      	});
      }
		},
		getInput: function(_dt){
			if(this.handler.getKeyManager().space) {
				var gameState = new GameState(this.handler);
				State.setState(gameState);			
			} 
		}
	});


	return MenuState;

});