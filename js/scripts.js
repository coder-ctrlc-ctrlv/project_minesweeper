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
	mines: 40,
};
const HARD_LVL = {
	name: "hard",
	width: 30,
	height: 16,
	mines: 90
};

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
				cell.append(div);
			}
			table.append(row);
		}
	}
}

class FieldGame {
	#field;

	constructor(lvl) {
		this.reset();
		this.#create(lvl);
	}

	reset() {
		this.#field = [];
	}

	getItemGame(row, col) {
		return this.#field[row][col];
	}

	#create(lvl) {
		//fill array with objects ItemNull
		for (let i = 0; i < lvl.height; i++) {
			this.#field.push([]);
			for (let j = 0; j < lvl.width; j++) {
				this.#field[i].push(new ItemNull(i, j));
			}
		}

		//generate ItemMines
		let row, col;
		for (let i = 0; i < lvl.mines; i++) {
			do {
				row = this.#getRandomInt(0, lvl.height);
				col = this.#getRandomInt(0, lvl.width)
			} while (this.#field[row][col].constructor.name === "ItemMine");
			this.#field[row][col] = new ItemMine(i, j);
		}

		//count ItemMines and create ItemNumber
		let count;
		for (let i = 0; i < lvl.height; i++) {
			for (let j = 0; j < lvl.width; j++) {
				if (this.#field[i][j].constructor.name !== "ItemMine") {
					count = this.#getCountMines(i, j, lvl);
					if (count !== 0)
						this.#field[i][j] = new ItemNumber(i, j, count);
				}
			}
		}
	}

	#getCountMines(row, col, lvl) {
		let countMines = 0;
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {
				if (i < 0 || j < 0 || i === lvl.height || j === lvl.width ||
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
	row;
	column;

	constructor(row, col) {
		this.#opened = false;
		this.row = row;
		this.column = col;
		this.#addEvents();
	}

	#addEvents() {
		let table = document.querySelector('.grid');
		let divItemGame = table.rows[this.row].cells[this.column];
		divItemGame.addEventListener("click", function () {
			if (!itemGrid.isOpened()) {
				itemGrid.changeOpened();
				itemGrid.open(this);
			}
		})
		divItemGame.oncontextmenu = function() {
			if (!itemGrid.isOpened())
				this.classList.toggle("grid__cell_flag");
			return false;
		}
	}

	isOpened() {
		return this.#opened;
	}

	changeOpened() {
		this.#opened = !this.#opened;
	}
}

class ItemMine extends ItemGame{
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


let tableDOM = new TableDOM(MEDIUM_LVL);
let fieldGame;

let select = document.querySelector('.header__select');
select.addEventListener("change", function () {
	switch (this.value) {
	   case "easy":
		   table.update(EASY_LVL);
		   break;
	   case "medium":
		   table.update(MEDIUM_LVL)
		   break;
	   case "hard":
		   table.update(HARD_LVL)
		   break;
   }
});

document.querySelector(".header__reset-btn").addEventListener("click", function() {
	switch (select.value) {
	   case "easy":
		   table.update(EASY_LVL);
		   break;
	   case "medium":
		   table.update(MEDIUM_LVL)
		   break;
	   case "hard":
		   table.update(HARD_LVL)
		   break;
   }
});
