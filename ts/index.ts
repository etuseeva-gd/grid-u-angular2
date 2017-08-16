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

let sliderImage: HTMLImageElement = <HTMLImageElement>document.getElementById('sliderImage');
let sliderText = document.getElementById('sliderText');

let currentImageIndex = 0;

function sliderInit() {
    sliderImage.src = imagesForSlider[currentImageIndex].src;
    sliderText.innerText = imagesForSlider[currentImageIndex].text;
}

function setSliderImage() {
    sliderImage.className += "fadeOut";
    setTimeout(() => {
        sliderImage.src = imagesForSlider[currentImageIndex].src;

        sliderText.innerText = imagesForSlider[currentImageIndex].text;
        sliderText.style.left = 'auto';
        sliderText.style.right = 'auto';

        sliderImage.className = "";
    }, 500);
}

function previousImage() {
    currentImageIndex = --currentImageIndex < 0 ? imagesForSlider.length - 1 : currentImageIndex;

    let pos = 0;
    let animation = setInterval(() => {
        sliderText.style.left = ++pos + '%';
    }, 20);

    setTimeout(() => {
        clearInterval(animation);
    }, 500);

    setSliderImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesForSlider.length;

    let pos = 0;
    let animation = setInterval(() => {
        sliderText.style.right = ++pos + '%';
    }, 20);

    setTimeout(() => {
        clearInterval(animation);
    }, 500);

    setSliderImage();
}

sliderInit();

document.getElementById('previousImage').addEventListener(
    'click', previousImage);
document.getElementById('nextImage').addEventListener(
    'click', nextImage);