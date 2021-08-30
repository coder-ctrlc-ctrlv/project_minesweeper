class ModalWindow {
    #modalWindow;
    #title;
    #image;

    constructor() {
        this.#modalWindow = document.querySelector(".modal-window");
        this.#title = document.querySelector(".modal-window__title");
        this.#image = document.querySelector(".modal-window__img-main");
    }

    show(title, srcImage) {
        this.#title.innerHTML = title;
        this.#image.src = srcImage;
        this.#modalWindow.style.display = "block";
    }

    hide() {
        this.#modalWindow.style.display = "none";
    }
}