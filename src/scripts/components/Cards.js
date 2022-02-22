import {
  TODO_TASK_KEY,
  setTodosData,
  getTodosData,
} from "../localStorageAPI.js";
import { clockInCard } from "./Clock.js";

let tasks = [];

const createTask = (title, description, user, time) => {
  return `<div class="card">
                    <div class="card__row">
                        <h3 class="card__row-title">${title}</h3>
                        <div class="card__row">
                            <button class="card__row-btn" type="button">Edit</button>
                            <button class="card__row-btn" type="button">Delete</button>
                        </div>
                    </div>
                    <div class="card__row">
                        <p class="card__row-description">${description}</p>
                        <button class="card__row-btn" type="button">></button>
                    </div>
                    <div class="card__row">    
                        <p class="card__row-user">${user}</p>
                        <p class="card__row-time">${time}</p>
                    </div>
                </div>`;
};

function Task(title, description) {
  this.title = title;
  this.description = description;
  this.user = getValueOption();
  this.time = clockInCard();
}

const render = () => {
  const todosWrapper = document.querySelector("#column-cards");
  todosWrapper.innerHTML = "";
  tasks = getTodosData(TODO_TASK_KEY);
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      todosWrapper.innerHTML += createTask(
        task.title,
        task.description,
        task.user,
        task.time
      );
    });
  }
};
function getValueOption() {
  const select = document.querySelector("#user");
  const value = select.options[select.selectedIndex].text;
  return value;
}
export { tasks, getValueOption, Task, createTask, render };
