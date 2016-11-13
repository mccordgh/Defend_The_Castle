define(function() {
	var ImageLoader = {};

	ImageLoader.loadImage = function(_path){
		var image = new Image();
		image.src = _path;
		return image;
	};

	return ImageLoader;
});
