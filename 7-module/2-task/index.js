import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.isOpen = false; // состояние модального окна
    this.render();
  }

  open() {
    document.body.append(this.elem);
    this.isOpen = true;
    document.body.classList.add("is-modal-open");
    document.addEventListener("keydown", this.onKeydown);
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "modal";
    let overlay = document.createElement("div");
    overlay.className = "modal__overlay";
    this.elem.appendChild(overlay);
    let inner = createElement(`<div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>`);
    this.elem.appendChild(inner);
    var modalBodyContainer = this.elem.querySelector(".modal__body");
    modalBodyContainer.replaceChildren(this.modalBody);

    this.bindEvents();
    return this.elem;
  }

  setTitle(title) {
    this.title = title;
    if (this.elem) {
      let titleElem = this.elem.querySelector(".modal__title");
      if (titleElem) {
        titleElem.textContent = title;
      }
    }
  }

  setBody(modalBody) {
    this.modalBody = modalBody;
    if (this.elem) {
      var modalBodyContainer = this.elem.querySelector(".modal__body");
      modalBodyContainer.replaceChildren(this.modalBody);
    }
  }

  close() {
    this.isOpen = false;
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.removeEventListener("keydown", this.onKeydown);
  }

  bindEvents() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        this.close();
      }
    });
    this.onKeydown = (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    };
  }
}
