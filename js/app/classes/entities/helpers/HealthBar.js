define(['Helper'], function(Helper){


	var HealthBar = Helper.extend({
		init: function(_handler, _entity, _properties){
			this.handler = _handler;
			this.entity = _entity;
			this.start = _entity.health;
			this.nodes = this.totalNodes = _properties.nodes;
			this.renderOnFull = _properties.renderOnFull || "on";
			this.width = _properties.width || "75";
			this.height = _properties.height || "10";
			this.xOffset = _properties.xOffset || -_entity.getWidth() / 2 + this.width / 2;
			this.yOffset = _properties.yOffset || 10;
			this.color = _properties.color;
			this.bgColor = _properties.bgColor;
			this.split = _properties.split || 0; //Gap between nodes?
			this.nodeWidth = this.width / this.nodes;
			this.nodeHeight = this.height;
			this.fadeTime = _properties.fadeTime || 1;
			this.opacity = _properties.opacity || 1;
			this.border = _properties.border || {"show": true, "color": "black", "width": 3};
			// setInterval(() => { _entity.takeDamage(20);}, 2000);
		},
		render(_g){
			this.opacity *= this.fadeTime;
			_g.globalAlpha = this.opacity;
			if (this.renderOnFull === "on" || this.entity.health < this.start){
				if (this.border.show){
					_g.fillStyle = this.border.color;
					_g.fillRect(this.entity.getX() - this.xOffset - this.handler.getGameCamera().getxOffset() - this.border.width,
											this.entity.getY() - this.yOffset - this.handler.getGameCamera().getyOffset() - this.border.width,
											this.width + this.border.width * 2,
											this.height + this.border.width * 2);
				}
				for (let i = 0; i < this.totalNodes; i++){
					_g.globalAlpha = 0.5 * this.opacity;
					_g.fillStyle = this.bgColor;
					_g.fillRect(-(this.nodeWidth * this.totalNodes) + (this.split / 2) + (this.totalNodes * this.nodeWidth) + (this.nodeWidth * i) + this.entity.getX() - this.xOffset - this.handler.getGameCamera().getxOffset(),
											this.entity.getY() - this.yOffset - this.handler.getGameCamera().getyOffset(),
											this.nodeWidth - this.split,
											this.height);
				}
					_g.globalAlpha = 1 * this.opacity;
				for (let i = 0; i < this.nodes; i++){
					_g.fillStyle = this.color;
					_g.fillRect(-(this.nodeWidth * this.totalNodes) + (this.split / 2) + (this.totalNodes * this.nodeWidth) + (this.nodeWidth * i) + this.entity.getX() - this.xOffset - this.handler.getGameCamera().getxOffset(),
											this.entity.getY() - this.yOffset - this.handler.getGameCamera().getyOffset(),
											this.nodeWidth - this.split,
											this.height);
				}
			}
			_g.globalAlpha = 1;
		},
		update: function(){
			this.opacity = 1;
			this.nodes = Math.ceil(this.totalNodes * (this.entity.health / this.start));
		}
	});

	HealthBar.DEFAULT_NODES = 10;
	HealthBar.DEFAULT_Y_OFFSET = 10;
	HealthBar.DEFAULT_X_OFFSET = 0;

	return HealthBar;
});