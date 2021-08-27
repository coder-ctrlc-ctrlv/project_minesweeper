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