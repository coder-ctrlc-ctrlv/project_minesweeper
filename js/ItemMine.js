class ItemMine extends ItemGame {
    constructor(marked) {
        super(marked);
    }

    open(cellDOM) {
        cellDOM.classList.add("grid__cell_mine");
    }
}