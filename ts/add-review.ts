let Review = (function () {
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

    function toggleReview() {
        let review = document.getElementById('reviewContainer'),
            inviteToReview = document.getElementById('inviteToReview'),
            reviewInfo = document.getElementById('reviewInfo');

        review.classList.toggle('no-display');
        inviteToReview.classList.toggle('no-display');
        reviewInfo.classList.toggle('no-display');
    }

    return {
        init() {
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

            let selectionStart = -1, selectionEnd = -1;

            function getPosSelectedText(elem) {
                if (elem.tagName === "TEXTAREA") {
                    selectionStart = elem.selectionStart;
                    selectionEnd = elem.selectionEnd;
                }
            }

            function addTags(tagType: string) {
                let tag = '';
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
                    let reviewValue = review.get();
                    reviewValue = reviewValue.slice(0, selectionStart) + `<${tag}>` + reviewValue.slice(selectionStart, selectionEnd) + `</${tag}>` + reviewValue.slice(selectionEnd);
                    review.set(reviewValue);
                    review.element.value = reviewValue;

                    selectionStart = -1;
                    selectionEnd = -1;
                }
            }

            setInterval(() => {
                getPosSelectedText(document.activeElement);
            }, 100);

            document.querySelector('#boldBtn').addEventListener('click', () => {
                addTags('bold');
            });
            document.querySelector('#emphasizeBtn').addEventListener('click', () => {
                addTags('emphasize');
            });
            document.querySelector('#quoteBtn').addEventListener('click', () => {
                addTags('quote');
            });

            document.querySelector('#cancelBtn').addEventListener('click', toggleReview);
            document.querySelector('#addBtn').addEventListener('click', () => {
                alert('Your review has been added!')
            });

            let reviewContainer = document.getElementById('reviewContainer'),
                reviewInfo = document.getElementById('reviewInfo');

            reviewContainer.classList.add('no-display');
            reviewInfo.classList.add('no-display');

            document.querySelector('.toggle-review-link').addEventListener('click', toggleReview);

        }
    }
}());