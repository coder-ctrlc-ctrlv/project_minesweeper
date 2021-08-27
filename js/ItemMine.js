class ItemMine extends ItemGame {
    constructor(row, col) {
        super(row, col);
    }

    open(cellDOM) {
        cellDOM.classList.add("grid__cell_mine");
    }
}