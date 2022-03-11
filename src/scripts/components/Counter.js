import { BASE_SERVISE } from "../services/localStorageAPI.js";

const columnTodo = new ColumnTodos();
const columnProgress = new ColumnTodos();
const columnDone = new ColumnTodos();

function ColumnTodos() {
  this.cardsInColumnTodo = function () {
    const tasks = BASE_SERVISE.getNewTodos();
    const counterItem = document.querySelector("#counter-todo");
    const amountOfCards = tasks.length;
    counterItem.textContent = amountOfCards;
    if (!amountOfCards) {
      counterItem.textContent = "";
    }
  };
  this.cardsInColumnProgress = function () {
    const tasks = BASE_SERVISE.getTodosInProgress();
    const counterItem = document.querySelector("#counter-progress");
    const amountOfCards = tasks.length;
    counterItem.textContent = amountOfCards;
    if (!amountOfCards) {
      counterItem.textContent = "";
    }
  };
  this.cardsInColumnDone = function () {
    const tasks = BASE_SERVISE.getTodosInColumnDone();
    const counterItem = document.querySelector("#counter-done");
    const amountOfCards = tasks.length;
    counterItem.textContent = amountOfCards;
    if (!amountOfCards) {
      counterItem.textContent = "";
    }
  };
}

export { columnTodo, columnProgress, columnDone };
