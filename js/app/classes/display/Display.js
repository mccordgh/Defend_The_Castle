define(['Jquery', 'Class', 'Assets'],function($, Class, Assets){
	//Private Variables
	var myFont = Assets.getAssets('pixelFont')

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

	function createDisplay() {
		document.title = title;
		myCanvas = document.getElementById("canvas");
		myCanvas.setAttribute("height", height);
		myCanvas.setAttribute("width", width);
		graphics = myCanvas.getContext("2d");
	}

	CanvasRenderingContext2D.prototype.myDrawImage = function(asset, _x, _y, _width, _height){
		this.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, _x, _y, _width, _height);
	};
	
	CanvasRenderingContext2D.prototype.myDrawText = function(_x, _y, _text){
		text = _text.toLowerCase().split("");
		// console.log("text", text);
		let textStartX = 0;
		for (let i = 0; i < text.length; i++){
			let myAsset = myFont[text[i]];
			// console.log("myFont[text[i]]",myFont[text[i]] );
			graphics.myDrawImage(myAsset, _x + textStartX, _y, myAsset.width, myAsset.height);
			textStartX = textStartX + myAsset.width + 2;
			// console.log("myAsset.sheet", myAsset.sheet);
			
		}
	};
	
	CanvasRenderingContext2D.prototype.centerTextOnX = function(_text){
		return (width / 2) - (graphics.measureText(_text).width / 2);
	};
	
	CanvasRenderingContext2D.prototype.centerTextOnY = function(){
		return (height / 2);
	};

	CanvasRenderingContext2D.prototype.drawText = function(_textObject){
		graphics.font = `${_textObject.fontSize}px VT323`;
		let borderWidth = _textObject.additionalWidth || graphics.measureText(_textObject.text).width;
		graphics.strokeStyle = _textObject.borderColor;
		graphics.fillStyle = _textObject.fillColor;
		graphics.strokeText(_textObject.text, _textObject.x(), _textObject.y());
		graphics.fillText(_textObject.text,  _textObject.x(), _textObject.y());
	};

	return Display;

});