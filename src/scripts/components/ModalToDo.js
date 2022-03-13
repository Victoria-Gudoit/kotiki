import { Card } from "./Card.js";
import { BASE_SERVISE } from "../services/localStorageAPI.js";
import { modalAddingUser } from "./ModalAddingUser.js";

const modalToDo = new ModalToDo(document.querySelector(".modal-window"));

function ModalToDo(root) {
  this.root = root;
  this.btnCancel = this.root.querySelector(".modal-window__button-cancel");
  this.btnAdd = document.querySelector("#btn-add");
  this.btnConfirm = this.root.querySelector(".modal-window__button-confirm");
  this.overlayModal = document.querySelector(".modal-window");
  this.init = function () {
    this.btnCancel.addEventListener("click", this.handleModalClose);
    this.btnAdd.addEventListener("click", this.handleModalOpen);
    this.btnConfirm.addEventListener("click", this.handleAddTask);
    this.overlayModal.addEventListener("click", this.handleModalCloseOverlay);
  };

  this.handleModalOpen = function () {
    modalAddingUser.deleteOptions();
    modalAddingUser.printUsersInModal();
    modalToDo.open();
  };
  this.handleModalClose = function () {
    modalToDo.close();
  };
  this.handleAddTask = function () {
    modalToDo.addTask();
  };
  this.handleModalCloseOverlay = function ({ target }) {
    if (target.id === "modal-window") {
      modalToDo.close();
    }
  };

  this.open = function () {
    this.root.classList.add("modal-window--active");
    document.querySelector("body").classList.add("modal-window--hidden");
  };
  this.close = function () {
    this.root.classList.remove("modal-window--active");
    document.querySelector("body").classList.remove("modal-window--hidden");
  };
  this.clearInputs = function (titleInput, descriptionInput) {
    titleInput.value = "";
    descriptionInput.value = "";
  };
  this.addTask = function () {
    const tasks = BASE_SERVISE.getNewTodos();
    const titleTask = document.querySelector("#modal-title");
    const descriptionTask = document.querySelector("#modal-text");
    const card = new Card(titleTask.value, descriptionTask.value);

    tasks.push(card);
    if (titleTask.value && descriptionTask.value) {
      BASE_SERVISE.setNewTodos(tasks);
      card.render();
      this.clearInputs(titleTask, descriptionTask);
      modalToDo.close();
    } else {
      alert("Вы ничего не ввели! :( ");
    }
  };
}

export { modalToDo };
