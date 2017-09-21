var Review = (function () {
    var Variable = /** @class */ (function () {
        function Variable(name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            this.name = name;
            this.element = document.querySelector("#" + this.name);
            this.defaultValue = defaultValue;
            this.value = null;
            this.event = new Event(this.name + " change");
        }
        Variable.prototype.set = function (value) {
            this.value = value;
            this.element.dispatchEvent(this.event);
        };
        Variable.prototype.get = function () {
            return this.value && this.value.length > 0 ? this.value : this.defaultValue;
        };
        return Variable;
    }());
    function bindVariableWithElement(v, elementSelector) {
        var bindElem = document.querySelector(elementSelector);
        bindElem.innerHTML = v.defaultValue;
        v.element.addEventListener('input', function () {
            v.set(this.value);
        });
        v.element.addEventListener(v.name + " change", function () {
            // this.value = v.get();
            bindElem.innerHTML = v.get();
        });
    }
    function formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return monthNames[monthIndex] + " " + day + ", " + year;
    }
    function toggleReview() {
        var review = document.getElementById('reviewContainer'), inviteToReview = document.getElementById('inviteToReview'), reviewInfo = document.getElementById('reviewInfo');
        review.classList.toggle('no-display');
        inviteToReview.classList.toggle('no-display');
        reviewInfo.classList.toggle('no-display');
    }
    return {
        init: function () {
            var author = new Variable('author', 'Your name');
            bindVariableWithElement(author, '#authorName');
            var date = document.querySelector('#currentDate');
            date.innerHTML = formatDate(new Date());
            var review = new Variable('review', 'Start typing and your review text will appear here...');
            bindVariableWithElement(review, '#textReview');
            var stars = Array.prototype.slice.call(document.querySelectorAll('#rating .stars .star'));
            stars.forEach(function (star) {
                star.addEventListener('click', function (e) {
                    var selectedIndex = stars.findIndex(function (s) { return s === e.target; });
                    selectedIndex++;
                    for (var i = 0; i < 5; i++) {
                        if (i < selectedIndex) {
                            stars[i].classList.add('active-star');
                        }
                        else {
                            stars[i].classList.remove('active-star');
                        }
                    }
                    var starsInReview = document.querySelector('#ratingReview .stars');
                    while (starsInReview.firstChild) {
                        starsInReview.removeChild(starsInReview.firstChild);
                    }
                    for (var i = 0; i < 5; i++) {
                        var s = document.createElement('div');
                        if (i < selectedIndex) {
                            s.className = 'star active-star';
                        }
                        else {
                            s.className = 'star';
                        }
                        starsInReview.appendChild(s);
                    }
                });
            });
            var avatar = document.querySelector('#avatar');
            avatar.addEventListener('change', function (e) {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var avatarInReview = document.querySelector('#avatarImg');
                    avatarInReview.src = e.target.result;
                    var avatarContainer = document.querySelector('.input-container-image');
                    avatarContainer.style.backgroundImage = "url(" + e.target.result + ")";
                    avatarContainer.children[0].innerHTML = 'Image selected';
                };
                reader.readAsDataURL(file);
            });
            var selectionStart = -1, selectionEnd = -1;
            function getPosSelectedText(elem) {
                if (elem.tagName === "TEXTAREA") {
                    selectionStart = elem.selectionStart;
                    selectionEnd = elem.selectionEnd;
                }
            }
            function addTags(tagType) {
                var tag = '';
                switch (tagType) {
                    case 'bold':
                        {
                            tag = 'b';
                            break;
                        }
                    case 'emphasize':
                        {
                            tag = 'i';
                            break;
                        }
                    case 'quote':
                        {
                            tag = 'q';
                            break;
                        }
                }
                if (selectionEnd > -1 && selectionStart > -1) {
                    var reviewValue = review.get();
                    reviewValue = reviewValue.slice(0, selectionStart) + ("<" + tag + ">") + reviewValue.slice(selectionStart, selectionEnd) + ("</" + tag + ">") + reviewValue.slice(selectionEnd);
                    review.set(reviewValue);
                    review.element.value = reviewValue;
                    selectionStart = -1;
                    selectionEnd = -1;
                }
            }
            setInterval(function () {
                getPosSelectedText(document.activeElement);
            }, 100);
            document.querySelector('#boldBtn').addEventListener('click', function () {
                addTags('bold');
            });
            document.querySelector('#emphasizeBtn').addEventListener('click', function () {
                addTags('emphasize');
            });
            document.querySelector('#quoteBtn').addEventListener('click', function () {
                addTags('quote');
            });
            document.querySelector('#cancelBtn').addEventListener('click', toggleReview);
            document.querySelector('#addBtn').addEventListener('click', function () {
                alert('Your review has been added!');
            });
            var reviewContainer = document.getElementById('reviewContainer'), reviewInfo = document.getElementById('reviewInfo');
            reviewContainer.classList.add('no-display');
            reviewInfo.classList.add('no-display');
            document.querySelector('.toggle-review-link').addEventListener('click', toggleReview);
        }
    };
}());
