var ImagesForSlider = (function () {
    function ImagesForSlider(src, text) {
        this.src = src;
        this.text = text;
    }
    return ImagesForSlider;
}());
var imagesForSlider = [
    new ImagesForSlider('./images/products/1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/2.png', 'Some text 2'),
    new ImagesForSlider('./images/products/3.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/4.png', 'Some text 4'),
];
var sliderImage = document.getElementById('imageForSlider');
var sliderText = document.getElementById('imageDescription');
var canvas = document.getElementById("canvasSlider");
var ctx = canvas.getContext('2d');
var canvasOverlay = document.getElementById("canvasZoomSlider");
var ctxOverlay = canvasOverlay.getContext('2d');
var currentImageIndex = 0;
var ZOOM_RECT_WIDTH = 100, ZOOM_RECT_HEIGHT = 150;
var Zoomer = (function () {
    function Zoomer(canvas, zoomCanvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousemove', this.move);
        this.canvas.addEventListener('mouseout', this.out);
        this.zoomCanvas = zoomCanvas;
        this.ctxZoom = this.zoomCanvas.getContext('2d');
        this.initParams();
    }
    Zoomer.prototype.initParams = function () {
        this.topPos = 0;
        this.leftPos = 0;
        this.zoomData = null;
    };
    Zoomer.prototype.move = function (e) {
        if (this.zoomData) {
            workWithCanvas();
            this.ctx.putImageData(this.zoomData, this.leftPos - 2, this.topPos - 2);
        }
        this.drawZoomRect(e);
        this.showZoomData(e);
    };
    Zoomer.prototype.drawZoomRect = function (e) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.strokeStyle = '#FFCC00';
        this.ctx.lineWidth = 2;
        var widthScale = canvas.width / e.target.clientWidth;
        var heightScale = canvas.height / e.target.clientHeight;
        this.leftPos = this.getSidePosition(e.layerX * widthScale - (ZOOM_RECT_WIDTH / 2), canvas.width, ZOOM_RECT_WIDTH);
        this.topPos = this.getSidePosition(e.layerY * heightScale - (ZOOM_RECT_HEIGHT / 2), canvas.height, ZOOM_RECT_HEIGHT);
        this.zoomData = this.ctx.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.fillRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.strokeRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
    };
    Zoomer.prototype.getSidePosition = function (pos, canvasSizeSide, zoomRectSideSize) {
        pos = pos < 0 ? 0 : pos;
        return pos > canvasSizeSide - zoomRectSideSize ? canvasSizeSide - zoomRectSideSize : pos;
    };
    Zoomer.prototype.out = function (e) {
        this.initParams();
        this.hideZoomData();
        workWithCanvas();
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
    ;
    Zoomer.prototype.hideZoomData = function () {
        this.zoomCanvas.style.display = 'none';
    };
    ;
    return Zoomer;
}());
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
var Slider = (function () {
    function Slider(images) {
        this.images = images;
        this.indexSelectedImage = 0;
        this.selectedImage = document.getElementById('imageForSlider');
        this.descSelectedImage = document.getElementById('imageDescription');
        this.initSlider();
    }
    Slider.prototype.initSlider = function () {
        this.selectedImage.src = this.images[currentImageIndex].src;
        this.descSelectedImage.innerText = this.images[currentImageIndex].text;
        setImageToCanvas(document.getElementById("canvasSlider"), document.getElementById('imageForSlider'), 'Demo Shop');
    };
    Slider.prototype.setImageToSlider = function () {
        var _this = this;
        var alpha = 1;
        var interval = setInterval(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = alpha;
            ctx.drawImage(sliderImage, 0, 0);
            alpha = alpha - 0.05;
            if (alpha < 0) {
                workWithCanvas();
                clearInterval(interval);
            }
        }, 50);
        setTimeout(function () {
            _this.selectedImage.src = _this.images[_this.indexSelectedImage].src;
            sliderText.innerText = imagesForSlider[currentImageIndex].text;
            sliderText.style.left = 'auto';
            sliderText.style.right = 'auto';
            if (sliderImage.complete) {
                workWithCanvas();
            }
            else {
                sliderImage.onload = function () {
                    workWithCanvas();
                };
            }
            clearInterval(interval);
        }, 500);
    };
    return Slider;
}());
function sliderInit() {
    sliderImage.src = imagesForSlider[currentImageIndex].src;
    sliderText.innerText = imagesForSlider[currentImageIndex].text;
    workWithCanvas();
}
function setSliderImage() {
    var alpha = 1.0;
    var interval = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = alpha;
        ctx.drawImage(sliderImage, 0, 0);
        alpha = alpha - 0.05;
        if (alpha < 0) {
            workWithCanvas();
            clearInterval(interval);
        }
    }, 50);
    setTimeout(function () {
        sliderImage.src = imagesForSlider[currentImageIndex].src;
        sliderText.innerText = imagesForSlider[currentImageIndex].text;
        sliderText.style.left = 'auto';
        sliderText.style.right = 'auto';
        sliderImage.className = "";
        if (sliderImage.complete) {
            workWithCanvas();
        }
        else {
            sliderImage.onload = function () {
                workWithCanvas();
            };
        }
        clearInterval(interval);
    }, 500);
}
function previousImage() {
    currentImageIndex = --currentImageIndex < 0 ? imagesForSlider.length - 1 : currentImageIndex;
    var pos = 0;
    var animation = setInterval(function () {
        sliderText.style.left = ++pos + '%';
    }, 20);
    setTimeout(function () {
        clearInterval(animation);
    }, 500);
    setSliderImage();
}
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesForSlider.length;
    var pos = 0;
    var animation = setInterval(function () {
        sliderText.style.right = ++pos + '%';
    }, 20);
    setTimeout(function () {
        clearInterval(animation);
    }, 500);
    setSliderImage();
}
sliderInit();
document.getElementById('previousImage').addEventListener('click', previousImage);
document.getElementById('nextImage').addEventListener('click', nextImage);
function workWithCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = sliderImage.width;
    canvas.height = sliderImage.height;
    ctx.drawImage(sliderImage, 0, 0);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "15px PT Sans";
    ctx.fillText("Demo shop", canvas.width - 90, 30);
}
var _topPos = 0;
var _leftPos = 0;
var _imgData = null;
canvas.addEventListener('mousemove', function (e) {
    var context = canvas.getContext('2d');
    if (_imgData) {
        workWithCanvas();
        context.putImageData(_imgData, _leftPos - 2, _topPos - 2);
    }
    context.strokeStyle = '#FFCC00';
    context.fillStyle = "rgba(255, 255, 255, 0.3)";
    context.lineWidth = '2';
    var widthScale = canvas.width / e.target.clientWidth;
    var heightScale = canvas.height / e.target.clientHeight;
    _leftPos = e.layerX * widthScale - 50;
    _leftPos = _leftPos < 0 ? 0 : _leftPos;
    _leftPos = _leftPos > canvas.width - 100 ? canvas.width - 100 : _leftPos;
    _topPos = e.layerY * heightScale - 75;
    _topPos = _topPos < 0 ? 0 : _topPos;
    _topPos = _topPos > canvas.height - 150 ? canvas.height - 150 : _topPos;
    _imgData = context.getImageData(_leftPos - 2, _topPos - 2, 100, 150);
    context.fillRect(_leftPos, _topPos, 100, 150);
    context.strokeRect(_leftPos, _topPos, 100, 150);
    showZoomedData(e);
});
canvas.addEventListener('mouseout', function () {
    _imgData = null;
    workWithCanvas();
    hideZoomedData();
});
var showZoomedData = function (e) {
    canvasOverlay.style['display'] = 'block';
    var target = canvasOverlay;
    target.width = _imgData.width * 2 - 4;
    target.height = _imgData.height * 2 - 4;
    var context = canvasOverlay.getContext('2d');
    context.save();
    context.clearRect(0, 0, target.width, target.height);
    context.putImageData(_imgData, -2, -2);
    context.scale(2, 2);
    context.drawImage(target, 0, 0);
    context.restore();
};
var hideZoomedData = function () {
    if (canvasOverlay.style['display'] === 'block') {
        canvasOverlay.style['display'] = 'none';
    }
};
