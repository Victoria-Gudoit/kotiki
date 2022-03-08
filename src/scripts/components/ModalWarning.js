const options = {
  message: "Are you sure that you want to delete every completed task?",
  root: document.querySelector("#modal-warning"),
};

function ModalWarning({ root, message }) {
  this.root = root;
  this.message = message;
  this.btnCancelModal = this.root.querySelector("#cancel-modal");
  this.btnConfirmModal = this.root.querySelector("#confirm-delete-all");
  this.btnDeleteAll = document.querySelector(".column__btn-delete-all");

  this.init = function () {
    this.btnDeleteAll.addEventListener("click", this.handleBtnDelete);

    this.btnCancelModal.addEventListener("click", this.handleBtnCancel);
  };

  this.handleBtnDelete = (event) => {
    if (event.target.id === "delete-all") {
      this.open();
      this.render();
    }
  };

  this.handleBtnCancel = (event) => {
    if (event.target.id === "cancel-modal") {
      this.close();
    }
  };

  this.open = function () {
    this.root.classList.add("modal-warning__open");
  };

  this.close = function () {
    this.root.classList.remove("modal-warning__open");
  };

  this.render = function () {
    root.querySelector(".card__content-description").textContent = this.message;
  };
}

const modalWarning = new ModalWarning(options);
modalWarning.init();

export { modalWarning };
