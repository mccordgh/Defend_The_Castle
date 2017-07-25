define(['Class', 'ImageLoader', 'SpriteSheet', 'Animation'], function(Class,ImageLoader,SpriteSheet, Animation){

	const CURRENT_PATH = window.location.href;
	let DEFAULT_WIDTH = 32, DEFAULT_HEIGHT = 32, assets = {};

	let Assets = Class.extend({
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

	//***** DECLARING ASSETS TEMPLATE
	//let X = new Assets(name, url, width, height);

	//RANK ICONS
	let rankIcons = new Assets('rankIcons', CURRENT_PATH + "res/textures/LB_icons.png", 96, 96);
	rankIcons.Squire = rankIcons.sheet.crop(0, 96, 96, 96);
	rankIcons.Knight = rankIcons.sheet.crop(96, 96, 96, 96);
	rankIcons.Captain = rankIcons.sheet.crop(192, 96, 96, 96);
	rankIcons.Baron = rankIcons.sheet.crop(0, 0, 96, 96);
	rankIcons.Duke = rankIcons.sheet.crop(96, 0, 96, 96);
	rankIcons.Lord = rankIcons.sheet.crop(192, 0, 96, 96);
	rankIcons.Emporer = rankIcons.sheet.crop(288, 0, 96, 96);

	//PIXEL FONT FOR A-Z
	//letters are 42x68	
	// let pixelFont = new Assets("pixelFont", CURRENT_PATH + "res/textures/pixel_font_a_to_z.png", 1362, 182);
	// pixelFont.a = pixelFont.sheet.crop(31, 43, 25, 35);
	// pixelFont.b = pixelFont.sheet.crop(57, 43, 24, 35);
	// pixelFont.c = pixelFont.sheet.crop(82, 43, 24, 35);
	// pixelFont.d = pixelFont.sheet.crop(107, 43, 24, 35);
	// pixelFont.e = pixelFont.sheet.crop(132, 43, 25, 35);
	// pixelFont.f = pixelFont.sheet.crop(157, 43, 24, 35);
	// pixelFont.g = pixelFont.sheet.crop(184, 43, 24, 35);
	// pixelFont.h = pixelFont.sheet.crop(210, 43, 26, 35);
	// pixelFont.i = pixelFont.sheet.crop(236, 43, 16, 35);
	// pixelFont.j = pixelFont.sheet.crop(253, 43, 24, 35);
	// pixelFont.k = pixelFont.sheet.crop(278, 43, 24, 35);
	// pixelFont.l = pixelFont.sheet.crop(303, 43, 24, 35);
	// pixelFont.m = pixelFont.sheet.crop(328, 43, 41, 35);
	// pixelFont.n = pixelFont.sheet.crop(370, 43, 24, 35);
	// pixelFont.o = pixelFont.sheet.crop(395, 43, 24, 35);
	// pixelFont.p = pixelFont.sheet.crop(420, 43, 24, 35);
	// pixelFont.q = pixelFont.sheet.crop(445, 43, 24, 37);
	// pixelFont.r = pixelFont.sheet.crop(470, 43, 25, 35);
	// pixelFont.s = pixelFont.sheet.crop(496, 43, 28, 35);
	// pixelFont.t = pixelFont.sheet.crop(522, 43, 25, 35);
	// pixelFont.u = pixelFont.sheet.crop(548, 43, 25, 35);
	// pixelFont.v = pixelFont.sheet.crop(574, 43, 26, 35);
	// pixelFont.w = pixelFont.sheet.crop(600, 43, 41, 35);
	// pixelFont.x = pixelFont.sheet.crop(642, 43, 24, 35);
	// pixelFont.y = pixelFont.sheet.crop(667, 43, 24, 35);
	// pixelFont.z = pixelFont.sheet.crop(692, 43, 24, 35);


	//Title Screen
	let titleScreenAssets = new Assets("title", CURRENT_PATH + "res/textures/new_main_menu.png", 1024, 700);
	titleScreenAssets.mainMenu = titleScreenAssets.sheet.crop(0, 0, 1024, 640);
	titleScreenAssets.pointer = titleScreenAssets.sheet.crop(0, 641, 128, 41);

	//How to Screen
	let howToAssets = new Assets("howTo", CURRENT_PATH + "res/textures/how_to.png", 1024, 640);
	howToAssets.howToScreen = howToAssets.sheet.crop(0, 0, 1024, 640);

	//MCCORDINATOR GAMES LOGO
	let mccordinatorAssets = new Assets("mccordinator", CURRENT_PATH + "res/textures/mccordinator.jpg", 1200, 859);
	mccordinatorAssets.logo = mccordinatorAssets.sheet.crop(0,0, mccordinatorAssets.width, mccordinatorAssets.height)

	//Leaderboard Logo
	titleScreenAssets.LBLogo = titleScreenAssets.sheet.crop(261, 560, 674, 62);
	//Credits Logo
	titleScreenAssets.creditsLogo = titleScreenAssets.sheet.crop(260, 484, 394, 59);

	//Game Over Assets
	let gameOverAssets = new Assets('gameOver', CURRENT_PATH + "res/textures/gameover.png", 499, 182);
	gameOverAssets.logo = gameOverAssets.sheet.crop(24, 46, 467, 119);

	//Player Sword
	let sword = new Assets('sword', CURRENT_PATH + "res/textures/4swords.png", 1160, 689);
	sword.walk_up = sword.sheet.crop(0, 0, 42, 128);
	sword.walk_down = sword.sheet.crop(43, 0, 43, 128);
	sword.walk_left = sword.sheet.crop(87, 15, 128, 43);
	sword.walk_right = sword.sheet.crop(87, 61, 128, 43);

	//BAT
	let bat = new Assets("bat", CURRENT_PATH + "res/textures/bat-sprite.png", DEFAULT_WIDTH,  DEFAULT_HEIGHT );
	let batframespeed = 200,
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

	for(let i = 1; i < batanimationLength; i++){
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

	let batdeathframes = [
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
	let portal = new Assets("portal",  CURRENT_PATH + "res/textures/tiles.png", DEFAULT_WIDTH,  DEFAULT_HEIGHT);
	// portal.sprite = portal.sheet.crop(portal.width * 30, portal.height * 10, portal.width, portal.height);
	let portframespeed = 200,
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
	let player = new Assets("player",  CURRENT_PATH + "res/textures/warrior_m.png", DEFAULT_WIDTH,  36);
	let framespeed = 200,
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

	for(let i = 0; i < animationLength; i++){
		wuframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wurow, player.width, player.height),
			speed: framespeed
		});
		wrframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wrrow + 1, player.width, player.height),
			speed: framespeed
		});
		wdframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wdrow + 1, player.width, player.height),
			speed: framespeed
		});
		wlframes.push({
			frame: player.sheet.crop(player.width * i, player.height * wlrow + 1, player.width, player.height),
			speed: framespeed
		});
		deathframes.push({
			frame: player.sheet.crop(player.width * i, player.height * deathrow, player.width, player.height),
			speed: 500
		});
	}

	// let idleframes = [
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
	// let player = new Assets("player", "res/textures/warrior_m.png", 32, 36);
	// player.idle = player.sheet.crop(player.width * 1, player.height * 1, player.width, player.height );

	//Tree Asset
	let tree = new Assets("tree",  CURRENT_PATH + "res/textures/snow-expansion.png", 48, 55);
	tree.redwood = tree.sheet.crop(304, 68, tree.width, tree.height);

	//Tile Asset
	let tiles = new Assets("tiles",  CURRENT_PATH + "res/textures/tiles.png", DEFAULT_WIDTH, DEFAULT_HEIGHT);
	tiles.grass = tiles.sheet.crop(tiles.width * 1, tiles.height * 15, tiles.width, tiles.height);
	tiles.dirt = tiles.sheet.crop(tiles.width * 7, tiles.height * 15, tiles.width, tiles.height);
	tiles.stone = tiles.sheet.crop(tiles.width * 39, tiles.height * 17, tiles.width, tiles.height);
	tiles.water = tiles.sheet.crop(tiles.width * 34, tiles.height * 19, tiles.width, tiles.height);

	//Player Portrait
	// let Portraits = new Assets("Portraits", "res/textures/player_portrait.png", 48, 48);
	// Portraits.player = Portraits.sheet.crop(0, 0, 50, 50);

	//HUD
	let hudLayout = new Assets("hudLayout",  CURRENT_PATH + "res/textures/sleekbars.png", 127, 31);
	hudLayout.emptyBar = hudLayout.sheet.crop(0, 0, hudLayout.width, hudLayout.height);
	hudLayout.redBar = hudLayout.sheet.crop(5, hudLayout.height + 5, hudLayout.width - 10, hudLayout.height - 10);
	//HealthBars
	// let healthBars = new Assets("healthBars", "res/textures/ui_pieces.png", 200, 70);
	// healthBars.redBar = healthBars.sheet.crop(240, 23, 102, 9);
	// healthBars.GreenBar = healthBars.sheet.crop(240, 43, 102, 9);
	// healthBars.BlueBar = healthBars.sheet.crop(240, 63, 102, 9);

	//Item Icons
	// let icons = new Assets("icons", "res/textures/ui_pieces.png", 185, 55);
	// icons.sword = icons.sheet.crop(14, 90, icons.width, icons.height);

	let castle = new Assets("castle",  CURRENT_PATH + "res/textures/castle.png", 480, 160);
	castle.sprite1 = castle.sheet.crop(0, 0, 160, castle.height);
	castle.sprite2 = castle.sheet.crop(160, 0, 160, castle.height);
	castle.sprite3 = castle.sheet.crop(320, 0, 160, castle.height);

	//CASTLE animation
	let castleExplode = new Assets("castleExplode",  CURRENT_PATH + "res/textures/tiles.png", DEFAULT_WIDTH,  DEFAULT_HEIGHT);
	let castleExplodeFramespeed = 300,
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
