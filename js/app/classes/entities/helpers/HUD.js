define(['Helper', 'HealthBar', 'Assets'], function(Helper, HealthBar, Assets){


	let HUD = Helper.extend({
		init: function(_handler, _player){
			this.handler = _handler;
			this.player = _player;
			this.width = 926;
			this.height = 70;
			this.x = 50;
			this.y = 550;
			this.healthbar = _player.getHealthBar();
			this.portrait = _player.portrait;
			this.hudLayout = Assets.getAssets('hudLayout');
			this.icons = Assets.getAssets('icons');
		},
		render(_g){
			//needed letiables for score
			let score = this.handler.getWorld().getEntityManager().getPlayer().score,
					tempX = 20,
					tempY = 45;

			//Black Transparent Bar at Top
			// _g.fillStyle = 'black';
			// _g.globalAlpha = 0.5;
			// _g.fillRect(0, 0, this.handler.getWidth(), 65);
			// _g.globalAlpha = 1;

			//Text: Score
				tempY = 40;
			_g.drawText({
				border: true,
				borderHeight: 80,
				borderColor: 'black',
				fillColor: 'white',
				text: `Score: ${score.toLocaleString()}`,
				fontSize: 42,
				font: 'serif',
				x: function() {return tempX;},
				y: function(){return tempY;}
			});
		},
		update: function(){
		}
	});

	return HUD;
});