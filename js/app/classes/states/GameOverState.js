define(['State', 'GameState', 'KeyManager', 'Assets'], function(State, GameState, KeyManager, Assets){

  const CURRENT_PATH = window.location.href;
	var fontSize, timeCounter = 0, endRank, LBPosition, endScore = null;

	var GameOverState = State.extend({
		init:function(_handler){
			this._super(_handler);
			endScore = this.handler.getWorld().getEntityManager().getPlayer().score;
      console.log("endScore", endScore);
      this.assets = Assets.getAssets('gameOver');
      endRank = getRankByScore(endScore);
      LBPosition = getLeaderBoardPosition(endScore, this.handler);
		},
		tick: function(_dt){
			timeCounter += 1;
      if (timeCounter > 60)
        this.getInput(_dt);
			this.render();
		},
		render: function(_g){
      if (_g){
		_g.fillStyle = "black";
		_g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());
        _g.myDrawImage(this.assets.logo, 275, 100, this.assets.logo.width, this.assets.logo.height);
      	
        _g.drawText({
        borderColor: 'orange',
        fillColor: 'white',
        text: `Score: ${endScore.toLocaleString()}!`,
        fontSize: 52,
        font: 'serif',
        x: function() {return 50;},
        y: function() {return 300;},
        });

        _g.drawText({
        borderColor: 'orange',
        fillColor: 'white',
        text: `Rank: ${endRank}`,
        fontSize: 52,
        font: 'serif',
        x: function() {return 50;},
        y: function() {return 350;},
        });

        if (timeCounter > 60) {
           _g.drawText({
          borderColor: 'orange',
           fillColor: 'white',
           text: `press enter key to return to main menu...`,
           fontSize: 48,
           font: 'serif',
           x: function() {return 100;},
           y: function() {return 600;},
           });
        }   
      }
		},
		getInput: function(_dt){
      if(this.handler.getKeyManager().enter) {
        window.location.reload();
		  }
    }
	});

  function getRankByScore(_score){
    console.log("_score", _score);
    let rankPosition = Math.floor(_score / 200000);
    if (rankPosition > 5)
      rankPosition = 5;
    switch (rankPosition){
      case 0:
        return 'Squire';
      case 1:
        return 'Knight';
      case 2:
        return 'Knight Captain';
      case 3:
        return 'Baron';
      case 4:
        return 'Duke';
      case 5:
        return 'Lord';
      default:
        console.log("default rank");
        return 'error -> default';
      }
  }

  function getLeaderBoardPosition(_endScore, _handlerRef){
    let leaderboards = _handlerRef.getLeaderBoards();
    let breakPosition = 11;
    leaderboards.forEach((item, index) => {
      if (item.score < _endScore && breakPosition === 11){
        breakPosition = index;
      }
    });
    if (breakPosition < 11){
      let newName = "";
      while (newName === "" || newName.length > 11) {
        newName = prompt(`You've made the leaderboard at position #${breakPosition + 1}! Please enter your name, warrior, in 10 characters or less. No Numbers or Special Characers`);
      }
      let firstHalf = leaderboards.slice(0, breakPosition);
      let newGuy = {
        name: newName,
        rank: endRank,
        score: _endScore
      };
      let secondHalf = leaderboards.slice(breakPosition, (leaderboards.length - 1));
      let tempLB = firstHalf.concat(newGuy).concat(secondHalf);
      console.log("tempLB", tempLB);
      //SAVING NEW LEADERBOARD
      // $.ajax({
      //   dataType: "json",
      //   type: "PUT",
      //   data: {
      //         "leaderboards": tempLB
      //         },
      //   url: CURRENT_PATH + "res/leaderboard/leaderboard.json",
      //   success: function(data){
      //     console.log("leader board success:", data);
      //   },
      //   error: function(data){
      //     console.log("leader board error!!!:", data);
      //   }
      // }).done(function(data) {
      //   console.log("leader board saved?");
      // });

    } else {
      //DIDNT MAKE LEADERBOARDS. SCORE TOO LOW
    }
  }

	return GameOverState;

});