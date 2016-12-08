define(['Class', 'Tile'], function(Class, Tile){

	var xOffset, yOffset, handler;
	
	var GameCamera = Class.extend({
		init: function(_handler, _xOffset, _yOffset){
			xOffset = _xOffset;
			yOffset = _yOffset;
			handler = _handler;
		},
		centerOnEntity: function(entity){
			xOffset = entity.getX() - handler.getWidth() / 2 + entity.getWidth() / 2;
			yOffset = entity.getY() - handler.getHeight() / 2 + entity.getHeight() / 2;
			this.checkBlankSpace();
		},
		slowCenterOnEntity: function(entity){
			let startX = this.handler.getWorld().getEntityManager().getPlayer().x,
					startY = this.handler.getWorld().getEntityManager().getPlayer().y,
					goalX = entity.getX() - handler.getWidth() / 2 + entity.getWidth() / 2,
					goalY = entity.getY() - handler.getHeight() / 2 + entity.getHeight() / 2;

				if(goalY < startY) {
					yOffset -= 1;
				} 
				if (goalY > startY) {
					yOffset += 1;
				}
				if(goalX < startX) {
					xOffset -= 1;
				} 
				if (goalX > startX) {
					xOffset += 1;
				}

			// xOffset = entity.getX() - handler.getWidth() / 2 + entity.getWidth() / 2;
			// yOffset = entity.getY() - handler.getHeight() / 2 + entity.getHeight() / 2;
			this.checkBlankSpace();
		},
		move: function(_xAmt, _yAmt){
			xOffset += _xAmt;
			yOffset += _yAmt;
			this.checkBlankSpace();
		},
		getxOffset: function(){
			return parseInt(xOffset);
		},
		getyOffset: function(){
			return parseInt(yOffset);
		},
		setxOffset: function(_offset){
			xOffset = _offset;
		},
		setyOffset: function(_offset){
			yOffset = _offset;
		},
		checkBlankSpace: function(){

			if (xOffset < 0) {
				xOffset = 0;
			} else if (xOffset > handler.getWorld().getWidth() * Tile.TILE_WIDTH - handler.getWidth()) {
				xOffset = handler.getWorld().getWidth() * Tile.TILE_WIDTH - handler.getWidth();
			}

			if (yOffset < 0){
				yOffset = 0;
			} else if (yOffset > handler.getWorld().getHeight() * Tile.TILE_HEIGHT - handler.getHeight()) {
				yOffset = handler.getWorld().getHeight() * Tile.TILE_HEIGHT - handler.getHeight();
			}
		}	

	});

	return GameCamera;
});