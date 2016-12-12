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
			  	// console.log("success:", data);
			  },
			  error: function(data){
			  	console.log("error!!!:", data);
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
				_g.fillStyle = "#000";
				_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
	      switch(this.view){
	      	case 'leaderboards':
	      		let spaces = "xxx";
		      	for (let i = 0; i < leaderBoard.length; i++){
			      		let yDraw = 125 + (i * 46);
			      		if (i < 9) {
			      			spaces = "  ";
			      		} else {
			      			spaces = " ";
			      		}
								_g.myDrawImage(this.assets.LBLogo, 280, 20, this.assets.LBLogo.width, this.assets.LBLogo.height);
			      		_g.drawText({
			      		borderColor: 'orange',
			      		fillColor: 'white',
			      		text: `${leaderBoard[i].id}${spaces}: ${leaderBoard[i].rank} : ${leaderBoard[i].name} : ${leaderBoard[i].score}`,
			      		fontSize: 48,
			      		font: 'serif',
			      		x: function() {return 200;},
			      		y: function() {return yDraw;},
			      		});
		      	}
		      	_g.drawText({
		      	borderColor: 'orange',
		      	fillColor: 'white',
		      	text: `press enter key to return to main menu...`,
		      	fontSize: 48,
		      	font: 'serif',
		      	x: function() {return 100;},
		      	y: function() {return 600;},
		      	});
	      		break;

	      	case 'credits':
		      	for (let i = 0; i < credits.length; i++){
			      		let yDraw = 125 + (i * 46);
								_g.myDrawImage(this.assets.creditsLogo, 470, 20, this.assets.creditsLogo.width, this.assets.creditsLogo.height);
			      		_g.drawText({
			      		borderColor: 'orange',
			      		fillColor: 'white',
			      		text: credits[i],
			      		fontSize: 52,
			      		font: 'serif',
			      		x: function() {return 50;},
			      		y: function() {return yDraw;},
			      		});
		      	_g.drawText({
		      	borderColor: 'orange',
		      	fillColor: 'white',
		      	text: `press enter key to return to main menu...`,
		      	fontSize: 48,
		      	font: 'serif',
		      	x: function() {return 100;},
		      	y: function() {return 625;},
		      	});
		      	}
	      		break;

	      	case 'menu':
						//title screen
						_g.myDrawImage(this.assets.mainMenu, 0, 0, 1024, 640);
						//draw cursor
						_g.myDrawImage(this.assets.pointer, 260, 410 + (choicePosition * 65), 32, 32);
	      		break;
	      	
	      	case 'test':
						// console.log("this.assets.LBLogo", this.assets.LBLogo);
						// _g.myDrawImage(this.assets.LBLogo, 250, 10, this.assets.LBLogo.width, this.assets.LBLogo.height);
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
			'Programming:',
			'     Matthew McCord',
			'Artwork:',
			'     http://www.opengameart.org/',
			'          characters: Antifarea(PC)',
			'          tiles: Chris Hamons / Medicine Storm	',
			'          tiles: Buch / Keith Karnage',
			'          castle: Alucard',
			'Thanks to:',
			'     Jamie Nichols for JS game',
			'     engine Youtube tutorial'
		];
	}

	return MainMenu;

});