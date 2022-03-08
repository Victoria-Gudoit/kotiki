function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  const textElement = document.createTextNode(text);

  element.className = className;
  element.append(textElement);

  return element;
}

function createCard(task) {
  const card = createElement("div", "card card--blue");
  const cardHeader = createElement("div", "card__content");
  const cardTitle = createElement("h3", "card__content-title", task.title);
  const cardButtons = createElement("div", "card__content");
  const cardBtnEdit = createElement("button", "card__content-btn", "Edit");
  const cardBtnDelete = createElement("button", "card__content-btn", "Delete");
  const cardMain = createElement("div", "card__content");
  const cardDescription = createElement(
    "p",
    "card__content-description",
    task.description
  );
  const cardBtnArrow = createElement(
    "button",
    "card__content-btn card__content-btn--arrow"
  );
  const cardFooter = createElement("div", "card__content");
  const cardUser = createElement("p", "card__content-user", task.user);
  const cardTime = createElement("p", "card__content-time", task.time);

  card.id = task.id;
  cardHeader.id = "headercard";
  cardBtnEdit.id = "edit";
  cardMain.id = "maincard";
  cardBtnEdit.type = "button";
  cardBtnDelete.type = "button";
  cardBtnArrow.type = "button";
  cardBtnEdit.setAttribute("data-edit", "edit");
  cardBtnArrow.setAttribute("data-arrow", "moving");

  cardMain.append(cardDescription, cardBtnArrow);
  cardButtons.append(cardBtnEdit, cardBtnDelete);
  cardHeader.append(cardTitle, cardButtons);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);

  return card;
}

function createCardInProgress(task) {
  const card = createElement("div", "card card--pink");
  const cardHeader = createElement("div", "card__content");
  const cardTitle = createElement("h3", "card__content-title", task.title);
  const cardButtons = createElement("div", "card__content");
  const cardBtnBack = createElement("button", "card__content-btn", "Back");
  const cardBtnComplete = createElement(
    "button",
    "card__content-btn",
    "Complete"
  );
  const cardMain = createElement("div", "card__content");
  const cardDescription = createElement(
    "p",
    "card__content-description",
    task.description
  );
  const cardFooter = createElement("div", "card__content");
  const cardUser = createElement("p", "card__content-user", task.user);
  const cardTime = createElement("p", "card__content-time", task.time);

  cardBtnBack.type = "button";
  cardBtnComplete.type = "button";
  card.id = task.id;
  cardHeader.id = "headercard";
  cardMain.id = "maincard";
  cardBtnBack.setAttribute("data-action", "back");

  cardHeader.append(cardTitle, cardButtons);
  cardButtons.append(cardBtnBack, cardBtnComplete);
  cardMain.append(cardDescription);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);

  return card;
}

function createInput() {
  const inputEdit = createElement("input", "card__input-visible");
  inputEdit.type = "text";
  return inputEdit;
}

export { createCard, createElement, createInput, createCardInProgress };
