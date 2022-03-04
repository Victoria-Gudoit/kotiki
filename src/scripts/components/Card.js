import {
  TODO_TASK_KEY,
  getTodosData,
  setTodosData,
} from "../services/localStorageAPI.js";
import {
  IN_PROGRESS_TASK_KEY,
  getTodosInProgressData,
  setTodosInProgressData,
} from "../services/localStorageAPI.js";
import { clockInCard } from "./Clock.js";
import { getUUID, getValueOption } from "../utils/utils.js";
import {
  createCard,
  createInput,
  createCardInProgress,
} from "../templates/templates.js";
import { columnTodo } from "./counter.js";

initCard();

function initCard() {
  const tasks = getTodosData(TODO_TASK_KEY);
  tasks.forEach((task) => {
    const card = new Card(task);
    card.render();
  });
  const tasksInProgress = getTodosData(IN_PROGRESS_TASK_KEY);
  tasksInProgress.forEach((task) => {
    const cardInProgress = new Card(task);
    cardInProgress.renderCardInProgress();
  });
}

function Card(title, description) {
  this.id = getUUID();
  this.title = title;
  this.description = description;
  this.user = getValueOption();
  this.time = clockInCard();

  this.render = function () {
    const tasks = getTodosData(TODO_TASK_KEY);
    const todosWrapper = document.querySelector("#column-cards");
    todosWrapper.innerHTML = "";
    if (tasks.length) {
      tasks.forEach((task) => {
        const card = createCard(task);
        card.addEventListener("click", (event) => {
          if (
            event.target.dataset.edit &&
            event.target.textContent === "Edit"
          ) {
            this.edit();
          } else if (
            event.target.dataset.edit &&
            event.target.textContent === "Save"
          ) {
            this.save();
          }
          if (event.target.dataset.todo) {
            this.moveCardInProgres();
            this.renderCardInProgress();
          }
        });
        todosWrapper.appendChild(card);
      });
      columnTodo.showAmountOfCards();
    }
  };
  this.edit = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    this.headerCard = this.card.querySelector("#headercard");
    this.cardTitle = this.card.querySelector(".card__content-title");
    this.textTitle = this.card.querySelector(
      ".card__content-title"
    ).textContent;

    this.inputEditTitleCard = createInput();
    this.headerCard.prepend(this.inputEditTitleCard);

    this.inputEditTitleCard.value = this.textTitle;
    this.cardTitle.classList.add("card__content-hidden");

    this.mainCard = this.card.querySelector("#maincard");
    this.cardDescription = this.card.querySelector(
      ".card__content-description"
    );
    this.textDescription = this.card.querySelector(
      ".card__content-description"
    ).textContent;

    this.inputEditDescriptionCard = createInput();
    this.mainCard.prepend(this.inputEditDescriptionCard);

    this.inputEditDescriptionCard.value = this.textDescription;
    this.cardDescription.classList.add("card__content-hidden");

    this.cardBtnEdit = this.card.querySelector("#edit");
    this.cardBtnEdit.textContent = "Save";
  };
  this.save = function () {
    this.cardTitle.classList.remove("card__content-hidden");
    this.cardTitle.classList.add("card__content-visible");
    this.cardTitle.textContent = this.inputEditTitleCard.value;
    this.inputEditTitleCard.remove();

    this.cardDescription.classList.remove("card__content-hidden");
    this.cardDescription.classList.add("card__content-visible");
    this.cardDescription.textContent = this.inputEditDescriptionCard.value;
    this.inputEditDescriptionCard.remove();

    this.cardBtnEdit.textContent = "Edit";

    const tasks = getTodosData(TODO_TASK_KEY);
    tasks.forEach((element) => {
      if (element.id === this.id) {
        element.title = this.cardTitle.textContent;
        element.description = this.cardDescription.textContent;
      }
    });
    setTodosData(TODO_TASK_KEY, tasks);
  };

  this.moveCardInProgres = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasks = getTodosData(TODO_TASK_KEY);
    const taskInProgress = getTodosInProgressData(IN_PROGRESS_TASK_KEY);

    tasks.map((task, index) => {
      if (task.id === this.id) {
        taskInProgress.push(task);
        tasks.splice(index, 1);
      }
    });
    setTodosData(TODO_TASK_KEY, tasks);
    this.render();

    setTodosInProgressData(IN_PROGRESS_TASK_KEY, taskInProgress);
  };

  this.renderCardInProgress = function () {
    const taskInProgress = getTodosInProgressData(IN_PROGRESS_TASK_KEY);
    const columnInProgress = document.querySelector("#column-cards-progress");
    columnInProgress.innerHTML = "";
    taskInProgress.forEach((task) => {
      const cardImProgress = createCardInProgress(task);

      columnInProgress.appendChild(cardImProgress);
    });
  };
}
export { Card };
