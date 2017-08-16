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
var sliderImage = document.getElementById('sliderImage');
var sliderText = document.getElementById('sliderText');
var currentImageIndex = 0;
function sliderInit() {
    sliderImage.src = imagesForSlider[currentImageIndex].src;
    sliderText.innerText = imagesForSlider[currentImageIndex].text;
}
function setSliderImage() {
    sliderImage.className += "fadeOut";
    setTimeout(function () {
        sliderImage.src = imagesForSlider[currentImageIndex].src;
        sliderText.innerText = imagesForSlider[currentImageIndex].text;
        sliderText.style.left = 'auto';
        sliderText.style.right = 'auto';
        sliderImage.className = "";
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
