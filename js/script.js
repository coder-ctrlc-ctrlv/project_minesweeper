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
				div.addEventListener("click", function (event) { game.getFieldGame().openItemGame(i, j, event) })
				div.addEventListener("contextmenu", function (event) { game.getFieldGame().changeStateFlag(i, j, event) })
				cell.append(div);
			}
			table.append(row);
		}
	}
}


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
	openItemGame(row, col, event) {
		if (game.isBeginGame()) {
			game.changeValueBeginGame();
			this.reset(this.#level);
			this.createMinesAndNumbers(row, col);
		}
		if (!this.#field[row][col].isOpened() && !this.#field[row][col].isMarked()) {
			this.#field[row][col].changeValueOpened();
			this.#field[row][col].open(event.target);
		}
	}

	//right button click
	changeStateFlag(row, col, event) {
		if (!this.#field[row][col].isOpened()) {
			this.#field[row][col].changeValueMarked();
			event.target.classList.toggle("grid__cell_flag");
		}
		event.preventDefault();
	}

	createMinesAndNumbers(row_clicked, col_clicked) {
		this.#createItemsMine(row_clicked, col_clicked);
		this.#createItemsNumber();
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


class ItemGame {
	#opened;
	#marked;
	row;
	column;

	constructor(row, col) {
		this.#opened = false;
		this.#marked = false;
		this.row = row;
		this.column = col;
	}

	isOpened() {
		return this.#opened;
	}

	changeValueOpened() {
		this.#opened = !this.#opened;
	}

	isMarked() {
		return this.#marked;
	}

	changeValueMarked() {
		this.#marked = !this.#marked;
	}
}


class ItemMine extends ItemGame {
	constructor(row, col) {
		super(row, col);
	}

	open(cellDOM) {
		cellDOM.classList.add("grid__cell_mine");
	}
}


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


class ItemNull extends ItemGame {
	constructor(row, col) {
		super(row, col);
	}

	open(cellDOM) {
		cellDOM.classList.add("grid__cell_null");
	}
}


class Game {
	#tableDOM;
	#fieldGame;
	#beginGame;

	constructor() {
		this.#beginGame = true;
		this.#tableDOM = new TableDOM(MEDIUM_LVL);
		this.#fieldGame = new FieldGame(MEDIUM_LVL);
	}

	getFieldGame() {
		return this.#fieldGame;
	}

	isBeginGame() {
		return this.#beginGame;
	}

	changeValueBeginGame() {
		this.#beginGame = !this.#beginGame;
	}

	createNewGame(lvlName) {
		this.#beginGame = true;
		switch (lvlName) {
			case "easy":
				this.#tableDOM.update(EASY_LVL);
				this.#fieldGame.reset(EASY_LVL);
				break;
			case "medium":
				this.#tableDOM.update(MEDIUM_LVL);
				this.#fieldGame.reset(MEDIUM_LVL);
				break;
			case "hard":
				this.#tableDOM.update(HARD_LVL);
				this.#fieldGame.reset(HARD_LVL);
				break;
		}
	}
}


const EASY_LVL = {
	name: "easy",
	width: 9,
	height: 9,
	mines: 10
};
const MEDIUM_LVL = {
	name: "medium",
	width: 16,
	height: 16,
	mines: 40
};
const HARD_LVL = {
	name: "hard",
	width: 30,
	height: 16,
	mines: 99
};

game = new Game();

let select = document.querySelector('.header__select');

select.addEventListener("change", function () {
	game.createNewGame(this.value);
});

document.querySelector(".header__reset-btn").addEventListener("click", function() {
	game.createNewGame(select.value)
});
