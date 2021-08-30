class ItemGame {
    #opened;
    #marked;

    constructor(marked) {
        this.#opened = false;
        this.#marked = marked;
    }

    isOpened() {
        return this.#opened;
    }

    changeValueOpened() {
        this.#opened = !this.#opened;
    }

    isMarked() {
        return this.#marked;
    }

    changeValueMarked() {
        this.#marked = !this.#marked;
    }
}