class ItemNull extends ItemGame {
    constructor(row, col) {
        super(row, col);
    }

    open(cellDOM) {
        let table = cellDOM.parentElement.parentElement.parentElement;
        cellDOM.classList.add("grid__cell_null");
        for (let i = this.row - 1; i <= this.row + 1; i++) {
            for (let j = this.column - 1; j <= this.column + 1; j++) {
                if (i < 0 || j < 0 || i === table.rows.length || j === table.rows[0].cells.length ||
                    (i === this.row && j === this.column))
                    continue;
                table.rows[i].cells[j].firstElementChild.click();
            }
        }
    }
}