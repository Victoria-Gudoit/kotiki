import { BASE_SERVISE } from "../services/localStorageAPI.js";
import { clockInCard } from "./Clock.js";
import { getUUID, getValueOption } from "../utils/utils.js";
import {
  createCard,
  createInput,
  createCardInProgress,
  createCardInColumnDone,
} from "../templates/templates.js";
import {
  columnTodo,
  columnProgress,
  columnDone,
} from "../components/Counter.js";
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
  this.time = clockInCard();

  this.render = function () {
    const tasks = BASE_SERVISE.getNewTodos();
    const todosWrapper = document.querySelector("#column-cards");
    todosWrapper.innerHTML = "";
    if (tasks.length) {
      tasks.forEach((task) => {
        const card = createCard(task);
        card.addEventListener("click", this.handleCardTodo);
        todosWrapper.appendChild(card);
        columnTodo.cardsInColumnTodo();
      });
    }
  };

  this.handleCardTodo = (event) => {
    switch (event.target.dataset && event.target.textContent.toLowerCase()) {
      case "edit":
        this.edit();
        break;
      case "save":
        this.save();
        break;
    }
    if (event.target.dataset.arrow) {
      this.moveCardInProgress();
      columnTodo.cardsInColumnTodo();
      this.renderCardInProgress();
      this.stopMovingCards();
      this.showModalWarning();
    }
    if (event.target.dataset.delete) {
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
    columnTodo.cardsInColumnTodo();
  };

  this.renderCardInProgress = function () {
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();
    const columnInProgress = document.querySelector("#column-cards-progress");
    columnInProgress.innerHTML = "";
    tasksInProgress.forEach((task) => {
      const cardInProgress = createCardInProgress(task);
      cardInProgress.addEventListener("click", this.handleCardInProgress);
      columnInProgress.appendChild(cardInProgress);
      columnProgress.cardsInColumnProgress();
    });
  };

  this.handleCardInProgress = (event) => {
    if (event.target.dataset.action) {
      this.moveCardBack();
      columnProgress.cardsInColumnProgress();
      this.renderCardInProgress();
      this.render();
    } else if (event.target.dataset.complete) {
      this.moveCardInColumnDone();
      this.renderCardInColumnDone();
      columnProgress.cardsInColumnProgress();
    }
  };

  this.moveCardInProgress = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const newTasks = BASE_SERVISE.getNewTodos();
    const tasksInProgress = BASE_SERVISE.getTodosInProgress();

    newTasks.map((task, index) => {
      if (task.id === this.id) {
        tasksInProgress.push(task);
        newTasks.splice(index, 1);
      }
    });
    BASE_SERVISE.setNewTodos(newTasks);
    this.render();

    BASE_SERVISE.setTodosInProgress(tasksInProgress);
  };

  this.moveCardBack = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    const tasks = BASE_SERVISE.getNewTodos();
    const taskInProgress = BASE_SERVISE.getTodosInProgress();

    taskInProgress.map((task, index) => {
      if (task.id === this.id) {
        tasks.push(task);
        taskInProgress.splice(index, 1);
      }
    });
    this.renderCardInProgress;

    BASE_SERVISE.setTodosInProgress(taskInProgress);
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

    BASE_SERVISE.setTodosInColumnDone(tasksInColumnDone);
  };

  this.renderCardInColumnDone = function () {
    const tasksInColumnDone = BASE_SERVISE.getTodosInColumnDone();
    const columnTodoDone = document.querySelector("#column-cards-done");
    columnTodoDone.innerHTML = "";
    tasksInColumnDone.forEach((task) => {
      const cardInColumnDone = createCardInColumnDone(task);
      cardInColumnDone.addEventListener("click", this.handleCardInColumnDone);
      columnTodoDone.appendChild(cardInColumnDone);
      columnDone.cardsInColumnDone();
    });
  };

  this.handleCardInColumnDone = (event) => {
    if (event.target.dataset.remove) {
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
    columnDone.cardsInColumnDone();
  };
}
export { Card, initCard };
