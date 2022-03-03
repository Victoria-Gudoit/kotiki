const modalWarning = new ModalWarning(
  document.querySelector("#modal-delete-all")
);

function ModalWarning(root) {
  this.root = root;
  this.btnCancelModal = this.root.querySelector("#cancel-modal");
  this.btnConfirmModal = this.root.querySelector("#confirm-delete-all");
  this.btnDeleteAll = document.querySelector(".column__btn-delete-all");

  this.btnDeleteAll.addEventListener("click", (event) => {
    this.open(event.clientY);
  });

  this.btnCancelModal.addEventListener("click", () => {
    this.close();
  });

  this.open = function (y) {
    this.root.classList.add("modal-warning__open");
    this.root.style.top = `${y + 20}px`;
  };

  this.close = function () {
    this.root.classList.remove("modal-warning__open");
  };
}

export { modalWarning };
