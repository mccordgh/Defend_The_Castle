define(['Class'], function(Class){

	const CURRENT_PATH = window.location.href;

	var SoundManager = Class.extend({
		init: function(){			
			console.log("sm init");
		},
		play: function(_sound){
			this[_sound].play();
		},
		setSounds: function(){
			this.explode = sounds[`${CURRENT_PATH}/res/sound/explode.wav`];
			this.gameMusic = sounds[`${CURRENT_PATH}/res/sound/ItaloUnlimited.mp3`];
			this.lvlup = sounds[`${CURRENT_PATH}/res/sound/lvlup.ogg`];
			this.lvldown = sounds[`${CURRENT_PATH}/res/sound/lvldown.ogg`];
			this.spawn = sounds[`${CURRENT_PATH}/res/sound/spawn.ogg`];
			this.monster = sounds[`${CURRENT_PATH}/res/sound/monster.wav`];
			this.sword = sounds[`${CURRENT_PATH}/res/sound/sword.wav`];
			this.selectSound = sounds[`${CURRENT_PATH}/res/sound/select.wav`];
			this.startSound = sounds[`${CURRENT_PATH}/res/sound/start.wav`];
			this.musicSound = sounds[`${CURRENT_PATH}/res/sound/HighStakes.mp3`];
			this.musicSound.loop = true;
			this.musicSound.volume = 0.5;
			this.selectSound.volume = 0.7;
			this.startSound.volume = 0.7;
			this.explode.volume = 0.7;
			this.gameMusic.volume = 0.5;
			this.lvlup.volume = 0.7;
			this.lvldown.volume = 0.7;
			this.spawn.volume = 0.7;
			this.monster.volume = 0.7;
			this.sword.volume = 0.7;
			this.sword.playbackRate = 0.5;
			this.spawn.playbackRate = 0.5;
			this.gameMusic.loop = true;
		},
		setVolume: function(_volume){
			this.volume = _volume;
		},
		setLoop: function(_sound, _bool){
			this[_sound].loop = _bool
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