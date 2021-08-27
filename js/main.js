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
