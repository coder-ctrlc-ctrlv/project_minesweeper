class TableDOM {
    constructor(lvl) {
        this.#drawTable(lvl);
    }

    update(lvl) {
        this.#removeTable();
        this.#drawTable(lvl);
    }

    #createCellDiv(lvl) {
        let div;
        div = document.createElement('div');
        div.classList.add('grid__cell');
        if (lvl.name === "easy") {
            div.classList.add('grid__cell_size_big');
        }
        else if (lvl.name === "hard") {
            div.classList.add('grid__cell_size_small');
        }
        return div;
    }

    #removeTable() {
        for (let row of document.querySelectorAll('.grid__row'))
            row.remove();
    }

    #drawTable(lvl) {
        let table, row, cell, div;
        table = document.querySelector('.grid');
        for (let i = 0; i < lvl.height; i++) {
            row = table.insertRow();
            row.classList.add('grid__row');
            for (let j = 0; j < lvl.width; j++) {
                cell = row.insertCell();
                div = this.#createCellDiv(lvl);
                div.addEventListener("click", function (event) {
                    game.getFieldGame().openItemGame(i, j, event.target);
                })
                div.addEventListener("contextmenu", function (event) {
                    game.getFieldGame().changeStateFlag(i, j, event.target);
                    event.preventDefault();
                })
                cell.append(div);
            }
            table.append(row);
        }
    }
}