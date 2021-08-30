class ItemNumber extends ItemGame {
    #numb;

    constructor(marked, num) {
        super(marked);
        this.#numb = num;
    }

    open(cellDOM) {
        cellDOM.classList.add("grid__cell_number_" + this.#numb);
    }
}