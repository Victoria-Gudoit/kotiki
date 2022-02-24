import { TODO_TASK_KEY, getTodosData } from "../localStorageAPI.js";
import { clockInCard } from "./Clock.js";
import { getUUID } from "../utils.js";
import { createCard } from "../templates.js";

function Card(title, description) {
  this.root = null;
  this.id = getUUID();
  this.title = title;
  this.description = description;
  this.user = getValueOption();
  this.time = clockInCard();

  
}

const render = () => {
  const tasks = getTodosData(TODO_TASK_KEY);
  const todosWrapper = document.querySelector("#column-cards");
  todosWrapper.innerHTML = "";
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      todosWrapper.appendChild(createCard(task));
    });
  }
};
function getValueOption() {
  const select = document.querySelector("#user");
  const value = select.options[select.selectedIndex].text;
  return value;
}

export { getValueOption, Card, createCard, render };
