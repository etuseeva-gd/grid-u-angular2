var ImagesForSlider = (function () {
    function ImagesForSlider(src, text) {
        this.src = src;
        this.text = text;
    }
    return ImagesForSlider;
}());
var imagesForSlider = [
    new ImagesForSlider('./images/products/1.png', 'Some text 1'),
    new ImagesForSlider('./images/products/2.png', 'Some text 2'),
    new ImagesForSlider('./images/products/3.png', 'Some text 3'),
    new ImagesForSlider('./images/products/4.png', 'Some text 4'),
];
var sliderImage = document.getElementById('sliderImage');
var currentImageIndex = 0;
function sliderInit() {
    sliderImage.src = imagesForSlider[currentImageIndex].src;
}
function setSliderImage() {
    sliderImage.className += "fadeOut";
    setTimeout(function () {
        sliderImage.src = imagesForSlider[currentImageIndex].src;
        sliderImage.className = "";
    }, 500);
}
function previousImage() {
    currentImageIndex = currentImageIndex - 1 < 0 ? imagesForSlider.length - 1 : currentImageIndex - 1;
    setSliderImage();
}
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesForSlider.length;
    setSliderImage();
}
sliderInit();
document.getElementById('previousImage').addEventListener('click', previousImage);
document.getElementById('nextImage').addEventListener('click', nextImage);
