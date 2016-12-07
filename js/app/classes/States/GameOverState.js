define(['State', 'KeyManager', 'MenuState'], function(State, KeyManager, MenuState){

	var fontSize;
	console.log("MENUSTATE:", MenuState);

	var GameOverState = State.extend({
		init:function(_handler){
			this._super(_handler);
		},
		tick: function(_dt){
			this.getInput(_dt);
			this.render()
		},
		render: function(_g){
      if (_g){
				_g.fillStyle = rgba(255,0,0,0.4);
				_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
      	_g.drawCenterText({
      		borderColor: 'white',
      		fillColor: 'green',
      		text: 'Game Over!',
      		fontSize: 56,
      		font: 'serif',
      		x: function() {return _g.centerTextOnX(this.text)},
      		y: function() {return _g.centerTextOnY() - (this.fontSize * 2)},
      	})
      	_g.drawCenterText({
      		borderColor: 'white',
      		fillColor: 'red',
      		text: 'Press Space Bar to return to Main Menu!',
      		fontSize: 56,
      		font: 'serif',
      		x: function() {return _g.centerTextOnX(this.text)},
      		y: function() {return _g.centerTextOnY()},
      	})
      }
		},
		getInput: function(_dt){
			if(this.handler.getKeyManager().space) {
				console.log("from gameover MenuState", MenuState);
				console.log("from gameover handler", this.handler)
				let menuState = new MenuState(this.handler);
				State.setState(menuState);
			} 
		}
	});


	return GameOverState;

});