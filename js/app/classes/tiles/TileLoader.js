define(['Tile', 'GrassTile', 'DirtTile', 'StoneTile'], function(Tile, GrassTile, DirtTile, StoneTile){
	Tile.grassTile = new GrassTile(0);
	Tile.dirtTile = new DirtTile(1);
	Tile.stoneTile = new StoneTile(2);

	return Tile;
});