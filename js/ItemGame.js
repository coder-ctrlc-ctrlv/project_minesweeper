class ItemGame {
    #opened;
    #marked;
    row;
    column;

    constructor(row, col) {
        this.#opened = false;
        this.#marked = false;
        this.row = row;
        this.column = col;
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