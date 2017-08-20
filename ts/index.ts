class ImagesForSlider {
    src: string;
    text: string;

    constructor(src, text) {
        this.src = src;
        this.text = text;
    }
}

let imagesForSlider: ImagesForSlider[] = [
    new ImagesForSlider('./images/products/1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/2.png', 'Some text 2'),
    new ImagesForSlider('./images/products/3.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/4.png', 'Some text 4'),
];

// let sliderImage: HTMLImageElement = <HTMLImageElement>document.getElementById('imageForSlider');
// let sliderText = document.getElementById('imageDescription');
//
// var canvas: any = document.getElementById("canvasSlider");
// var ctx: any = canvas.getContext('2d');
//
// var canvasOverlay: any = document.getElementById("canvasZoomSlider");
// var ctxOverlay: any = canvasOverlay.getContext('2d');
//
// let currentImageIndex = 0;

const ZOOM_RECT_WIDTH = 100, ZOOM_RECT_HEIGHT = 150;

function setImageToCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement, watermark: any) {
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "15px PT Sans";

    ctx.fillText(watermark, canvas.width - 90, 30);
}

class Zoomer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    zoomCanvas: HTMLCanvasElement;
    ctxZoom: CanvasRenderingContext2D;

    defaultImage: any;

    topPos: number;
    leftPos: number;
    zoomData: ImageData;

    constructor(canvas, zoomCanvas, defaultImage) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.defaultImage = defaultImage;

        this.canvas.addEventListener('mousemove', this.move.bind(this));
        this.canvas.addEventListener('mouseout', this.out.bind(this));

        this.zoomCanvas = zoomCanvas;
        this.ctxZoom = this.zoomCanvas.getContext('2d');

        this.initParams();
    }

    initParams() {
        this.topPos = 0;
        this.leftPos = 0;
        this.zoomData = null;
    }

    private drawZoomRect(e: any) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.strokeStyle = '#FFCC00';
        this.ctx.lineWidth = 2;

        const widthScale = this.canvas.width / e.target.clientWidth;
        const heightScale = this.canvas.height / e.target.clientHeight;

        this.leftPos = this.getSidePosition(e.layerX * widthScale - (ZOOM_RECT_WIDTH / 2), this.canvas.width, ZOOM_RECT_WIDTH);
        this.topPos = this.getSidePosition(e.layerY * heightScale - (ZOOM_RECT_HEIGHT / 2), this.canvas.height, ZOOM_RECT_HEIGHT);

        this.zoomData = this.ctx.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);

        this.ctx.fillRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.strokeRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
    }

    move(e: any) {
        if (this.zoomData) {
            setImageToCanvas(this.canvas, this.defaultImage, 'Demo shop');
            this.ctx.putImageData(this.zoomData, this.leftPos - 2, this.topPos - 2);
        }

        this.drawZoomRect(e);
        this.showZoomData(e);
    }

    getSidePosition(pos: number, canvasSizeSide: number, zoomRectSideSize: number): number {
        pos = pos < 0 ? 0 : pos;
        return pos > canvasSizeSide - zoomRectSideSize ? canvasSizeSide - zoomRectSideSize : pos;
    }

    out(e: any) {
        this.initParams();
        this.hideZoomData();

        setImageToCanvas(this.canvas, this.defaultImage, 'Demo shop');
    }

    showZoomData(e) {
        this.zoomCanvas.style.display = 'block';
        this.zoomCanvas.width = this.zoomData.width * 2 - 4;
        this.zoomCanvas.height = this.zoomData.height * 2 - 4;

        this.ctxZoom.save();

        this.ctxZoom.clearRect(0, 0, this.zoomCanvas.width, this.zoomCanvas.height);

        this.ctxZoom.putImageData(this.zoomData, -2, -2);

        this.ctxZoom.scale(2, 2);
        this.ctxZoom.drawImage(this.zoomCanvas, 0, 0);

        this.ctxZoom.restore();
    }

    hideZoomData() {
        this.zoomCanvas.style.display = 'none';
    }
}

class Slider {
    images: any[];

    canvas: HTMLCanvasElement;

    indexSelectedImage: number;
    selectedImage: HTMLImageElement;
    descSelectedImage: HTMLElement;

    constructor(images: any) {
        this.images = images;

        this.indexSelectedImage = 0;
        this.selectedImage = <HTMLImageElement>document.getElementById('imageForSlider');
        this.descSelectedImage = <HTMLElement>document.getElementById('imageDescription');

        this.canvas = <HTMLCanvasElement>document.getElementById("canvasSlider");

        this.initSlider();
    }

    initSlider() {
        this.selectedImage.src = this.images[this.indexSelectedImage].src;
        this.descSelectedImage.innerText = this.images[this.indexSelectedImage].text;

        document.getElementById('setPreviousImage').addEventListener(
            'click', this.setPreviousImage.bind(this));
        document.getElementById('setNextImage').addEventListener(
            'click', this.setNextImage.bind(this));

        this.setImageToCanvas();

        let zoomer = new Zoomer(this.canvas, <HTMLCanvasElement>document.getElementById("canvasZoomSlider"), this.selectedImage);
    }

    setImageToSlider() {
        let alpha = 1;

        let fadeEffect = setInterval(() => {
            let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.globalAlpha = alpha;
            ctx.drawImage(this.selectedImage, 0, 0);

            alpha = alpha - 0.05;
            if (alpha < 0) {
                clearInterval(fadeEffect);
            }
        }, 50);

        setTimeout(() => {
            this.selectedImage.src = this.images[this.indexSelectedImage].src;

            this.descSelectedImage.innerText = imagesForSlider[this.indexSelectedImage].text;
            this.descSelectedImage.style.left = 'auto';
            this.descSelectedImage.style.right = 'auto';

            if (this.selectedImage.complete) {
                this.setImageToCanvas();
            } else {
                this.selectedImage.onload = () => {
                    this.setImageToCanvas();
                };
            }

            clearInterval(fadeEffect);
        }, 500);
    }

    textAnimation(sideAnimation: string) {
        let pos = 0;
        let animation = setInterval(() => {
            this.descSelectedImage.style[sideAnimation] = ++pos + '%';
        }, 20);

        setTimeout(() => {
            clearInterval(animation);
        }, 500);
    }

    setPreviousImage() {
        this.indexSelectedImage = --this.indexSelectedImage < 0 ? this.images.length - 1 : this.indexSelectedImage;
        this.textAnimation('left');
        this.setImageToSlider();
    }

    setNextImage() {
        this.indexSelectedImage = (this.indexSelectedImage + 1) % this.images.length;
        this.textAnimation('right');
        this.setImageToSlider();
    }

    setImageToCanvas() {
        setImageToCanvas(this.canvas, this.selectedImage, 'Demo Shop');
    }
}

// function sliderInit() {
//     sliderImage.src = imagesForSlider[currentImageIndex].src;
//     sliderText.innerText = imagesForSlider[currentImageIndex].text;
//     workWithCanvas();
// }
//
// function setSliderImage() {
//     var alpha = 1.0;
//     let interval = setInterval(() => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.globalAlpha = alpha;
//         ctx.drawImage(sliderImage, 0, 0);
//         alpha = alpha - 0.05;
//         if (alpha < 0) {
//             workWithCanvas();
//             clearInterval(interval);
//         }
//     }, 50);
//
//     setTimeout(() => {
//         sliderImage.src = imagesForSlider[currentImageIndex].src;
//
//         sliderText.innerText = imagesForSlider[currentImageIndex].text;
//         sliderText.style.left = 'auto';
//         sliderText.style.right = 'auto';
//
//         sliderImage.className = "";
//
//         if (sliderImage.complete) {
//             workWithCanvas();
//         } else {
//             sliderImage.onload = function () {
//                 workWithCanvas();
//             };
//         }
//
//         clearInterval(interval);
//
//     }, 500);
// }
//
// function previousImage() {
//     currentImageIndex = --currentImageIndex < 0 ? imagesForSlider.length - 1 : currentImageIndex;
//
//     let pos = 0;
//     let animation = setInterval(() => {
//         sliderText.style.left = ++pos + '%';
//     }, 20);
//
//     setTimeout(() => {
//         clearInterval(animation);
//     }, 500);
//
//     setSliderImage();
// }
//
// function nextImage() {
//     currentImageIndex = (currentImageIndex + 1) % imagesForSlider.length;
//
//     let pos = 0;
//     let animation = setInterval(() => {
//         sliderText.style.right = ++pos + '%';
//     }, 20);
//
//     setTimeout(() => {
//         clearInterval(animation);
//     }, 500);
//
//     setSliderImage();
// }
//
// sliderInit();
//
// document.getElementById('previousImage').addEventListener(
//     'click', previousImage);
// document.getElementById('nextImage').addEventListener(
//     'click', nextImage);
//
// function workWithCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     canvas.width = sliderImage.width;
//     canvas.height = sliderImage.height;
//
//     ctx.drawImage(sliderImage, 0, 0);
//
//     ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
//     ctx.font = "15px PT Sans";
//     ctx.fillText("Demo shop", canvas.width - 90, 30);
// }
//
// var _topPos = 0;
// var _leftPos = 0;
// var _imgData = null;
//
// canvas.addEventListener('mousemove', function (e) {
//     let context = canvas.getContext('2d');
//
//     if (_imgData) {
//         workWithCanvas();
//         context.putImageData(_imgData, _leftPos - 2, _topPos - 2);
//     }
//
//     context.strokeStyle = '#FFCC00';
//     context.fillStyle = "rgba(255, 255, 255, 0.3)";
//     context.lineWidth = '2';
//
//     var widthScale = canvas.width / e.target.clientWidth;
//     var heightScale = canvas.height / e.target.clientHeight;
//
//     _leftPos = e.layerX * widthScale - 50;
//     _leftPos = _leftPos < 0 ? 0 : _leftPos;
//     _leftPos = _leftPos > canvas.width - 100 ? canvas.width - 100 : _leftPos;
//
//     _topPos = e.layerY * heightScale - 75;
//     _topPos = _topPos < 0 ? 0 : _topPos;
//     _topPos = _topPos > canvas.height - 150 ? canvas.height - 150 : _topPos;
//
//     _imgData = context.getImageData(_leftPos - 2, _topPos - 2, 100, 150);
//
//     context.fillRect(_leftPos, _topPos, 100, 150);
//     context.strokeRect(_leftPos, _topPos, 100, 150);
//
//     showZoomedData(e);
// });
//
// canvas.addEventListener('mouseout', function () {
//     _imgData = null;
//     workWithCanvas();
//     hideZoomedData();
// });
//
// var showZoomedData = function (e) {
//     canvasOverlay.style['display'] = 'block';
//
//     let target = canvasOverlay;
//
//     target.width = _imgData.width * 2 - 4;
//     target.height = _imgData.height * 2 - 4;
//
//     let context = canvasOverlay.getContext('2d');
//
//     context.save();
//     context.clearRect(0, 0, target.width, target.height);
//     context.putImageData(_imgData, -2, -2);
//     context.scale(2, 2);
//     context.drawImage(target, 0, 0);
//     context.restore();
// };
//
// var hideZoomedData = function () {
//     if (canvasOverlay.style['display'] === 'block') {
//         canvasOverlay.style['display'] = 'none';
//     }
// };

let slider = new Slider(imagesForSlider);
