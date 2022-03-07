import { BASE_SERVISE } from "../services/localStorageAPI.js";

const counter = new ColumnTodos();

function ColumnTodos() {
  this.cardsInColumnTodo = function () {
    const tasks = BASE_SERVISE.getTodosData(BASE_SERVISE.keys.TODO_TASK_KEY);
    const counterItem = document.querySelector("#counter-todo");
    const amountOfCards = tasks.length;
    counterItem.textContent = amountOfCards;
  };
}

export { counter };
