define(['Tile', 'GrassTile', 'DirtTile', 'StoneTile', 'WaterTile'], function(Tile, GrassTile, DirtTile, StoneTile, WaterTile){
	Tile.grassTile = new GrassTile(0);
	Tile.dirtTile = new DirtTile(1);
	Tile.stoneTile = new StoneTile(2);
	Tile.waterTile = new WaterTile(3);

	return Tile;
});