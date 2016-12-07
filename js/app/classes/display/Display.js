define(['Jquery', 'Class'],function($, Class){
	//Private Variables

	var Display = Class.extend({
		init:function(_title, _width, _height){
			title = _title;
			width = _width;
			height = _height;
			createDisplay();
		},
		getTitle: function() {
			return title;
		},
		getWidth: function() {
			return width;
		},
		getHeight: function() {
			return height;
		},
		getGraphics: function() {
			return graphics;
		}
	});

	//Private Method
	function createDisplay() {
		document.title = title;
		myCanvas = document.getElementById("canvas");
		myCanvas.setAttribute("height", height);
		myCanvas.setAttribute("width", width);
		graphics = myCanvas.getContext("2d");
		graphics.font = '16px arial';
	}

	CanvasRenderingContext2D.prototype.myDrawImage = function(asset, _x, _y, _width, _height){
		this.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, _x, _y, _width, _height);
	};
	
	CanvasRenderingContext2D.prototype.centerTextOnX = function(_text){
		return (width / 2) - (graphics.measureText(_text).width / 2);
	};
	
	CanvasRenderingContext2D.prototype.centerTextOnY = function(){
		return (height / 2);
	};

	CanvasRenderingContext2D.prototype.drawCenterText = function(_textObject){
		graphics.strokeStyle = _textObject.borderColor;
		graphics.fillStyle = _textObject.fillColor;
		graphics.font = `${_textObject.fontSize}px ${_textObject.font}`;
		graphics.strokeText(_textObject.text, _textObject.x(), _textObject.y());
		graphics.fillText(_textObject.text,  _textObject.x(), _textObject.y());
	};

	

	return Display;

});