define(['Jquery', 'Class'],function($, Class){
	//Private Variables
	var canvas, title, width, height, graphics;

	var Display = Class.extend({
		init:function(_title, _width, _height){
			title = _title;
			width = _width;
			height = _height;
			createDisplay();
		}
	});

	//Private Methodx
	function createDisplay() {
		document.title = title;
		var body = document.body;
		body.innerHTML = ("<canvas id='canvas' width='" + width + "' height = '" + height + "'></canvas>");
		graphics = document.getElementById("canvas").getContext("2d");
	}

	//Getters
	Display.prototype.getTitle = function(){
		return title;
	}

	Display.prototype.getWidth = function(){
		return width;
	}

	Display.prototype.getHeight = function(){
		return Height;
	}

	Display.prototype.getGraphics = function(){
		return graphics;
	}

	return Display;

});