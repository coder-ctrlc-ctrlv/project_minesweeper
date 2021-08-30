class Controller {
    #select;
    #modalWindow;

    constructor(lvl) {
        this.#select = document.querySelector('.header__select');
        this.#modalWindow = new ModalWindow();
        this.#initSelectEvent();
        this.#initResetBtnEvent();
        this.#initCloseModalBtnEvent();
        this.#initRetryModalBtnEvent();
        this.#initCustomFieldBtnEvent();
        this.initItemsGameEvents(lvl);
    }

    initItemsGameEvents(lvl) {
        let table = document.querySelector('.grid');
        for (let i = 0; i < lvl.height; i++)
            for (let j = 0; j < lvl.width; j++) {
                table.rows[i].cells[j].firstElementChild.addEventListener("click", function (event) {
                    game.getFieldGame().onClickItemGame(i, j, event.target, false);
                })
                table.rows[i].cells[j].firstElementChild.addEventListener("contextmenu", function (event) {
                    game.getFieldGame().changeStateFlag(i, j, event.target);
                    event.preventDefault();
                })
            }
    }

    #initCustomFieldBtnEvent() {
        let input_fields = document.querySelectorAll(".header__input-field");
        let customLevel;
        document.querySelectorAll(".header__btn")[1].addEventListener("click", function () {
            customLevel = {};
            customLevel.width = parseInt(input_fields[0].value);
            customLevel.height = parseInt(input_fields[1].value);
            customLevel.mines = parseInt(input_fields[2].value);
            if (!Number.isInteger(customLevel.width) || !Number.isInteger(customLevel.height) || !Number.isInteger(customLevel.mines) ||
                customLevel.width > 50 || customLevel.height > 50 || (customLevel.mines >= customLevel.width * customLevel.height))
                alert("Создать поле не удалось.\n" +
                    "Ограничения на вводимые данные:\n" +
                    "1. Ширина <= 50\n" +
                    "2. Высота <= 50\n" +
                    "3. Мины < (Ширина * Высота)");
            else
                game.createNewGame(customLevel);
        });
    }

    #initRetryModalBtnEvent() {
        let modalWindowCopy = this.#modalWindow;
        let selectCopy = this.#select;
        document.querySelector(".modal-window__new-game-btn").addEventListener("click", function () {
            modalWindowCopy.hide();
            game.createNewGame(selectCopy.value);
        });
    }

    #initCloseModalBtnEvent() {
        let modalWindowCopy = this.#modalWindow;
        document.querySelector(".modal-window__close").addEventListener("click", function () {
            modalWindowCopy.hide();
        });
    }

    #initSelectEvent() {
        this.#select.addEventListener("change", function () {
            game.createNewGame(this.value);
        });
    }

    #initResetBtnEvent() {
        let selectCopy = this.#select;
        document.querySelector(".header__btn").addEventListener("click", function() {
            game.createNewGame(selectCopy.value);
        });
    }
}