import {
  getValueOption,
  Task,
  createTask,
  render,
} from "./components/Cards.js";
import {
  TODO_TASK_KEY,
  setTodosData,
  getTodosData,
} from "./localStorageAPI.js";

render();
let tasks = [];
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

  document.querySelector(".column__btn-add").addEventListener("click", () => {
    this.open();
  });

  document
    .querySelector(".modal-window__button-cancel")
    .addEventListener("click", () => {
      this.close();
    });
  document
    .querySelector(".modal-window__button-confirm")
    .addEventListener("click", () => {
      this.addTask();
    });

  this.open = function () {
    this.root.classList.add("modal__active");
    tagBody.classList.add("modal__hidden");
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

  document.addEventListener("click", (event) => {
    if (event.target === this.root) {
      this.root.classList.remove("modal__active");
    }
  });
}

/*export { btnDeleteAll, btnCancelModal, modalDeleteAll, btnAdd };*/
export { btnAdd };
