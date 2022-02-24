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

export { btnDeleteAll, btnCancelModal, modalDeleteAll };
