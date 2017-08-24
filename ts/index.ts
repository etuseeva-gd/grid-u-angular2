// Slider

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

// Review
class Variable {
    name: string;

    element: any;
    defaultValue: any;
    value: any;
    event: any;

    constructor(name: string, defaultValue: string = null) {
        this.name = name;
        this.element = document.querySelector(`#${this.name}`);

        this.defaultValue = defaultValue;
        this.value = null;

        this.event = new Event(`${this.name} change`);
    }

    set(value: any) {
        this.value = value;
        this.element.dispatchEvent(this.event);
    }

    get() {
        return this.value && this.value.length > 0 ? this.value : this.defaultValue;
    }
}

function bindVariableWithElement(v: Variable, elementSelector: string) {
    let bindElem = document.querySelector(elementSelector);
    bindElem.innerHTML = v.defaultValue;

    v.element.addEventListener('input', function () {
        v.set(this.value);
    });

    v.element.addEventListener(`${v.name} change`, () => {
        // this.value = v.get();
        bindElem.innerHTML = v.get();
    });
}

function formatDate(date: Date): string {
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
}

let author = new Variable('author', 'Your name');
bindVariableWithElement(author, '#authorName');

let date = document.querySelector('#currentDate');
date.innerHTML = formatDate(new Date());

let review = new Variable('review', 'Start typing and your review text will appear here...');
bindVariableWithElement(review, '#textReview');

let stars: any = Array.prototype.slice.call(document.querySelectorAll('#rating .stars .star'));
stars.forEach(star => {
    star.addEventListener('click', (e: any) => {
        let selectedIndex = stars.findIndex((s) => s === e.target);
        selectedIndex++;

        for (let i = 0; i < 5; i++) {
            if (i < selectedIndex) {
                stars[i].classList.add('active-star');
            } else {
                stars[i].classList.remove('active-star');
            }
        }

        let starsInReview = document.querySelector('#ratingReview .stars');
        while (starsInReview.firstChild) {
            starsInReview.removeChild(starsInReview.firstChild);
        }

        for (let i = 0; i < 5; i++) {
            let s: any = document.createElement('div');
            if (i < selectedIndex) {
                s.className = 'star active-star';
            } else {
                s.className = 'star';
            }
            starsInReview.appendChild(s);
        }
    });
});

let avatar: any = document.querySelector('#avatar');
avatar.addEventListener('change', function (e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e: any) {
        let avatarInReview: any = document.querySelector('#avatarImg');
        avatarInReview.src = e.target.result;

        let avatarContainer: any = document.querySelector('.input-container-image');
        avatarContainer.style.backgroundImage = `url(${ e.target.result})`;
        avatarContainer.children[0].innerHTML = 'Image selected';
    };
    reader.readAsDataURL(file);
});

//Buttons with style
let selectionStart = -1, selectionEnd = -1;

function getPosSelectedText(elem) {
    if (elem.tagName === "TEXTAREA") {
        selectionStart = elem.selectionStart;
        selectionEnd = elem.selectionEnd;
    }
}

setInterval(() => {
    getPosSelectedText(document.activeElement);
}, 100);

function addTags(tagType: string) {
    let tag = '';
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
        let reviewValue = review.get();
        reviewValue = reviewValue.slice(0, selectionStart) + `<${tag}>` + reviewValue.slice(selectionStart, selectionEnd) + `</${tag}>` + reviewValue.slice(selectionEnd);
        review.set(reviewValue);
        review.element.value = reviewValue;

        selectionStart = -1;
        selectionEnd = -1;
    }
}

document.querySelector('#boldBtn').addEventListener('click', () => {
    addTags('bold');
});
document.querySelector('#emphasizeBtn').addEventListener('click', () => {
    addTags('emphasize');
});
document.querySelector('#quoteBtn').addEventListener('click', () => {
    addTags('quote');
});


//------------------------
// let isReviewShow = true;
let isReviewShow = false;
function toggleReview() {
    let review = document.getElementById('reviewContainer'),
        inviteToReview = document.getElementById('inviteToReview'),
        reviewInfo = document.getElementById('reviewInfo');

    if (isReviewShow) {
        review.style.display = 'none';
        inviteToReview.style.display = 'block';
        reviewInfo.style.display = 'none';
    } else {
        review.style.display = 'block';
        inviteToReview.style.display = 'none';
        reviewInfo.style.display = 'block';
    }

    isReviewShow = !isReviewShow;
}