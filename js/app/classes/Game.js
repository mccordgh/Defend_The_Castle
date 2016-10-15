define(['Class', 'Display'], function(Class,Display){

	var _this;
	var running = false;
	var title, width, height, g, display;

	var Game = Class.extend({
		init:function(_title, _width, _height){

			_this = this;
			title = _title;
			width = _width;
			height = _height;

		}
	});

	function init() {
		display = new Display(title, width, height);
		g = display.getGraphics();
	}
	
	function tick(_dt) {

	}

	function render(){
		g.clearRect(0,0,width,height);
		g.fillRect(20,20,200,50);
	}

	Game.prototype.run = function(){
		init();
		var fps = 30;
		var timePerTick = 1000/fps;
		var delta = 0;
		var now;
		var lastTime = Date.now();
		var timer = 0;
		var ticks = 0;
		
		function loop(){
			if(running) {
				now = Date.now();
				delta = now - lastTime;
				timer += delta;
				lastTime = now;
			}
		
			if(timer >= timePerTick){
				dt = timer/1000;
				tick(dt);
				render();
				timer = 0;
			}
			window.requestAnimationFrame(loop);
		}

		loop();
	
	}

	Game.prototype.start = function() {
		if(running)return;
		running = true;
		this.run();
	}	

	return Game;

});