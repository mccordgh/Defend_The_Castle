define(['Class', 'ImageLoader', 'SpriteSheet'], function(Class,ImageLoader,SpriteSheet){

	var DEFAULT_WIDTH = 32, DEFAULT_HEIGHT = 32;
	var assets = {};

	var Assets = Class.extend({
		init:function(_name, _path, _width, _height){
			assets[_name] = this;
			this.name = _name;
			this.path = _path;
			this.width = _width;
			this.height = _height;
			this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
		}
		
	});

		Assets.DEFAULT_WIDTH = DEFAULT_WIDTH;
		Assets.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
		Assets.getAssets = function(_name){
			return assets[_name];

		};

	//var X = new Assets(name, url, width, height);
	//Player asset
	var player = new Assets("player", "res/textures/tiles.png", 32, 32);
	player.idle = player.sheet.crop(player.width * 20, player.height * 1, player.width, player.height );

	//Tile Asset
	var tiles = new Assets("tiles", "res/textures/tiles.png", 32, 32);
	tiles.grass = tiles.sheet.crop(tiles.width * 1, tiles.height * 15, tiles.width, tiles.height);
	tiles.dirt = tiles.sheet.crop(tiles.width * 7, tiles.height * 15, tiles.width, tiles.height);
	tiles.stone = tiles.sheet.crop(tiles.width * 39, tiles.height * 17, tiles.width, tiles.height);

	return Assets;
});