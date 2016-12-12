define(['State', 'GameState', 'KeyManager', 'Assets'], function(State, GameState, KeyManager, Assets){

	var fontSize = 0, countSinceInput = 11;

	var MenuState = State.extend({
		init:function(_handler){
			this._super(_handler);
			this.assets = Assets.getAssets('title');
			this.choices = ['play', 'leaderboards', 'credits'];
			this.choicePosition = 0;
		},
		tick: function(_dt){
			countSinceInput++;
			if (countSinceInput > 10)
				this.getInput(_dt);
			this.render();
		},
		render: function(_g){
      if (_g){
      	//black background
				_g.fillStyle = "black";
				_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());

				_g.myDrawImage(this.assets.mainMenu, 0, 0, 1024, 640);
				_g.myDrawImage(this.assets.pointer, 260, 425 + (this.choicePosition * 65), 32, 32);

				//Old code for printing text to screen at start
      	// _g.drawText({
      	// 	borderColor: 'white',
      	// 	fillColor: 'red',
      	// 	text: 'Defend the Castle!',
      	// 	fontSize: 64,
      	// 	font: 'serif',
      	// 	x: function() {return _g.centerTextOnX(this.text);},
      	// 	y: function() {return _g.centerTextOnY() - (this.fontSize * 2);},
      	// });
      	// _g.drawText({
      	// 	borderColor: 'white',
      	// 	fillColor: 'green',
      	// 	text: 'Press Space Bar to start the Game!',
      	// 	fontSize: 64,
      	// 	font: 'serif',
      	// 	x: function() {return _g.centerTextOnX(this.text);},
      	// 	y: function() {return _g.centerTextOnY();},
      	// });
      }
		},
		getInput: function(_dt){
			if(this.handler.getKeyManager().up || this.handler.getKeyManager().upArrow) {
				this.choicePosition -= 1;
				if(this.choicePosition === -1)
					this.choicePosition = this.choices.length - 1;
				countSinceInput = 0;
			} 
			if (this.handler.getKeyManager().down || this.handler.getKeyManager().downArrow) {
				this.choicePosition += 1;
				if(this.choicePosition === this.choices.length)
					this.choicePosition = 0;
				countSinceInput = 0;
			}
			if(this.handler.getKeyManager().enter) {
				switch(this.choices[this.choicePosition]){
					case 'play':
						var gameState = new GameState(this.handler);
						State.setState(gameState);	
						break;		
					case 'leaderboards':
						console.log("show leaderboards!");
						break;		
					case 'credits':
						console.log("show credits!");
						break;		
				}
			} 
		}
	});


	return MenuState;

});