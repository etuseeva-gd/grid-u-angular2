var ZOOM_RECT_WIDTH = 100, ZOOM_RECT_HEIGHT = 150, WATERMARK = 'Demo shop';
function setImageToCanvas(canvas, image, watermark) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "15px PT Sans";
    ctx.fillText(watermark, canvas.width - 90, 30);
}
var ImagesForSlider = (function () {
    function ImagesForSlider(src, text) {
        this.src = src;
        this.text = text;
    }
    return ImagesForSlider;
}());
var Zoomer = (function () {
    function Zoomer(canvas, zoomCanvas, defaultImage) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.defaultImage = defaultImage;
        this.canvas.addEventListener('mousemove', this.move.bind(this));
        this.canvas.addEventListener('mouseout', this.out.bind(this));
        this.canvas.addEventListener('mousedown', this.out.bind(this));
        this.zoomCanvas = zoomCanvas;
        this.ctxZoom = this.zoomCanvas.getContext('2d');
        this.initParams();
    }
    Zoomer.prototype.initParams = function () {
        this.topPos = 0;
        this.leftPos = 0;
        this.zoomData = null;
    };
    Zoomer.prototype.drawZoomRect = function (e) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.strokeStyle = '#FFCC00';
        this.ctx.lineWidth = 2;
        var widthScale = this.canvas.width / e.target.clientWidth;
        var heightScale = this.canvas.height / e.target.clientHeight;
        this.leftPos = this.getSidePosition(e.layerX * widthScale - (ZOOM_RECT_WIDTH / 2), this.canvas.width, ZOOM_RECT_WIDTH);
        this.topPos = this.getSidePosition(e.layerY * heightScale - (ZOOM_RECT_HEIGHT / 2), this.canvas.height, ZOOM_RECT_HEIGHT);
        this.zoomData = this.ctx.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.fillRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.strokeRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
    };
    Zoomer.prototype.move = function (e) {
        if (this.zoomData) {
            setImageToCanvas(this.canvas, this.defaultImage, WATERMARK);
            this.ctx.putImageData(this.zoomData, this.leftPos - 2, this.topPos - 2);
        }
        this.drawZoomRect(e);
        this.showZoomData(e);
    };
    Zoomer.prototype.getSidePosition = function (pos, canvasSizeSide, zoomRectSideSize) {
        pos = pos < 0 ? 0 : pos;
        return pos > canvasSizeSide - zoomRectSideSize ? canvasSizeSide - zoomRectSideSize : pos;
    };
    Zoomer.prototype.out = function (e) {
        this.initParams();
        this.hideZoomData();
        setImageToCanvas(this.canvas, this.defaultImage, WATERMARK);
    };
    Zoomer.prototype.showZoomData = function (e) {
        this.zoomCanvas.style.display = 'block';
        this.zoomCanvas.width = this.zoomData.width * 2 - 4;
        this.zoomCanvas.height = this.zoomData.height * 2 - 4;
        this.ctxZoom.save();
        this.ctxZoom.clearRect(0, 0, this.zoomCanvas.width, this.zoomCanvas.height);
        this.ctxZoom.putImageData(this.zoomData, -2, -2);
        this.ctxZoom.scale(2, 2);
        this.ctxZoom.drawImage(this.zoomCanvas, 0, 0);
        this.ctxZoom.restore();
    };
    Zoomer.prototype.hideZoomData = function () {
        this.zoomCanvas.style.display = 'none';
    };
    return Zoomer;
}());
var Slider = (function () {
    function Slider(images) {
        this.images = images;
        this.indexSelectedImage = 0;
        this.selectedImage = document.getElementById('imageForSlider');
        this.descSelectedImage = document.getElementById('imageDescription');
        this.canvas = document.getElementById("canvasSlider");
        this.initSlider();
    }
    Slider.prototype.initSlider = function () {
        this.selectedImage.src = this.images[this.indexSelectedImage].src;
        this.descSelectedImage.innerText = this.images[this.indexSelectedImage].text;
        document.getElementById('setPreviousImage').addEventListener('click', this.setPreviousImage.bind(this));
        document.getElementById('setNextImage').addEventListener('click', this.setNextImage.bind(this));
        this.setImageToCanvas();
        this.zoomer = new Zoomer(this.canvas, document.getElementById("canvasZoomSlider"), this.selectedImage);
    };
    Slider.prototype.setImageToSlider = function () {
        var _this = this;
        var alpha = 1;
        var fadeEffect = setInterval(function () {
            var ctx = _this.canvas.getContext('2d');
            ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            ctx.globalAlpha = alpha;
            ctx.drawImage(_this.selectedImage, 0, 0);
            alpha = alpha - 0.05;
            if (alpha < 0) {
                clearInterval(fadeEffect);
            }
        }, 50);
        setTimeout(function () {
            _this.selectedImage.src = _this.images[_this.indexSelectedImage].src;
            _this.descSelectedImage.innerText = _this.images[_this.indexSelectedImage].text;
            _this.descSelectedImage.style.left = 'auto';
            _this.descSelectedImage.style.right = 'auto';
            if (_this.selectedImage.complete) {
                _this.setImageToCanvas();
                _this.zoomer.initParams();
            }
            else {
                _this.selectedImage.onload = function () {
                    _this.setImageToCanvas();
                    _this.zoomer.initParams();
                };
            }
            clearInterval(fadeEffect);
        }, 500);
    };
    Slider.prototype.textAnimation = function (sideAnimation) {
        var _this = this;
        var pos = 0;
        var animation = setInterval(function () {
            _this.descSelectedImage.style[sideAnimation] = ++pos + '%';
        }, 20);
        setTimeout(function () {
            clearInterval(animation);
        }, 500);
    };
    Slider.prototype.setPreviousImage = function () {
        this.indexSelectedImage = --this.indexSelectedImage < 0 ? this.images.length - 1 : this.indexSelectedImage;
        this.textAnimation('left');
        this.setImageToSlider();
    };
    Slider.prototype.setNextImage = function () {
        this.indexSelectedImage = (this.indexSelectedImage + 1) % this.images.length;
        this.textAnimation('right');
        this.setImageToSlider();
    };
    Slider.prototype.setImageToCanvas = function () {
        setImageToCanvas(this.canvas, this.selectedImage, WATERMARK);
    };
    return Slider;
}());
var images = [
    new ImagesForSlider('./images/products/1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/2.png', 'Some text 2'),
    new ImagesForSlider('./images/products/3.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/4.png', 'Some text 4'),
];
var slider = new Slider(images);
