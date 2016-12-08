define(['Helper', 'HealthBar', 'Assets'], function(Helper, HealthBar, Assets){


	var HUD = Helper.extend({
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
			// this.nodes = this.totalNodes = _properties.nodes;
			// this.renderOnFull = _properties.renderOnFull || "on";
			// this.width = _properties.width || "75";
			// this.height = _properties.height || "10";
			// this.xOffset = _properties.xOffset || -_entity.getWidth() / 2 + this.width / 2;
			// this.yOffset = _properties.yOffset || 10;
			// this.color = _properties.color;
			// this.bgColor = _properties.bgColor;
			// this.split = _properties.split || 0; //Gap between nodes?
			// this.nodeWidth = this.width / this.nodes;
			// this.nodeHeight = this.height;	
			// this.fadeTime = _properties.fadeTime || 1;
			// this.opacity = _properties.opacity || 1;
			// this.border = _properties.border || {"show": true, "color": "black", "width": 3};
		},
		render(_g){
			//needed variables for score
			let score = this.handler.getWorld().getEntityManager().getPlayer().score,
					tempX = 10,
					tempY = this.handler.getHeight() - 20;

			//Text: Score
			_g.drawText({
				border: true,
				borderHeight: 100,
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
			// this.opacity = 1;
			// this.nodes = Math.ceil(this.totalNodes * (this.entity.health / this.start));
		}
	});

	return HUD;
});