define(['Class'], function(Class){

	const CURRENT_PATH = window.location.href;

	var SoundManager = Class.extend({
		init: function(){			
		},
		play: function(_sound){
			this[_sound].play();
		},
		setSounds: function(){
			this.explode = sounds[`${CURRENT_PATH}/res/sound/explode.wav`];
			this.explodeBat = sounds[`${CURRENT_PATH}/res/sound/explode2.wav`];
			this.gameMusic = sounds[`${CURRENT_PATH}/res/sound/ItaloUnlimited.mp3`];
			this.lvlup = sounds[`${CURRENT_PATH}/res/sound/lvlup.ogg`];
			this.lvldown = sounds[`${CURRENT_PATH}/res/sound/lvldown.ogg`];
			this.spawn = sounds[`${CURRENT_PATH}/res/sound/spawn.ogg`];
			this.monster = sounds[`${CURRENT_PATH}/res/sound/monster.wav`];
			this.sword = sounds[`${CURRENT_PATH}/res/sound/sword.wav`];
			this.selectSound = sounds[`${CURRENT_PATH}/res/sound/select.wav`];
			this.startSound = sounds[`${CURRENT_PATH}/res/sound/start.wav`];
			this.selectSound.volume = 0.7;
			this.startSound.volume = 0.7;
			this.explode.volume = 0.3;
			this.explodeBat.volume = 0.7;
			this.gameMusic.volume = 1;
			this.lvlup.volume = 1;
			this.lvldown.volume = 1;
			this.spawn.volume = 0.7;
			this.monster.volume = 1.2;
			this.sword.volume = 1;
			this.explode.playbackRate = 0.8;
			this.explodeBat.playbackRate = 1.5;
			this.monster.playbackRate = 0.6;
			this.sword.playbackRate = 0.8;
			this.spawn.playbackRate = 0.5;
			this.gameMusic.loop = true;
		},
		setVolume: function(_volume){
			this.volume = _volume;
		},
		setLoop: function(_sound, _bool){
			this[_sound].loop = _bool;
		},
		fadeIn: function(_sound, _seconds){
			this[_sound].play(_sound);
			this[_sound].fadeIn(_seconds);
		},
		fadeOut: function(_sound, _seconds){
			this[_sound].fadeOut(_seconds);
		},
		pause: function(){
			this.pause();
		},
		isLoaded: function(){
			return soundsLoaded;
		}
	});

	return SoundManager;

});