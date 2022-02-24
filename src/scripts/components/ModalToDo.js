import {
  getValueOption,
  Task,
  createTask,
  render,
} from "../components/Cards.js";
import {
  TODO_TASK_KEY,
  setTodosData,
  getTodosData,
} from "../localStorageAPI.js";

render();
let tasks = [];
const btnAdd = new ModalToDo(document.querySelector(".modal-window"));

function ModalToDo(root) {
  this.root = root;
  this.btnCancel = this.root.querySelector(".modal-window__button-cancel");
  this.btnAdd = document.querySelector(".column__btn-add");
  this.btnConfirm = this.root.querySelector(".modal-window__button-confirm");
  this.document = document;
  this.init = function () {
    this.btnCancel.addEventListener("click", () => {
      this.close();
    });
    this.btnAdd.addEventListener("click", () => {
      this.open();
    });
    this.btnConfirm.addEventListener("click", () => {
      this.addTask();
    });
    this.document.addEventListener("click", (event) => {
      if (event.target === this.root) {
        this.root.classList.remove("modal__active");
      }
    });
  };
  this.open = function () {
    this.root.classList.add("modal__active");
    document.querySelector("body").classList.add("modal__hidden");
  };
  this.close = function () {
    this.root.classList.remove("modal__active");
  };
  this.addTask = function () {
    tasks = getTodosData(TODO_TASK_KEY);
    const titleTask = document.querySelector("#modal-title");
    const descriptionTask = document.querySelector("#modal-text");
    tasks.push(new Task(titleTask.value, descriptionTask.value));
    if (titleTask.value && descriptionTask.value !== "") {
      setTodosData(TODO_TASK_KEY, tasks);
      render();
      titleTask.value = "";
      descriptionTask.value = "";
      btnAdd.close();
    } else {
      alert("Вы ничего не ввели! :( ");
    }
  };
}

btnAdd.init();

export { btnAdd };
