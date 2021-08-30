class Game {
    #tableDOM;
    #fieldGame;
    #beginGame;
    #endGame;
    #controller;

    constructor() {
        this.#beginGame = true;
        this.#endGame = false;
        this.#tableDOM = new TableDOM(MEDIUM_LVL);
        this.#fieldGame = new FieldGame(MEDIUM_LVL);
        this.#controller = new Controller(MEDIUM_LVL);
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

    isEndGame() {
        return this.#endGame;
    }

    changeValueEndGame() {
        this.#endGame = !this.#endGame;
    }

    createNewGame(lvl) {
        this.#beginGame = true;
        this.#endGame = false;
        switch (lvl) {
            case "easy":
                this.#updateGame(EASY_LVL);
                break;
            case "medium":
                this.#updateGame(MEDIUM_LVL);
                break;
            case "hard":
                this.#updateGame(HARD_LVL);
                break;
            default:
                this.#updateGame(lvl);
                break;
        }
    }

    #updateGame(lvl) {
        this.#tableDOM.update(lvl);
        this.#fieldGame.reset(lvl);
        this.#controller.initItemsGameEvents(lvl);
    }
}