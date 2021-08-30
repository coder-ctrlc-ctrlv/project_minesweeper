class Timer {
    #timerDOM;
    #timerId;

    constructor() {
        this.#timerDOM = document.querySelectorAll(".header__field")[1];
        this.reset();
    }

    reset() {
        this.#timerDOM.innerHTML = "0";
    }

    start() {
        this.#timerId = setInterval(this.#addSecond, 1000, this.#timerDOM);
    }

    stop() {
        clearInterval(this.#timerId);
    }

    #addSecond(timer) {
        timer.innerHTML = ++timer.innerHTML;
    }
}