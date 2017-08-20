const ZOOM_RECT_WIDTH = 100, ZOOM_RECT_HEIGHT = 150, WATERMARK = 'Demo shop';

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

class ImagesForSlider {
    src: string;
    text: string;

    constructor(src, text) {
        this.src = src;
        this.text = text;
    }
}

class Zoomer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    zoomCanvas: HTMLCanvasElement;
    ctxZoom: CanvasRenderingContext2D;

    defaultImage: any;

    topPos: number;
    leftPos: number;

    rectData: ImageData;
    zoomData: ImageData;

    constructor(canvas, zoomCanvas, defaultImage) {
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

    initParams() {
        this.topPos = 0;
        this.leftPos = 0;

        this.rectData = null;
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

        let tempCanvas: HTMLCanvasElement = document.createElement('canvas');
        let ctxTempCanvas: CanvasRenderingContext2D = tempCanvas.getContext('2d');
        tempCanvas.width = this.defaultImage.width;
        tempCanvas.height = this.defaultImage.height;
        ctxTempCanvas.drawImage(this.defaultImage, 0, 0);

        this.rectData = this.ctx.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.zoomData = ctxTempCanvas.getImageData(this.leftPos - 2, this.topPos - 2, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);

        this.ctx.fillRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
        this.ctx.strokeRect(this.leftPos, this.topPos, ZOOM_RECT_WIDTH, ZOOM_RECT_HEIGHT);
    }

    move(e: any) {
        if (this.rectData) {
            setImageToCanvas(this.canvas, this.defaultImage, WATERMARK);
            this.ctx.putImageData(this.rectData, this.leftPos - 2, this.topPos - 2);
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

        setImageToCanvas(this.canvas, this.defaultImage, WATERMARK);
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

    zoomer: Zoomer;

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

        this.zoomer = new Zoomer(this.canvas, <HTMLCanvasElement>document.getElementById("canvasZoomSlider"), this.selectedImage);
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

            this.descSelectedImage.innerText = this.images[this.indexSelectedImage].text;
            this.descSelectedImage.style.left = 'auto';
            this.descSelectedImage.style.right = 'auto';

            if (this.selectedImage.complete) {
                this.setImageToCanvas();
                this.zoomer.initParams();
            } else {
                this.selectedImage.onload = () => {
                    this.setImageToCanvas();
                    this.zoomer.initParams();
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
        setImageToCanvas(this.canvas, this.selectedImage, WATERMARK);
    }
}

let images: ImagesForSlider[] = [
    new ImagesForSlider('./images/products/1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/2.png', 'Some text 2'),
    new ImagesForSlider('./images/products/3.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, libero'),
    new ImagesForSlider('./images/products/4.png', 'Some text 4'),
];

let slider = new Slider(images);
