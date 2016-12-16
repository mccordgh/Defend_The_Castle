define(['Class', 'TileLoader', 'Utils', 'Tree', 'EntityManager', 'Player', 'SpatialGrid', 'HUD', "Bat", 'Castle', 'Portal', 'Assets'], function(Class, Tile, Utils, Tree, EntityManager, Player, SpatialGrid, HUD, Bat, Castle, Portal, Assets){

	const CURRENT_PATH = window.location.href;
	var tree,	roundOver = false;

	var World = Class.extend({
		init:function(_path, _handler){
			this.tiles = [];
			this.handler = _handler;
			_handler.setWorld(this);
			this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
			this.loadWorld( CURRENT_PATH + _path);
			
			this.spatialGrid = new SpatialGrid(this.width * Tile.TILE_WIDTH, this.height * Tile.TILE_HEIGHT, 64);
			
			//CASTLE!
			this.entityManager.addEntity(new Castle(_handler, Tile.TILE_WIDTH * 37, Tile.TILE_HEIGHT * 37));

			//PORTALS!
			this.entityManager.addEntity(new Portal(_handler, Tile.TILE_WIDTH * 12, Tile.TILE_HEIGHT * 12));
			this.entityManager.addEntity(new Portal(_handler, Tile.TILE_WIDTH * 72, Tile.TILE_HEIGHT * 12));
			this.entityManager.addEntity(new Portal(_handler, Tile.TILE_WIDTH * 12, Tile.TILE_HEIGHT * 72));
			this.entityManager.addEntity(new Portal(_handler, Tile.TILE_WIDTH * 72, Tile.TILE_HEIGHT * 72));

			//TOP LEFT TREE TROVE
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 6, Tile.TILE_HEIGHT * 6));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 10, Tile.TILE_HEIGHT * 6));
			// this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 9, Tile.TILE_HEIGHT));
			// this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH, Tile.TILE_HEIGHT * 9));
			// this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH, Tile.TILE_HEIGHT * 9));

			//TOP RIGHT TREE TROVE
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 75, Tile.TILE_HEIGHT));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 71, Tile.TILE_HEIGHT));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 67, Tile.TILE_HEIGHT));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 75, Tile.TILE_HEIGHT * 5));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 75, Tile.TILE_HEIGHT * 9));

			//BOTTOM RIGHT TREE TROVE
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 75, Tile.TILE_HEIGHT * 75));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 71, Tile.TILE_HEIGHT * 75));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 67, Tile.TILE_HEIGHT * 75));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 75, Tile.TILE_HEIGHT * 71));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 75, Tile.TILE_HEIGHT * 67));

			//BOTTOM LEFT TREE TROVE
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH, Tile.TILE_HEIGHT * 75));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 5, Tile.TILE_HEIGHT * 75));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH * 9, Tile.TILE_HEIGHT * 75));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH, Tile.TILE_HEIGHT * 71));
			this.entityManager.addEntity(new Tree(_handler, Tile.TILE_WIDTH, Tile.TILE_HEIGHT * 67));

			//PLAYER SET SPAWN
			this.entityManager.getPlayer().setX(this.spawnX);
			this.entityManager.getPlayer().setY(this.spawnY);

			//HUD INIT
			this.hud = new HUD(_handler, this.entityManager.getPlayer());
		},
		loadWorld: function(_path){
			var file = Utils.loadFileAsString(_path);
			var tokens = file.replace(/\n/g, " ").split(" ");
			this.width = tokens[0];
			this.height = tokens[1];
			this.spawnX = tokens[2] * Tile.TILE_WIDTH;
			this.spawnY = tokens[3] * Tile.TILE_HEIGHT;
			for(y=0; y < this.height; y++){
				for(x=0; x < this.width; x++){
					if(!this.tiles[x])
						this.tiles[x] = [];
					this.tiles[x][y] = parseInt(tokens[(x + (y * this.width)) + 4]);
				}
			}
		},
		tick: function(_dt){
			this.entityManager.tick(_dt);
		},
		render: function(_g){

				var xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / Tile.TILE_WIDTH));
				var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / Tile.TILE_WIDTH + 1));
				var yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / Tile.TILE_HEIGHT));
				var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / Tile.TILE_HEIGHT + 1));			

				for(y = yStart; y < yEnd; y++){
					for(x = xStart; x < xEnd; x++){
						this.getTile(x, y).render(_g, x * Tile.TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * Tile.TILE_HEIGHT -  this.handler.getGameCamera().getyOffset());
					}
				}

				this.entityManager.render(_g);
				this.hud.render(_g);
			// tree.render(_g);
		},
		getTile: function(_x, _y){
			return Tile.tiles[this.tiles[_x][_y]];
		},
		getWidth: function(){
			return this.width;
		},
		getHeight: function(){
			return this.height;
		},
		getEntityManager(){
			return this.entityManager;
		},
		getSpatialGrid(){
			return this.spatialGrid;
		},
		getRoundOver(){
			return roundOver;
		},
		setRoundOver(_bool){
			roundOver = _bool;
		}

	});

	return World;
});