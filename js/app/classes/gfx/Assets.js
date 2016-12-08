define(['Class', 'ImageLoader', 'SpriteSheet', 'Animation'], function(Class,ImageLoader,SpriteSheet, Animation){

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
			this.animations = {};
		},
		addAnimation: function(_name, _animation){
			this.animations[_name] = _animation;
		}
		
	});

	Assets.DEFAULT_WIDTH = DEFAULT_WIDTH;
	Assets.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
		
	Assets.getAssets = function(_name){
			return assets[_name];
	};

	//var X = new Assets(name, url, width, height);
	
	// monsters.bat = monsters.sheet.crop(monsters.width * 2, 0, monsters.width, monsters.height);

	//Build Animation Frames

	//BAT
	var bat = new Assets("bat", "res/textures/bat-sprite.png", DEFAULT_WIDTH,  DEFAULT_HEIGHT );
	var batframespeed = 200,
			batwdframes = [], //walk right frames
			batwrframes = [], //walk left frames
			batwuframes = [], //walk up frames
			batwlframes = [], //walk down frames
			// deathframes = [], //dead animation frames
			batwdrow = 0, //walk up row on spritesheet
			batwrrow = 1, //walk right row on spritesheet
			batwurow = 2, //walk down row on spritesheet
			batwlrow = 3, //walk left row on spritesheet
			// deathrow = 4, //death animation row on spritesheet
			batanimationLength = 4; //how many frames in animation

	for(var i = 1; i < batanimationLength; i++){
		batwrframes.push({
			frame: bat.sheet.crop(bat.width * i, bat.height * batwrrow, bat.width, bat.height),
			speed: batframespeed
		});
		batwdframes.push({
			frame: bat.sheet.crop(bat.width * i, bat.height * batwdrow, bat.width, bat.height),
			speed: batframespeed
		});
		batwuframes.push({
			frame: bat.sheet.crop(bat.width * i, bat.height * batwurow, bat.width, bat.height),
			speed: batframespeed
		});
		batwlframes.push({
			frame: bat.sheet.crop(bat.width * i, bat.height * batwlrow, bat.width, bat.height),
			speed: batframespeed
		});
	}

	var batdeathframes = [
		{frame: bat.sheet.crop(0,0, bat.width, bat.height),speed: batframespeed},
		{frame: bat.sheet.crop(0, bat.width * 1, bat.width, bat.height),speed: batframespeed},
		{frame: bat.sheet.crop(0, bat.width * 2, bat.width, bat.height),speed: batframespeed},
		{frame: bat.sheet.crop(0, bat.width * 3, bat.width, bat.height),speed: batframespeed}
	];

	bat.addAnimation("walk_up", new Animation(batwuframes));
	bat.addAnimation("walk_right", new Animation(batwrframes));
	bat.addAnimation("walk_down", new Animation(batwdframes));
	bat.addAnimation("walk_left", new Animation(batwlframes));
	bat.addAnimation("idle", new Animation(batwdframes));
	bat.addAnimation("death", new Animation(batdeathframes));

	//PORTAL
	var portal = new Assets("portal", "res/textures/tiles.png", DEFAULT_WIDTH,  DEFAULT_HEIGHT);
	// portal.sprite = portal.sheet.crop(portal.width * 30, portal.height * 10, portal.width, portal.height);
	var portframespeed = 200,
			portalframes = [], //portal idle spin frames
			portframesX = 30, //X on spritesheet
			portframesY = 10, //Y on spritesheet
			portalanimationLength = 4; //how many frames in animation

for(let i = 0; i < portalanimationLength; i++){
		portalframes.push({
			frame: portal.sheet.crop(portal.width * (i + portframesX), portal.height * portframesY, portal.width, portal.height),
			speed: portframespeed
		});
	}
	portal.addAnimation("idle", new Animation(portalframes));

	//PLAYER
	var player = new Assets("player", "res/textures/warrior_m.png", DEFAULT_WIDTH,  36);
	var framespeed = 200,
			wrframes = [], //walk right frames
			wlframes = [], //walk left frames
			wuframes = [], //walk up frames
			wdframes = [], //walk down frames
			deathframes = [], //dead animation frames
			wurow = 0, //walk up row on spritesheet
			wrrow = 1, //walk right row on spritesheet
			wdrow = 2, //walk down row on spritesheet
			wlrow = 3, //walk left row on spritesheet
			deathrow = 4, //death animation row on spritesheet
			animationLength = 3; //how many frames in animation

	for(var i = 0; i < animationLength; i++){
		wuframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wurow, player.width, player.height),
			speed: framespeed
		});
		wrframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wrrow, player.width, player.height),
			speed: framespeed
		});
		wdframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wdrow, player.width, player.height),
			speed: framespeed
		});
		wlframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wlrow, player.width, player.height),
			speed: framespeed
		});
		deathframes.push({
			frame: player.sheet.crop(player.width * i, player.height * deathrow, player.width, player.height),
			speed: 500
		});
	}

	// var idleframes = [
	// 	{frame: player.sheet.crop(0, 2 * player.height, player.width, player.height),speed: framespeed},
	// 	{frame: player.sheet.crop(1 * player.width, 2 * player.height, player.width, player.height),speed: framespeed},
	// 	{frame: player.sheet.crop(2 * player.width, 2 * player.height, player.width, player.height),speed: framespeed}
	// ];

	player.addAnimation("walk_up", new Animation(wuframes));
	player.addAnimation("walk_right", new Animation(wrframes));
	player.addAnimation("walk_down", new Animation(wdframes));
	player.addAnimation("walk_left", new Animation(wlframes));
	// player.addAnimation("idle", new Animation(idleframes));
	player.addAnimation("death", new Animation(deathframes));


	// Player asset
	// var player = new Assets("player", "res/textures/warrior_m.png", 32, 36);
	// player.idle = player.sheet.crop(player.width * 1, player.height * 1, player.width, player.height );

	//Tree Asset
	var tree = new Assets("tree", "res/textures/snow-expansion.png", 48, 55);
	tree.redwood = tree.sheet.crop(304, 68, tree.width, tree.height);

	//Tile Asset
	var tiles = new Assets("tiles", "res/textures/tiles.png", DEFAULT_WIDTH, DEFAULT_HEIGHT);
	tiles.grass = tiles.sheet.crop(tiles.width * 1, tiles.height * 15, tiles.width, tiles.height);
	tiles.dirt = tiles.sheet.crop(tiles.width * 7, tiles.height * 15, tiles.width, tiles.height);
	tiles.stone = tiles.sheet.crop(tiles.width * 39, tiles.height * 17, tiles.width, tiles.height);

	//Player Portrait
	// var Portraits = new Assets("Portraits", "res/textures/player_portrait.png", 48, 48);
	// Portraits.player = Portraits.sheet.crop(0, 0, 50, 50);

	//HUD
	var hudLayout = new Assets("hudLayout", "res/textures/sleekbars.png", 127, 31);
	hudLayout.emptyBar = hudLayout.sheet.crop(0, 0, hudLayout.width, hudLayout.height);
	hudLayout.redBar = hudLayout.sheet.crop(5, hudLayout.height + 5, hudLayout.width - 10, hudLayout.height - 10);
	//HealthBars
	// var healthBars = new Assets("healthBars", "res/textures/ui_pieces.png", 200, 70);
	// healthBars.redBar = healthBars.sheet.crop(240, 23, 102, 9);
	// healthBars.GreenBar = healthBars.sheet.crop(240, 43, 102, 9);
	// healthBars.BlueBar = healthBars.sheet.crop(240, 63, 102, 9);

	//Item Icons
	// var icons = new Assets("icons", "res/textures/ui_pieces.png", 185, 55);
	// icons.sword = icons.sheet.crop(14, 90, icons.width, icons.height);

	var castle = new Assets("castle", "res/textures/castle.png", 160, 160);
	castle.sprite = castle.sheet.crop(0, 0, castle.width, castle.height);

	//CASTLE animation
	var castleExplode = new Assets("castleExplode", "res/textures/tiles.png", DEFAULT_WIDTH,  DEFAULT_HEIGHT);
	var castleExplodeFramespeed = 300,
			castleExplodeFrames = [], //castle idle spin frames
			castleExplodeFramesX = 20, //X on spritesheet
			castleExplodeFramesY = 10, //Y on spritesheet
			castleanimationLength = 3; //how many frames in animation

for(let i = 0; i < castleanimationLength; i++){
		castleExplodeFrames.push({
			frame: castleExplode.sheet.crop(castleExplode.width * (i + castleExplodeFramesX), castleExplode.height * castleExplodeFramesY, castleExplode.width, castleExplode.height),
			speed: castleExplodeFramespeed
		});
	}
	castle.addAnimation("explode", new Animation(castleExplodeFrames));

	return Assets;
});
