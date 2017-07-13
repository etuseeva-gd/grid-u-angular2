//Modals
var modal;

openModal = function (modalId) {
    modal = document.getElementById(modalId);
    modal.style.display = "block";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

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
openFilter = function () {
    f.style.display = "block";
};