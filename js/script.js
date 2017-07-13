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
var slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
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

//Form
