import { BASE_SERVISE } from "../services/localStorageAPI.js";
import { Card } from "./Card.js";

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
    this.btnConfirmModal.addEventListener("click", this.handleBtnConfirm);
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

  this.handleBtnConfirm = (event) => {
    if (event.target.id === "confirm-delete-all") {
      this.deleteAll();
      this.close();
    }
  };

  this.open = function () {
    this.root.classList.add("modal-warning__open");
    this.btnConfirmModal.classList.remove("card__content-btn__hidden");
  };

  this.close = function () {
    this.root.classList.remove("modal-warning__open");
  };

  this.render = function () {
    root.querySelector(".card__content-description").textContent = this.message;
  };

  this.deleteAll = function () {
    const tasksDone = BASE_SERVISE.getTodosInColumnDone();
    tasksDone.length = 0;
    BASE_SERVISE.setTodosInColumnDone(tasksDone);
    const cardInColumnDone = new Card(tasksDone);
    cardInColumnDone.renderCardInColumnDone();
  };
}

const modalWarning = new ModalWarning(options);
modalWarning.init();

export { modalWarning };
