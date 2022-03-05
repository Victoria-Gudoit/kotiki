import { TODO_TASK_KEY, getTodosData } from "../services/localStorageAPI.js";

const counter = new ColumnTodos();

function ColumnTodos() {
  this.cardsInColumnTodo = function () {
    const tasks = getTodosData(TODO_TASK_KEY);
    const counterItem = document.querySelector("#counter-todo");
    const amountOfCards = tasks.length;
    counterItem.textContent = amountOfCards;
  };
}

export { counter };
