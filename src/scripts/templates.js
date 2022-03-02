function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  const textElement = document.createTextNode(text);

  element.className = className;
  element.append(textElement);

  return element;
}

function createCard(task) {
  const card = createElement("div", "card card--blue");
  card.id = task.id;
  const cardHeader = createElement("div", "card__content");
  cardHeader.id = "headercard";
  const cardTitle = createElement("h3", "card__content-title", task.title);
  const cardButtons = createElement("div", "card__content");
  const cardBtnEdit = createElement("button", "card__content-btn", "Edit");
  const cardBtnDelete = createElement("button", "card__content-btn", "Delete");
  cardButtons.append(cardBtnEdit, cardBtnDelete);
  cardBtnEdit.setAttribute("data-edit", "edit");
  cardBtnEdit.id = "edit";
  cardBtnEdit.type = "button";
  cardBtnDelete.type = "button";
  cardHeader.append(cardTitle, cardButtons);
  const cardMain = createElement("div", "card__content");
  cardMain.id = "maincard";
  const cardDescription = createElement(
    "p",
    "card__content-description",
    task.description
  );
  const cardBtnArrow = createElement(
    "button",
    "card__content-btn card__content-btn--arrow"
  );
  cardBtnArrow.type = "button";
  cardMain.append(cardDescription, cardBtnArrow);
  const cardFooter = createElement("div", "card__content");
  const cardUser = createElement("p", "card__content-user", task.user);
  const cardTime = createElement("p", "card__content-time", task.time);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);
  return card;
}

function createInput() {
  const inputEdit = createElement("input", "card__input-visible");
  inputEdit.type = "text";
  return inputEdit;
}

export { createCard, createElement, createInput };
