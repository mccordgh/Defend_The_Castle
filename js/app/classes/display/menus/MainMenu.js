define(['MenuState', 'GameState', 'KeyManager', 'Assets', 'State'], function(MenuState, GameState, KeyManager, Assets, State){

	var fontSize = 0, countSinceInput = 11, choicePosition = 0;

	var MainMenu = MenuState.extend({
		init:function(_handler){
			this.assets = Assets.getAssets('title');
			this.choices = ['play', 'leaderboards', 'credits'];
			this.handler = _handler;
		},
		tick: function(_dt){
			// console.log("countSinceInput", countSinceInput);
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

				//title screen
				_g.myDrawImage(this.assets.mainMenu, 0, 0, 1024, 640);
				//draw cursor
				_g.myDrawImage(this.assets.pointer, 260, 425 + (choicePosition * 65), 32, 32);
      }
		},
		getInput: function(_dt){
			if(this.handler.getKeyManager().up || this.handler.getKeyManager().upArrow) {
				choicePosition -= 1;
				if(choicePosition === -1)
					choicePosition = this.choices.length - 1;
				countSinceInput = 0;
			} 
			if (this.handler.getKeyManager().down || this.handler.getKeyManager().downArrow) {
				choicePosition += 1;
				if(choicePosition === this.choices.length)
					choicePosition = 0;
				countSinceInput = 0;
			}
			if(this.handler.getKeyManager().enter) {
				switch(this.choices[choicePosition]){
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


	return MainMenu;

});