import { BASE_SERVISE } from "../services/localStorageAPI.js";
import { renderTime } from "./Clock.js";
import { getUUID, getValueOption } from "../utils/utils.js";
import {
  createCard,
  createInput,
  createCardInProgress,
  createCardInColumnDone,
} from "../templates/templates.js";
import { column, keys } from "../components/Counter.js";
import { modalWarning } from "../components/ModalWarning.js";

function initCard() {
  const tasks = BASE_SERVISE.getNewTodos();
  tasks.forEach((task) => {
    const card = new Card(task);
    card.render();
    card.stopMovingCards();
  });
  const tasksInProgress = BASE_SERVISE.getTodosInProgress();
  tasksInProgress.forEach((task) => {
    const cardInProgress = new Card(task);
    cardInProgress.renderCardInProgress();
  });
  const tasksInColumnDone = BASE_SERVISE.getTodosInColumnDone();
  tasksInColumnDone.forEach((task) => {
    const cardInColumnDone = new Card(task);
    cardInColumnDone.renderCardInColumnDone();
  });
}

function Card(title, description) {
  this.id = getUUID();
  this.title = title;
  this.description = description;
  this.user = getValueOption();
  this.time = renderTime();

  this.render = function () {
    const tasks = BASE_SERVISE.getNewTodos();
    const todosWrapper = document.querySelector("#column-cards");
    todosWrapper.innerHTML = "";
    if (tasks.length) {
      tasks.forEach((task) => {
        const card = createCard(task);
        card.addEventListener("click", this.handleCardTodo);
        todosWrapper.appendChild(card);
        column.cardsInColumn(tasks, keys.counterTodo);
      });
    }
  };

  this.handleCardTodo = ({ target }) => {
    switch (target.dataset && target.textContent.toLowerCase()) {
      case "edit":
        this.edit();
        break;
      case "save":
        this.save();
        break;
    }
    if (target.dataset.arrow) {
      this.moveCardInProgress();
      this.renderCardInProgress();
      this.stopMovingCards();
      this.showModalWarning();
    }
    if (target.dataset.delete) {
      this.delete();
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
    this.cardTitle.classList.add("card__content-title--hidden");

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
    this.cardDescription.classList.toggle("card__content-description--hidden");

    this.cardBtnEdit = this.card.querySelector("#edit");

    this.cardBtnEdit.textContent = "Save";
  };
  this.save = function () {
    this.cardTitle.classList.toggle("card__content-title--hidden");
    this.cardTitle.textContent = this.inputEditTitleCard.value;
    this.inputEditTitleCard.remove();
    this.cardDescription.classList.toggle("card__content-description--hidden");
    this.cardDescription.textContent = this.inputEditDescriptionCard.value;
    this.inputEditDescriptionCard.remove();
    this.cardBtnEdit.textContent = "Edit";

    const tasks = BASE_SERVISE.getNewTodos();
    tasks.forEach((element) => {
      if (element.id === this.id) {
        element.title = this.cardTitle.textContent;
        element.description = this.cardDescription.textContent;
      }
    });
    BASE_SERVISE.setNewTodos(tasks);
  };

  this.delete = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasks = BASE_SERVISE.getNewTodos();

    tasks.map((task, index) => {
      if (task.id === this.id) {
        tasks.splice(index, 1);
      }
    });
    BASE_SERVISE.setNewTodos(tasks);
    this.render();
    column.cardsInColumn(tasks, keys.counterTodo);
  };

  this.renderCardInProgress = function () {
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();
    const columnInProgress = document.querySelector("#column-cards-progress");
    columnInProgress.innerHTML = "";
    tasksInProgress.forEach((task) => {
      const cardInProgress = createCardInProgress(task);
      cardInProgress.addEventListener("click", this.handleCardInProgress);
      columnInProgress.appendChild(cardInProgress);
      column.cardsInColumn(tasksInProgress, keys.counterProgress);
    });
  };

  this.handleCardInProgress = ({ target }) => {
    if (target.dataset.action) {
      this.moveCardBack();
      this.renderCardInProgress();
      this.render();
    } else if (target.dataset.complete) {
      this.moveCardInColumnDone();
      this.renderCardInColumnDone();
    }
  };

  this.moveCardInProgress = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasks = BASE_SERVISE.getNewTodos();
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();

    tasks.map((task, index) => {
      if (task.id === this.id) {
        tasksInProgress.push(task);
        tasks.splice(index, 1);
      }
    });
    BASE_SERVISE.setNewTodos(tasks);
    this.render();
    column.cardsInColumn(tasks, keys.counterTodo);
    BASE_SERVISE.setTodosInProgress(tasksInProgress);
  };

  this.moveCardBack = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasks = BASE_SERVISE.getNewTodos();
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();

    tasksInProgress.map((task, index) => {
      if (task.id === this.id) {
        tasks.push(task);
        tasksInProgress.splice(index, 1);
      }
    });
    this.renderCardInProgress;
    column.cardsInColumn(tasksInProgress, keys.counterProgress);
    BASE_SERVISE.setTodosInProgress(tasksInProgress);
    BASE_SERVISE.setNewTodos(tasks);
  };

  this.stopMovingCards = function () {
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();
    if (tasksInProgress.length >= 6) {
      const arrowBtns = document.querySelectorAll("[data-arrow=moving]");
      arrowBtns.forEach((btn) => {
        btn.disabled = true;
      });
    }
  };

  this.showModalWarning = function () {
    const modalWindow = document.querySelector("#modal-warning");
    const modalWarningText = modalWindow.querySelector(
      ".card__content-description"
    );
    const btnConfirm = document.querySelector("#confirm-delete-all");
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();
    if (tasksInProgress.length >= 6) {
      modalWarning.open();
      modalWarningText.textContent = "Sorry! You can't add more than 6 cards!";
      btnConfirm.classList.add("card__content-btn--hidden");
    }
  };

  this.moveCardInColumnDone = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();
    const tasksInColumnDone = BASE_SERVISE.getTodosInColumnDone();

    tasksInProgress.map((task, index) => {
      if (task.id === this.id) {
        tasksInColumnDone.push(task);
        tasksInProgress.splice(index, 1);
      }
    });
    BASE_SERVISE.setTodosInProgress(tasksInProgress);
    this.renderCardInProgress();
    column.cardsInColumn(tasksInProgress, keys.counterProgress);
    BASE_SERVISE.setTodosInColumnDone(tasksInColumnDone);
  };

  this.renderCardInColumnDone = function () {
    const tasksDone = BASE_SERVISE.getTodosInColumnDone();
    const columnTodoDone = document.querySelector("#column-cards-done");
    columnTodoDone.innerHTML = "";
    tasksDone.forEach((task) => {
      const cardInColumnDone = createCardInColumnDone(task);
      cardInColumnDone.addEventListener("click", this.handleCardInColumnDone);
      columnTodoDone.appendChild(cardInColumnDone);
      column.cardsInColumn(tasksDone, keys.counterDone);
    });
  };

  this.handleCardInColumnDone = ({ target }) => {
    if (target.dataset.remove) {
      this.removeCardDone();
    }
  };

  this.removeCardDone = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasksDone = BASE_SERVISE.getTodosInColumnDone();

    tasksDone.map((task, index) => {
      if (task.id === this.id) {
        tasksDone.splice(index, 1);
      }
    });
    BASE_SERVISE.setTodosInColumnDone(tasksDone);
    this.renderCardInColumnDone();
    column.cardsInColumn(tasksDone, keys.counterDone);
  };
}
export { Card, initCard };
