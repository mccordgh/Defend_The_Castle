define(['Class', 'Tile'], function(Class, Tile){

	let xOffset, yOffset, handler;
	
	let GameCamera = Class.extend({
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
			let startX = xOffset,
					startY = yOffset,
					goalX = entity.getX() - handler.getWidth() / 2 + entity.getWidth() / 2,
					goalY = entity.getY() - handler.getHeight() / 2 + entity.getHeight() / 2;

				// console.log({
				// 	xOffset: xOffset,
				// 	startX: startX,
				// 	goalX: goalX,
				// 	yOffset: yOffset,
				// 	startY: startY,
				// 	goalY: goalY
				// });

				if(startY > goalY && yOffset > goalY) {
					yOffset -= 5;
				} 
				if (goalY > startY && yOffset < goalY) {
					yOffset += 5;
				}
				if(startX > goalX && xOffset > goalX) {
					xOffset -= 5;
				} 
				if (goalX > startX && xOffset < goalX) {
					xOffset += 5;
				}

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