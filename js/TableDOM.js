class TableDOM {
    constructor(lvl) {
        this.#drawTable(lvl);
    }

    update(lvl) {
        this.#removeTable();
        this.#drawTable(lvl);
    }

    #createCellDiv(lvl, headerWidth) {
        let div;
        div = document.createElement('div');
        div.style.width = div.style.height = Math.floor(headerWidth / lvl.width) + "px";
        div.classList.add('grid__cell');
        return div;
    }

    #removeTable() {
        for (let row of document.querySelectorAll('.grid__row'))
            row.remove();
    }

    #drawTable(lvl) {
        let table, row, cell, div, header;
        table = document.querySelector('.grid');
        header = document.querySelector(".header");
        for (let i = 0; i < lvl.height; i++) {
            row = table.insertRow();
            row.classList.add('grid__row');
            for (let j = 0; j < lvl.width; j++) {
                cell = row.insertCell();
                div = this.#createCellDiv(lvl, header.offsetWidth);
                cell.append(div);
            }
            table.append(row);
        }
    }
}