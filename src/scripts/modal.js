const modalWarning = new Modal(document.querySelector(".modal-warning"));

function Modal(root) {
  this.root = root;

  document.querySelector(".column__btn-delete-all").addEventListener("click", (event) => {
    modalWarning.open(event.clientY);
  });

  document.querySelector("#cancel-modal").addEventListener("click", () => {
    modalWarning.close();
  });

  this.open = function (y) {
    this.root.classList.add("modal__active");
    this.root.style.top = `${y + 20}px`;
  };

  this.close = function () {
    this.root.classList.remove("modal__active");
  };
}

const btnAdd = new ModaltoDo(document.querySelector(".modal-window"));

function ModaltoDo(root) {
  this.root = root;
  const tagBody = document.querySelector("body");

  document.querySelector(".btn-add").addEventListener("click", () => {
    this.open();
  });

  document
    .querySelector(".modal-window__button-cancel")
    .addEventListener("click", () => {
      this.close();
    });

  this.open = function () {
    this.root.classList.add("modal__active");
    tagBody.classList.add("modal__hidden");
  };
  this.close = function () {
    this.root.classList.remove("modal__active");
  };
  document.addEventListener("click", (event) => {
    if (event.target === this.root) {
      this.root.classList.remove("modal__active");
    }
  });
}

export { modalWarning, btnAdd };
