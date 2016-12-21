define(['Tile'], function(Tile){

	var WaterTile = Tile.extend({
		init: function(_id){
			this._super(Tile.assets.water, _id);
		},
		isSolid: function(){
			return true;
		}
	});

	return WaterTile;
});