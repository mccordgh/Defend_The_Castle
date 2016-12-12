define(['MenuState', 'GameState', 'KeyManager', 'Assets', 'State'], function(MenuState, GameState, KeyManager, Assets, State){

	const CURRENT_PATH = window.location.href;
	var fontSize = 0, countSinceInput = 11, choicePosition = 0, leaderboardsLoaded = false;
	var leaderBoard = [], credits = [];

	var MainMenu = MenuState.extend({
		init:function(_handler){
			//Load Leaderboards
			$.ajax({
			  dataType: "json",
			  url: CURRENT_PATH + "res/leaderboard/leaderboard.json",
			  success: function(data){
			  	console.log("success:", data);
			  },
			  error: function(data){
			  	console.log("error:", data);
			  }
			}).done(function(data) {
			  leaderBoard = data.leaderboards;
			});

			//Load Credits
			credits = getCredits();

			this.assets = Assets.getAssets('title');
			this.choices = ['play', 'leaderboards', 'credits'];
			this.handler = _handler;
			this.view = 'menu';
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
				_g.fillStyle = "#333";
				_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());

	      switch(this.view){
	      	case 'leaderboards':
	      		let spaces = "xxx";
		      	for (let i = 0; i < leaderBoard.length; i++){
			      		let yDraw = 75 + (i * 55);
			      		if (i < 9) {
			      			spaces = "  ";
			      		} else {
			      			spaces = " ";
			      		}
			      		_g.drawText({
			      		borderColor: 'white',
			      		fillColor: 'orange',
			      		text: `${leaderBoard[i].id}${spaces}: ${leaderBoard[i].rank} : ${leaderBoard[i].name} : ${leaderBoard[i].score}`,
			      		fontSize: 64,
			      		font: 'serif',
			      		x: function() {return 100;},
			      		y: function() {return yDraw;},
			      		});
		      	}
	      		break;

	      	case 'credits':
		      	for (let i = 0; i < credits.length; i++){
			      		let yDraw = 50 + (i * 70);
			      		_g.drawText({
			      		borderColor: 'white',
			      		fillColor: 'orange',
			      		text: credits[i],
			      		fontSize: 64,
			      		font: 'serif',
			      		x: function() {return 50;},
			      		y: function() {return yDraw;},
			      		});
		      	}
	      		break;

	      	case 'menu':
						//title screen
						_g.myDrawImage(this.assets.mainMenu, 0, 0, 1024, 640);
						//draw cursor
						_g.myDrawImage(this.assets.pointer, 260, 400 + (choicePosition * 65), 32, 32);
	      		break;
	      	default:
	      		console.log("default case, why?");
	      		break;
	      }

	      //lighter grey border
				_g.strokeStyle = "#666";
				_g.strokeRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
      }
		},
		getInput: function(_dt){
			if (this.view === 'menu') {
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
			}
			
			if(this.handler.getKeyManager().enter) {
				countSinceInput = 0;
				if (this.view === 'menu')
					switch(this.choices[choicePosition]){
						case 'play':
							var gameState = new GameState(this.handler);
							State.setState(gameState);	
							break;		
						case 'leaderboards':
							this.view = 'leaderboards';
							break;		
						case 'credits':
							this.view = 'credits';
							break;		
					} else {
						this.view = 'menu';
				}
			}
		}
	});

	function getCredits(){
		return [
			'http://www.opengameart.org/',
			'characters: Antifarea(PC)',
			'tiles: Chris Hamons / Medicine Storm	',
			'tiles: Buch / Keith Karnage',
			'Castle: Alucard',
			'',
			'Thanks to:',
			'Jamie Nichols for JS game',
			'engine Youtube tutorial'
		];
	}

	return MainMenu;

});