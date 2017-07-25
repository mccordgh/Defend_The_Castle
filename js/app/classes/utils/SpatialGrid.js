define(['Class'], function(Class){

	let width, height, size, grid;

	let SpatialGrid = Class.extend({
		init: function(_width, _height, _size){
			width = parseInt(_width / _size);
			height = parseInt(_height / _size);
			size = _size;
			grid = [];
			for (let i = 0; i <= width; i++){
				grid[i] = [];
				for (let j = 0; j <= height; j++){
					grid[i][j] = [];
				}
			}
		},
		//Insert entities in spatial grid
		insert: function(_rect, _entity){
			let startX = Math.max(0, parseInt(_rect.x / size));
			let startY = Math.max(0, parseInt(_rect.y / size));
			let endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
			let endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
			for (let y = startY; y <= endY; y++){
				for (let x = startX; x <= endX; x++){
					if (grid[x][y].indexOf(_entity) === -1) // if entity does not already exist in spatial grid
						grid[x][y].push(_entity);
				}
			}
		},
		//Retrieve all other Entities in spatial grid
		retrieve: function(_rect, _entity){
			let startX = Math.max(0, parseInt(_rect.x / size));
			let startY = Math.max(0, parseInt(_rect.y / size));
			let endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
			let endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
			let entities = [];
			for (let y = startY; y <= endY; y++){
				for (let x = startX; x <= endX; x++){
					grid[x][y].forEach(function(entity){
						if (entity !== _entity && entities.indexOf(entity) == -1)
							entities.push(entity);
					});
				}
			}
			return entities;			
		},
		//FOR DEV PURPOSES ~> Remove Entity from spatial grid
		remove: function(_rect, _entity){
			let startX = Math.max(0, parseInt(_rect.x / size));
			let startY = Math.max(0, parseInt(_rect.y / size));
			let endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
			let endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
			let entities = [];
			for (let y = startY; y <= endY; y++){
				for (let x = startX; x <= endX; x++){
					for (let i = 0; i < grid[x][y].length; i++){
						if (grid[x][y][i] === _entity)
							grid[x][y].splice(i, 1);
					}
				}
			}			
		},
		//Render Grid Squares
		render: function(_g, _handler){
			for (let y = 0; y <= height; y++){
				for (let x = 0; x <= width; x++){
					let xpos = (x * size) - _handler.getGameCamera().getxOffset();
					let ypos = (y * size) - _handler.getGameCamera().getyOffset();
					_g.strokeRect(xpos, ypos, size, size);
					if (grid[x][y].length > 0){
						_g.fillStyle = "blue";
						_g.fillRect(xpos, ypos, size, size);
					}
				}
			}
		},
		//Getters
		getWidth: function(){
			return width;
		},
		getHeight: function(){
			return height;
		},
		getSize: function(){
			return size;
		}

	});

	return SpatialGrid;
});