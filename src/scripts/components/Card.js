import { TODO_TASK_KEY, getTodosData } from "../localStorageAPI.js";
import { clockInCard } from "./Clock.js";
import { getUUID, getValueOption } from "../utils.js";
import { createCard } from "../templates.js";

initCard();

function initCard() {
  const tasks = getTodosData(TODO_TASK_KEY);
  tasks.forEach((task) => {
    const card = new Card(task);
    card.render();
  });
}

function Card(title, description) {
  this.root = null;
  this.id = getUUID();
  this.title = title;
  this.description = description;
  this.user = getValueOption();
  this.time = clockInCard();

  this.render = function () {
    const tasks = getTodosData(TODO_TASK_KEY);
    const todosWrapper = document.querySelector("#column-cards");
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        todosWrapper.appendChild(createCard(task));
      });
    }
  };
}

export { Card };
