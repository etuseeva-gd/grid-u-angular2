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