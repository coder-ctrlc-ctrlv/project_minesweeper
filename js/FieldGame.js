class FieldGame {
    #field;
    #level;

    constructor(lvl) {
        this.reset(lvl);
    }

    reset(lvl) {
        this.#level = lvl;
        this.#field = [];
        this.#fillFieldWithItemNull();
    }

    //left button click
    openItemGame(row, col, cellDOM) {
        if (game.isBeginGame()) {
            game.changeValueBeginGame();
            this.reset(this.#level);
            this.#createItemsMine(row, col);
            this.#createItemsNumber();
        }
        if (!this.#field[row][col].isOpened() && !this.#field[row][col].isMarked()) {
            this.#field[row][col].changeValueOpened();
            this.#field[row][col].open(cellDOM);
        }
    }

    //right button click
    changeStateFlag(row, col, cellDOM) {
        if (!this.#field[row][col].isOpened()) {
            this.#field[row][col].changeValueMarked();
            cellDOM.classList.toggle("grid__cell_flag");
        }
    }

    #fillFieldWithItemNull() {
        for (let i = 0; i < this.#level.height; i++) {
            this.#field.push([]);
            for (let j = 0; j < this.#level.width; j++) {
                this.#field[i].push(new ItemNull(i, j));
            }
        }
    }

    #createItemsMine(row_clicked, col_clicked) {
        let row, col;
        for (let i = 0; i < this.#level.mines; i++) {
            do {
                row = this.#getRandomInt(0, this.#level.height);
                col = this.#getRandomInt(0, this.#level.width);
            } while (this.#field[row][col].constructor.name === "ItemMine" || (row === row_clicked && col === col_clicked));
            this.#field[row][col] = new ItemMine(row, col);
        }
    }

    #createItemsNumber() {
        let count;
        for (let i = 0; i < this.#level.height; i++) {
            for (let j = 0; j < this.#level.width; j++) {
                if (this.#field[i][j].constructor.name !== "ItemMine") {
                    count = this.#getCountMines(i, j);
                    if (count !== 0)
                        this.#field[i][j] = new ItemNumber(i, j, count);
                }
            }
        }
    }

    #getCountMines(row, col) {
        let countMines = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i < 0 || j < 0 || i === this.#level.height || j === this.#level.width ||
                    (i === row && j === col))
                    continue;
                if (this.#field[i][j].constructor.name === "ItemMine")
                    ++countMines;
            }
        }
        return countMines;
    }

    #getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}