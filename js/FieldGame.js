class FieldGame {
    #field;
    #level;
    #counterMines;
    #timer;
    #modalWindow;
    #counterOpenedItemsGame;

    constructor(lvl) {
        this.#counterMines = new CounterMines(lvl.mines);
        this.#timer = new Timer();
        this.#modalWindow = new ModalWindow();
        this.reset(lvl);
    }

    reset(lvl) {
        this.#timer.stop();
        this.#level = lvl;
        this.#field = [];
        this.#fillFieldWithItemNull();
        this.#counterMines.reset(this.#level.mines);
        this.#timer.reset();
        this.#counterOpenedItemsGame = 0;
    }

    //left button click
    onClickItemGame(row, col, cellDOM, isPrevItemNull) {
        if (game.isBeginGame()) {
            game.changeValueBeginGame();
            this.#createItemsMine(row, col);
            this.#createItemsNumber();
            this.#timer.start();
        }
        if (!game.isEndGame() && !this.#field[row][col].isOpened()) {
            if (!this.#field[row][col].isMarked())
                this.#openItemGame(row, col, cellDOM);
            else if (isPrevItemNull) {
                this.changeStateFlag(row, col, cellDOM);
                this.#openItemGame(row, col, cellDOM);
            }
        }
    }

    //right button click
    changeStateFlag(row, col, cellDOM) {
        if (!game.isEndGame() &&!this.#field[row][col].isOpened()) {
            this.#field[row][col].changeValueMarked();
            cellDOM.classList.toggle("grid__cell_flag");
            if (this.#field[row][col].isMarked())
                this.#counterMines.subtract();
            else
                this.#counterMines.add();
        }
    }

    #openItemGame(row, col, cellDOM) {
        if (this.#field[row][col].constructor.name === "ItemMine") {
            this.#openAllMines(cellDOM);
            this.#timer.stop();
            game.changeValueEndGame();
            this.#modalWindow.show("Вы проиграли!", "img/game_over.jpg");
            return;
        }
        this.#field[row][col].changeValueOpened();
        this.#field[row][col].open(cellDOM);
        ++this.#counterOpenedItemsGame;
        if (this.#counterOpenedItemsGame === (this.#level.width * this.#level.height - this.#level.mines)) {
            this.#timer.stop();
            game.changeValueEndGame();
            this.#modalWindow.show("Вы выиграли!", "img/win.jpeg");
            return;
        }
        if (this.#field[row][col].constructor.name === "ItemNull") {
            let table = cellDOM.parentElement.parentElement.parentElement;
            for (let i = row - 1; i <= row + 1; i++)
                for (let j = col - 1; j <= col + 1; j++) {
                    if (i < 0 || j < 0 || i === this.#level.height || j === this.#level.width ||
                        (i === row && j === col))
                        continue;
                    this.onClickItemGame(i, j, table.rows[i].cells[j].firstElementChild, true);
                }
        }
    }

    #openAllMines(cellDOM) {
        let table = cellDOM.parentElement.parentElement.parentElement;
        for (let i = 0; i < this.#level.height; i++)
            for (let j = 0; j < this.#level.width; j++)
                if (this.#field[i][j].constructor.name === "ItemMine") {
                    if (this.#field[i][j].isMarked()) {
                        this.#field[i][j].changeValueMarked();
                        table.rows[i].cells[j].firstChild.classList.remove("grid__cell_flag");
                    }
                    this.#field[i][j].open(table.rows[i].cells[j].firstChild);
                }
    }

    #fillFieldWithItemNull() {
        for (let i = 0; i < this.#level.height; i++) {
            this.#field.push([]);
            for (let j = 0; j < this.#level.width; j++)
                this.#field[i].push(new ItemNull(false));
        }
    }

    #createItemsMine(row_clicked, col_clicked) {
        let cell, rand_index;
        let freeCells = [];
        for (let i = 0; i < this.#level.height; i++)
            for (let j = 0; j < this.#level.width; j++) {
                if (i === row_clicked && j === col_clicked)
                    continue;
                cell = {};
                cell.row = i;
                cell.col = j;
                freeCells.push(cell);
            }
        for (let i = 0; i < this.#level.mines; i++) {
            rand_index = this.#getRandomInt(0, freeCells.length);
            cell = freeCells[rand_index];
            freeCells.splice(rand_index,1);
            this.#field[cell.row][cell.col] = new ItemMine(this.#field[cell.row][cell.col].isMarked());
        }
        //let row, col;
        // for (let i = 0; i < this.#level.mines; i++) {
        //     do {
        //         row = this.#getRandomInt(0, this.#level.height);
        //         col = this.#getRandomInt(0, this.#level.width);
        //     } while (this.#field[row][col].constructor.name === "ItemMine" || (row === row_clicked && col === col_clicked));
        //     this.#field[row][col] = new ItemMine(row, col);
        // }
    }

    #createItemsNumber() {
        let count;
        for (let i = 0; i < this.#level.height; i++)
            for (let j = 0; j < this.#level.width; j++)
                if (this.#field[i][j].constructor.name !== "ItemMine") {
                    count = this.#getCountMines(i, j);
                    if (count !== 0)
                        this.#field[i][j] = new ItemNumber(this.#field[i][j].isMarked(), count);
                }
    }

    #getCountMines(row, col) {
        let countMines = 0;
        for (let i = row - 1; i <= row + 1; i++)
            for (let j = col - 1; j <= col + 1; j++) {
                if (i < 0 || j < 0 || i === this.#level.height || j === this.#level.width ||
                    (i === row && j === col))
                    continue;
                if (this.#field[i][j].constructor.name === "ItemMine")
                    ++countMines;
            }
        return countMines;
    }

    #getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}