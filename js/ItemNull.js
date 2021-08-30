class ItemNull extends ItemGame {
    constructor(marked) {
        super(marked);
    }

    open(cellDOM) {
        cellDOM.classList.add("grid__cell_null");
    }
}