define(['State', 'GameState', 'KeyManager', 'Assets'], function(State, GameState, KeyManager, Assets){

  const CURRENT_PATH = window.location.href;
	var fontSize, timeCounter = 0, endRank, LBPosition, endScore = null, LBinfo = "Getting Leaderboard information...", LBinfo2 = "";
  var rankIcons = Assets.getAssets('rankIcons');

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
        x: function() {return 110;},
        y: function() {return 350;},
        });

        _g.myDrawImage(rankIcons[endRank], 48, 312, 48, 48);
        
        //tell them if they made leaderboard or not
        _g.drawText({
        borderColor: 'orange',
        fillColor: 'white',
        text: LBinfo,
        fontSize: 52,
        font: 'serif',
        x: function() {return 50;},
        y: function() {return 400;},
        });
        _g.drawText({
        borderColor: 'orange',
        fillColor: 'white',
        text: LBinfo2,
        fontSize: 52,
        font: 'serif',
        x: function() {return 50;},
        y: function() {return 450;},
        });

        if (timeCounter > 90) {
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
    let rankPosition = Math.floor(_score / 150000);
    if (rankPosition > 6)
      rankPosition = 6;
    switch (rankPosition){
      case 0:
        return 'Squire';
      case 1:
        return 'Knight';
      case 2:
        return 'Captain';
      case 3:
        return 'Baron';
      case 4:
        return 'Duke';
      case 5:
        return 'Lord';
      case 6:
        return 'Emporer';
      default:
        console.log("default rank");
        return 'error -> default';
      }
  }

  function getLeaderBoardPosition(_endScore, _handlerRef){
    let leaderboards = _handlerRef.getLeaderBoards();
    let newName = "";
    let breakPosition = 11;
    leaderboards.forEach((item, index) => {
      if (item.score < _endScore && breakPosition === 11){
        breakPosition = index;
      }
      if (item.score === _endScore && breakPosition === 11){
        breakPosition = index + 1;
      }
    });
    if (breakPosition < 11){
      while (newName === "" || newName.length > 10) {
        newName = prompt(`You fought bravely! Please enter your name, warrior, in 10 CHARACTERS OR LESS.`);
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
      $.ajax({
        url: 'https://defend-the-castle.firebaseio.com/leaderboards/.json',
        type: "PUT",
        data: JSON.stringify(tempLB),
        dataType: 'json'
      })
      .done(() => {
        LBinfo = "You placed on the leaderboards at";
        LBinfo2 = "position #" + breakPosition;
      });
    } else {
      //DIDNT MAKE LEADERBOARDS. SCORE TOO LOW
        LBinfo = "You didn't place on the leaderboards...";
        LBinfo2 = "Better luck next time, warrior!";
    }
  }

	return GameOverState;

});