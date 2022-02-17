const btnDeleteAll = document.querySelector(".btn-delete-all");
const btnCancelModal = document.querySelector("#cancel-modal");
const modalDeleteAll = new Modal(document.querySelector("#modal-delete-all"));
btnDeleteAll.addEventListener("click", (event) => {
  modalDeleteAll.open(event.clientY);
});

btnCancelModal.addEventListener("click", () => {
  modalDeleteAll.close();
});

function Modal(root) {
  this.root = root;

  this.open = function (y) {
    this.root.style.display = "block";
    this.root.style.top = `${y + 20}px`;
  };
  this.close = function () {
    this.root.style.display = "none";
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

export { btnDeleteAll, btnCancelModal, modalDeleteAll, btnAdd };
