class CounterMines {
    #counterDOM;

    constructor(numb) {
        this.#counterDOM = document.querySelector(".header__field");
        this.reset(numb)
    }

    subtract() {
        this.#counterDOM.innerHTML = --this.#counterDOM.innerHTML;
    }

    add() {
        this.#counterDOM.innerHTML = ++this.#counterDOM.innerHTML;
    }

    reset(numb) {
        this.#counterDOM.innerHTML = numb;
    }
}