import { Card } from "./Card.js";
import { BASE_SERVISE } from "../services/localStorageAPI.js";

const modalToDo = new ModalToDo(document.querySelector(".modal-window"));

function ModalToDo(root) {
  this.root = root;
  this.btnCancel = this.root.querySelector(".modal-window__button-cancel");
  this.btnAdd = document.querySelector(".column__btn-add");
  this.btnConfirm = this.root.querySelector(".modal-window__button-confirm");
  this.overlayModal = document.querySelector(".modal-window");
  this.init = function () {
    this.btnCancel.addEventListener("click", this.handleModalClose);
    this.btnAdd.addEventListener("click", this.handleModalOpen);
    this.btnConfirm.addEventListener("click", this.handleAddTask);
    this.overlayModal.addEventListener("click", this.handleModalCloseOverlay);
  };

  this.handleModalOpen = function () {
    modalToDo.open();
  };
  this.handleModalClose = function () {
    modalToDo.close();
  };
  this.handleAddTask = function () {
    modalToDo.addTask();
  };
  this.handleModalCloseOverlay = function (event) {
    if (event.target.id === "modal-window") {
      modalToDo.close();
    }
  };

  this.open = function () {
    this.root.classList.add("modal__active");
    document.querySelector("body").classList.add("modal__hidden");
  };
  this.close = function () {
    this.root.classList.remove("modal__active");
  };
  this.addTask = function () {
    const tasks = BASE_SERVISE.getTodosData();
    const titleTask = document.querySelector("#modal-title");
    const descriptionTask = document.querySelector("#modal-text");
    const card = new Card(titleTask.value, descriptionTask.value);

    tasks.push(card);
    if (titleTask.value && descriptionTask.value) {
      BASE_SERVISE.setTodosData(tasks);
      card.render();
      titleTask.value = "";
      descriptionTask.value = "";
      modalToDo.close();
    } else {
      alert("Вы ничего не ввели! :( ");
    }
  };
}

modalToDo.init();

export { modalToDo };
