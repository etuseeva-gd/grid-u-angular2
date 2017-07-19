//Modals
var modal;
var wrapper = document.getElementsByClassName('wrapper')[0];

openModal = function (modalId) {
    modal = document.getElementById(modalId);
    wrapper.style.filter = 'blur(1px)';
    modal.style.display = "block";
};

closeModal = function () {
    modal.style.display = "none";
    wrapper.style.filter = '';
};

// window.onclick = function (event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// };

//Sliders
var sliderOne = document.getElementById('sliderOne');
if (sliderOne) {
    noUiSlider.create(sliderOne, {
        start: [1, 4],
        connect: true,
        range: {
            'min': 0,
            'max': 10
        },
        tooltips: true,
        format: {
            to: function ( value ) {
                return Math.floor(value)
            },
            from: function ( value ) {
                return Math.floor(value)
            }
        }
    });
}

var sliderTwo = document.getElementById('sliderTwo');
if (sliderTwo) {
    noUiSlider.create(sliderTwo, {
        start: [275, 822],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        tooltips: true,
        format: {
            to: function ( value ) {
                return Math.floor(value)
            },
            from: function ( value ) {
                return Math.floor(value)
            }
        }
    });
}

//Filter
var f = document.getElementById('filter');
var count = 0;

window.onclick = function (event) {
    count++;
    if (count > 2 && f && event.target !== f) {
        f.style.display = "none";
        count = 0;
    }
};

openFilter = function () {
    f.style.display = "block";
    count++;
};