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
			this.score = "9,999,999";
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
			//Player portrait and item Icons
			_g.myDrawImage(this.portrait.player, this.x + 12, this.y + 10, this.portrait.width, this.portrait.height);
			_g.myDrawImage(this.icons.sword, this.width - 130, this.y + 5, this.icons.width, this.icons.height);
			
			//Hud layout
			_g.myDrawImage(this.hudLayout.layout, this.x, this.y, this.hudLayout.width, this.hudLayout.height);
			
			//Render healthbar
			this.healthbar.render(_g);

		//Text: Score
			_g.fillStyle = "white";
			_g.fillText(`Score: ${this.score}`, 834, 50);
		},
		update: function(){
			// this.opacity = 1;
			// this.nodes = Math.ceil(this.totalNodes * (this.entity.health / this.start));
		}
	});

	return HUD;
});