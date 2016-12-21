define(['MenuState', 'GameState', 'KeyManager', 'Assets', 'State'], function(MenuState, GameState, KeyManager, Assets, State){

	const CURRENT_PATH = window.location.href;
	var fontSize = 0, countSinceInput = 11, choicePosition = 0, leaderboardsLoaded = false;
	var leaderBoard = [], credits = [], handlerRef;
  var rankIcons = Assets.getAssets('rankIcons');

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
          // console.log("success:", data);
        },
        error: function(data){
          console.log("error!!!:", data);
        }
      });
      // .done(function(data) {
      //     // console.log("done", data);
      // });

      //Load Credits
      credits = getCredits();

      this.assets = Assets.getAssets('title');
      this.choices = ['play', 'leaderboards', 'credits'];
			this.view = 'menu';
		},
		tick: function(_dt){
			countSinceInput++;
			if (countSinceInput > 6)
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
                let nameSpaces = (" ").repeat(10 - leaderBoard[i].name.length);
			      		let yDraw = 100 + (i * 54);
			      		if (i < 9) {
			      			spaces = "  ";
			      		} else {
			      			spaces = " ";
			      		}
								_g.myDrawImage(this.assets.LBLogo, 280, 10, this.assets.LBLogo.width, this.assets.LBLogo.height);
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
            // rankIcons.Squire = rankIcons.sheet.crop(0, 96, 96, 96);
            // rankIcons.Knight = rankIcons.sheet.crop(96, 96, 96, 96);
            // rankIcons.Captain = rankIcons.sheet.crop(192, 96, 96, 96);
            // rankIcons.Baron = rankIcons.sheet.crop(0, 0, 96, 96);
            // rankIcons.Duke = rankIcons.sheet.crop(96, 0, 96, 96);
            // rankIcons.Lord = rankIcons.sheet.crop(192, 0, 96, 96);
            // rankIcons.Emporer = rankIcons.sheet.crop(288, 0, 96, 96);
            // _g.myDrawImage( rankIcons.Squire, 50, 50, 48, 48);
            // _g.myDrawImage( rankIcons.Knight, 100, 50, 48, 48);
            // _g.myDrawImage( rankIcons.Captain, 150, 50, 48, 48);
            // _g.myDrawImage( rankIcons.Baron, 50, 150, 48, 48);
            // _g.myDrawImage( rankIcons.Duke, 100, 150, 48, 48);
            // _g.myDrawImage( rankIcons.Lord, 150, 150, 48, 48);
            // _g.myDrawImage( rankIcons.Emporer, 200, 150, 48, 48);

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
              if (leaderboardsLoaded){
							this.view = 'leaderboards';
              } else {
                alert ("Leader Boards are still loading. Give it a few more seconds or refresh the page!");
              }
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

  // function setLeaderBoards(_LB){
  //   handlerRef.setLeaderBoards(leaderBoard);
  // }

	return MainMenu;

});