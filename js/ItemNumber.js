class ItemNumber extends ItemGame {
    #numb;
    constructor(row, col, num) {
        super(row, col);
        this.#numb = num;
    }

    open(cellDOM) {
        cellDOM.classList.add("grid__cell_number_" + this.#numb);
    }
}