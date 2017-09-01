// Slider
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
var ImageForSlider = /** @class */ (function () {
    function ImageForSlider(src, text) {
        this.src = src;
        this.text = text;
    }
    return ImageForSlider;
}());
var Zoomer = /** @class */ (function () {
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
        this.rectData = null;
        this.zoomData = null;
    };
    Zoomer.prototype.drawZoomRect = function (e) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.strokeStyle = '#FFCC00';
        this.ctx.lineWidth = 2;
        var widthScale = this.canvas.width / e.target.clientWidth;
        var heightScale = this.canvas.height / e.target.clientHeight;
        this.leftPos = Zoomer.getSidePosition(e.layerX * widthScale - (ZOOM_RECT_WIDTH / 2), this.canvas.width, ZOOM_RECT_WIDTH);
        this.topPos = Zoomer.getSidePosition(e.layerY * heightScale - (ZOOM_RECT_HEIGHT / 2), this.canvas.height, ZOOM_RECT_HEIGHT);
        var tempCanvas = document.createElement('canvas');
        var ctxTempCanvas = tempCanvas.getContext('2d');
        tempCanvas.width = this.defaultImage.width;
        tempCanvas.height = this.defaultImage.height;
        ctxTempCanvas.drawImage(this.defaultImage, 0, 0);
        this.rectData = this.ctx.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.zoomData = ctxTempCanvas.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.fillRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.strokeRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
    };
    Zoomer.prototype.move = function (e) {
        if (this.rectData) {
            setImageToCanvas(this.canvas, this.defaultImage, WATERMARK);
            this.ctx.putImageData(this.rectData, this.leftPos - 2, this.topPos - 2);
        }
        this.drawZoomRect(e);
        this.showZoomData(e);
    };
    Zoomer.getSidePosition = function (pos, canvasSizeSide, zoomRectSideSize) {
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
var Slider = /** @class */ (function () {
    function Slider(images) {
        this.images = images;
        this.indexSelectedImage = 0;
        this.selectedImage = document.getElementById('imageForSlider');
        this.descSelectedImage = document.getElementById('imageDescription');
        this.canvas = document.getElementById("canvasSlider");
        this.initSlider();
    }
    Slider.prototype.initSlider = function () {
        var _this = this;
        this.selectedImage.src = this.images[this.indexSelectedImage].src;
        this.descSelectedImage.innerText = this.images[this.indexSelectedImage].text;
        document.getElementById('setPreviousImage').addEventListener('click', this.setPreviousImage.bind(this));
        document.getElementById('setNextImage').addEventListener('click', this.setNextImage.bind(this));
        if (this.selectedImage.complete) {
            this.setImageToCanvas();
        }
        else {
            this.selectedImage.onload = function () {
                _this.setImageToCanvas();
            };
        }
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
    new ImageForSlider('./images/products/1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImageForSlider('./images/products/2.png', 'Some text 2'),
    new ImageForSlider('./images/products/3.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImageForSlider('./images/products/4.png', 'Some text 4'),
];
new Slider(images);
// Review
var Variable = /** @class */ (function () {
    function Variable(name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        this.name = name;
        this.element = document.querySelector("#" + this.name);
        this.defaultValue = defaultValue;
        this.value = null;
        this.event = new Event(this.name + " change");
    }
    Variable.prototype.set = function (value) {
        this.value = value;
        this.element.dispatchEvent(this.event);
    };
    Variable.prototype.get = function () {
        return this.value && this.value.length > 0 ? this.value : this.defaultValue;
    };
    return Variable;
}());
function bindVariableWithElement(v, elementSelector) {
    var bindElem = document.querySelector(elementSelector);
    bindElem.innerHTML = v.defaultValue;
    v.element.addEventListener('input', function () {
        v.set(this.value);
    });
    v.element.addEventListener(v.name + " change", function () {
        // this.value = v.get();
        bindElem.innerHTML = v.get();
    });
}
function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex] + " " + day + ", " + year;
}
var author = new Variable('author', 'Your name');
bindVariableWithElement(author, '#authorName');
var date = document.querySelector('#currentDate');
date.innerHTML = formatDate(new Date());
var review = new Variable('review', 'Start typing and your review text will appear here...');
bindVariableWithElement(review, '#textReview');
var stars = Array.prototype.slice.call(document.querySelectorAll('#rating .stars .star'));
stars.forEach(function (star) {
    star.addEventListener('click', function (e) {
        var selectedIndex = stars.findIndex(function (s) { return s === e.target; });
        selectedIndex++;
        for (var i = 0; i < 5; i++) {
            if (i < selectedIndex) {
                stars[i].classList.add('active-star');
            }
            else {
                stars[i].classList.remove('active-star');
            }
        }
        var starsInReview = document.querySelector('#ratingReview .stars');
        while (starsInReview.firstChild) {
            starsInReview.removeChild(starsInReview.firstChild);
        }
        for (var i = 0; i < 5; i++) {
            var s = document.createElement('div');
            if (i < selectedIndex) {
                s.className = 'star active-star';
            }
            else {
                s.className = 'star';
            }
            starsInReview.appendChild(s);
        }
    });
});
var avatar = document.querySelector('#avatar');
avatar.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var avatarInReview = document.querySelector('#avatarImg');
        avatarInReview.src = e.target.result;
        var avatarContainer = document.querySelector('.input-container-image');
        avatarContainer.style.backgroundImage = "url(" + e.target.result + ")";
        avatarContainer.children[0].innerHTML = 'Image selected';
    };
    reader.readAsDataURL(file);
});
//Buttons with style
var selectionStart = -1, selectionEnd = -1;
function getPosSelectedText(elem) {
    if (elem.tagName === "TEXTAREA") {
        selectionStart = elem.selectionStart;
        selectionEnd = elem.selectionEnd;
    }
}
setInterval(function () {
    getPosSelectedText(document.activeElement);
}, 100);
function addTags(tagType) {
    var tag = '';
    switch (tagType) {
        case 'bold': {
            tag = 'b';
            break;
        }
        case 'emphasize': {
            tag = 'i';
            break;
        }
        case 'quote': {
            tag = 'q';
            break;
        }
    }
    if (selectionEnd > -1 && selectionStart > -1) {
        var reviewValue = review.get();
        reviewValue = reviewValue.slice(0, selectionStart) + ("<" + tag + ">") + reviewValue.slice(selectionStart, selectionEnd) + ("</" + tag + ">") + reviewValue.slice(selectionEnd);
        review.set(reviewValue);
        review.element.value = reviewValue;
        selectionStart = -1;
        selectionEnd = -1;
    }
}
document.querySelector('#boldBtn').addEventListener('click', function () {
    addTags('bold');
});
document.querySelector('#emphasizeBtn').addEventListener('click', function () {
    addTags('emphasize');
});
document.querySelector('#quoteBtn').addEventListener('click', function () {
    addTags('quote');
});
document.querySelector('#cancelBtn').addEventListener('click', toggleReview);
document.querySelector('#addBtn').addEventListener('click', function () {
    alert('Your review has been added!');
});
//------------------------
var isReviewShow = true;
// let isReviewShow = false;
function toggleReview() {
    var review = document.getElementById('reviewContainer'), inviteToReview = document.getElementById('inviteToReview'), reviewInfo = document.getElementById('reviewInfo');
    if (isReviewShow) {
        review.style.display = 'none';
        inviteToReview.style.display = 'block';
        reviewInfo.style.display = 'none';
    }
    else {
        review.style.display = 'block';
        inviteToReview.style.display = 'none';
        reviewInfo.style.display = 'block';
    }
    isReviewShow = !isReviewShow;
}
toggleReview();
