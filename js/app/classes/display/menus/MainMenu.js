define(['MenuState', 'GameState', 'KeyManager', 'Assets', 'State', 'SoundManager'], function(MenuState, GameState, KeyManager, Assets, State, SoundManager){

	const CURRENT_PATH = window.location.href;
	var fontSize = 0, countSinceInput = 11, choicePosition = 0, leaderboardsLoaded = false;
	var leaderBoard = [], credits = [], handlerRef, introStep = 1;
  var rankIcons = Assets.getAssets('rankIcons');
  var musicSound, selectSound, startSound, soundsLoaded = false, introAlpha = 0.99;
  var loadingText = "loading leaderboards...", loadingFill = "orange";

	var MainMenu = MenuState.extend({
		init:function(_handler){
      this.handler = _handler;
      handlerRef = _handler;
      //Load Leaderboards
      $.ajax({
        url: 'https://defend-the-castle.firebaseio.com/leaderboards.json',
        type: "GET",
        dataType: 'json',
        success: function(data){
          leaderBoard = data;
          // setLeaderBoards(leaderBoard);
          leaderboardsLoaded = true; 
          loadingText = "loading sounds...";
					//Load the sounds
					sounds.load([
					  `${CURRENT_PATH}/res/sound/ItaloUnlimited.ogg`,
					  `${CURRENT_PATH}/res/sound/explode.wav`,
					  `${CURRENT_PATH}/res/sound/explode2.wav`,
					  `${CURRENT_PATH}/res/sound/lvlup.ogg`,
					  // `${CURRENT_PATH}/res/sound/lvldown.ogg`,
					  `${CURRENT_PATH}/res/sound/select.wav`,
					  `${CURRENT_PATH}/res/sound/start.wav`,
					  `${CURRENT_PATH}/res/sound/spawn.ogg`,
					  `${CURRENT_PATH}/res/sound/evillaugh.ogg`,
					  `${CURRENT_PATH}/res/sound/monster.wav`,
					  `${CURRENT_PATH}/res/sound/sword.wav`,
					]);

					//Assign the callback function that should run
					//when the sounds have loaded
					sounds.whenLoaded = initSounds;
        },
        error: function(data){
          console.log("error!!!:", data);
          leaderboardsLoaded = true;
          loadingText = "loading sounds...";
					//Load the sounds
					sounds.load([
					  `${CURRENT_PATH}/res/sound/ItaloUnlimited.ogg`,
					  `${CURRENT_PATH}/res/sound/explode.wav`,
					  `${CURRENT_PATH}/res/sound/explode2.wav`,
					  `${CURRENT_PATH}/res/sound/lvlup.ogg`,
					  // `${CURRENT_PATH}/res/sound/lvldown.ogg`,
					  `${CURRENT_PATH}/res/sound/select.wav`,
					  `${CURRENT_PATH}/res/sound/start.wav`,
					  `${CURRENT_PATH}/res/sound/spawn.ogg`,
					  `${CURRENT_PATH}/res/sound/evillaugh.ogg`,
					  `${CURRENT_PATH}/res/sound/monster.wav`,
					  `${CURRENT_PATH}/res/sound/sword.wav`,
					]);

					//Assign the callback function that should run
					//when the sounds have loaded
					sounds.whenLoaded = initSounds;
        }
      });
      // .done(function(data) {
      //     // console.log("done", data);
      // });

      //Load Credits
      credits = getCredits();

      this.howToAssets = Assets.getAssets('howTo');
      this.introAssets = Assets.getAssets('mccordinator');
      this.assets = Assets.getAssets('title');
      this.choices = ['start', 'how to', 'credits', 'leaderboards'];
			this.view = 'intro';
		},
		tick: function(_dt){
			countSinceInput++;
			if (countSinceInput > 8)
				this.getInput(_dt);
			this.render();
		},
		render: function(_g){
      if (_g){
      	//black background
				_g.fillStyle = "#000";
				_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
	      switch(this.view){
	      	case 'intro':
						switch (introStep){
							case 1:
			      		_g.globalAlpha = 1;
			      		_g.myDrawImage(this.introAssets.logo, 0, 0, this.handler.getWidth(), this.handler.getHeight());
			      		_g.globalAlpha = introAlpha;
			      		_g.fillStyle = 'black';
			      		_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
			      		introAlpha -= 0.01;
			      		if (introAlpha <= 0){
			      			introAlpha = 0;
			      			_g.globalAlpha = 1;
			      			introStep = 2;
			      		}
			      		break;
			      	case 2:
			      	_g.globalAlpha = 1;
			      	_g.myDrawImage(this.introAssets.logo, 0, 0, this.handler.getWidth(), this.handler.getHeight());
			      	_g.globalAlpha = introAlpha;
			      	_g.fillStyle = 'black';
			      	_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
			      	introAlpha += 0.01;
			      	if (introAlpha >= 1){
			      		introAlpha = 1;
			      		_g.globalAlpha = 1;
			      		introStep = 3;
			      	}

			      		break;
			      	case 3:
							_g.globalAlpha = 1;
							_g.myDrawImage(this.assets.mainMenu, 0, 0, 1024, 640);
			      	_g.drawText({
				      	borderColor: 'white',
				      	fillColor: loadingFill,
				      	text: loadingText,
				      	fontSize: 48,
				      	font: 'serif',
				      	x: function() {return 40;},
				      	y: function() {return 310;},
			      	});
							_g.globalAlpha = introAlpha;
							_g.fillStyle = 'black';
							_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
							introAlpha -= 0.01;
							if (introAlpha <= 0){
								_g.globalAlpha = 1;
								// introStep = 1;
								this.view = 'menu';
							}

			      		break;
	      		}
	      		break;

	      	case 'leaderboards':
	      		let spaces = "xxx";
            if (leaderBoard[0] === undefined){
            	_g.drawText({
            	borderColor: 'orange',
            	fillColor: 'white',
            	text: `There was an error loading leader boards :(`,
            	fontSize: 48,
            	font: 'serif',
            	x: function() {return 100;},
            	y: function() {return 300;},
            	});
            } else {
	            for (let i = 0; i < leaderBoard.length; i++){
                let nameSpaces = (" ").repeat(10 - leaderBoard[i].name.length);
			      		let yDraw = 100 + (i * 54);
			      		if (i < 9) {
			      			spaces = "  ";
			      		} else {
			      			spaces = " ";
			      		}
								_g.myDrawImage(this.assets.LBLogo, 180, 2, this.assets.LBLogo.width, this.assets.LBLogo.height);
                _g.drawText({
                borderColor: 'orange',
                fillColor: 'white',
                text: `${spaces}${i + 1}`,
                fontSize: 48,
                font: 'serif',
                x: function() {return 200;},
                y: function() {return yDraw;},
                });

                _g.myDrawImage(rankIcons[leaderBoard[i].rank], 290, yDraw - 38, 48, 48);

                _g.drawText({
                borderColor: 'orange',
                fillColor: 'white',
                text: `${leaderBoard[i].name}${nameSpaces}  ${leaderBoard[i].score.toLocaleString()}`,
                fontSize: 48,
                font: 'serif',
                x: function() {return 350;},
                y: function() {return yDraw;},
                });
	            }
			      }
		      	_g.drawText({
		      	borderColor: 'orange',
		      	fillColor: 'white',
		      	text: `press enter key to return to main menu...`,
		      	fontSize: 48,
		      	font: 'serif',
		      	x: function() {return 100;},
		      	y: function() {return 630;},
		      	});
	      		break;

	      	case 'credits':
		      	for (let i = 0; i < credits.length; i++){
			      		let yDraw = 125 + (i * 46);
								_g.myDrawImage(this.assets.creditsLogo, 300, 20, this.assets.creditsLogo.width, this.assets.creditsLogo.height);
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
						if (loadingText === "up and down arrows to select, enter key to choose!")
							_g.myDrawImage(this.assets.pointer, 90, 338 + (choicePosition * 78), 128, 41);
			      	_g.drawText({
				      	borderColor: 'white',
				      	fillColor: loadingFill,
				      	text: loadingText,
				      	fontSize: 48,
				      	font: 'serif',
				      	x: function() {return 40;},
				      	y: function() {return 310;},
			      	});
	      		break;
	      	
	      	case 'how to':
	      		//how to instructions screen
						_g.myDrawImage(this.howToAssets.howToScreen, 0, 0, this.howToAssets.width, this.howToAssets.height);
		      	_g.drawText({
		      	borderColor: 'orange',
		      	fillColor: 'white',
		      	text: `press enter key to return to main menu...`,
		      	fontSize: 48,
		      	font: 'serif',
		      	x: function() {return 100;},
		      	y: function() {return 625;},
		      	});

	    			break;
	      	
	      	case 'test':

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
					loadingFill = `#${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() * 7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}`;
					if (soundsLoaded)
						this.handler.getSoundManager().play("selectSound");
					if(choicePosition === -1)
						choicePosition = this.choices.length - 1;
					countSinceInput = 0;
				} 
				if (this.handler.getKeyManager().down || this.handler.getKeyManager().downArrow) {
					choicePosition += 1;
					loadingFill = `#${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() * 7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}`;
					if (soundsLoaded)
						this.handler.getSoundManager().play("selectSound");
					if(choicePosition === this.choices.length)
						choicePosition = 0;
					countSinceInput = 0;
				}
			}
			
			if(this.handler.getKeyManager().enter) {
				countSinceInput = 0;
				if (!soundsLoaded || !leaderboardsLoaded){
					loadingFill = `#${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() * 7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}${Math.floor(Math.random() *7 + 3)}`;
				} else {
					if (this.view === 'menu')
						switch(this.choices[choicePosition]){
							case 'start':
								this.handler.getSoundManager().play("evilLaugh");
								var gameState = new GameState(this.handler);
								handlerRef.getSoundManager().fadeIn("gameMusic", 5);
								State.setState(gameState);	
								break;		
							case 'leaderboards':
								this.handler.getSoundManager().play("startSound");
	              if (leaderboardsLoaded){
								this.view = 'leaderboards';
	              } else {
	                alert ("Leader Boards are still loading. Give it a few more seconds or refresh the page!");
	              }
								break;		
							case 'credits':
								this.handler.getSoundManager().play("startSound");
								this.view = 'credits';
								break;		
							case 'how to':
								this.handler.getSoundManager().play("startSound");
								this.view = 'how to';
								break;		
						} else {
							this.view = 'menu';
						}
					}
				}
			}
	});

	function getCredits(){
		return [
			'Programming: Matthew McCord',
			'Artwork: http://www.opengameart.org/',
			'    Player: Antifarea(PC)',
			'    Tiles: Chris Hamons / Medicine Storm',
			'    Tiles: Buch / Keith Karnage',
			'    Music: OveMelaa',
			'    Sound FX: artisticdude / OveMelaa',
			'    Castle: Alucard',
			'Thanks: Jamie Nichols // JS game engine',
			'                         Youtube tutorial'
		];
	}

	function initSounds() {
		let sm = new SoundManager();
		sm.setSounds();
		handlerRef.setSoundManager(sm);
		soundsLoaded = true;
		loadingText = "up and down arrows to select, enter key to choose!";
		handlerRef.getSoundManager().play("evilLaugh");
	}

  // function setLeaderBoards(_LB){
  //   handlerRef.setLeaderBoards(leaderBoard);
  // }


	function backupLeaderboard() {
		return [
		{
			"name": "AAA",
			"score": 1000000,
			"rank": "Lord"
		}, 
		{
			"name": "BBB",
			"score": 900000,
			"rank": "Lord"
		},
		{
			"name": "CCC",
			"score": 800000,
			"rank": "Duke"
		},
		{
			"name": "DDD",
			"score": 700000,
			"rank": "Duke"
		},
		{
			"name": "EEE",
			"score": 600000,
			"rank": "Baron"
		},
		{
			"name": "FFF",
			"score": 500000,
			"rank": "Baron"
		},
		{
			"name": "GGG",
			"score": 400000,
			"rank": "Knight Captain"
		},
		{
			"name": "XXX",
			"score": 300000,
			"rank": "Knight Captain"
		},
		{
			"name": "YYY",
			"score": 200000,
			"rank": "Knight"
		},
		{
			"name": "ZZZ",
			"score": 100000,
			"rank": "Knight"
		}
		];
	}

	return MainMenu;
});