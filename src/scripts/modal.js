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

export { modalWarning };
