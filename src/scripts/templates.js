function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  const textElement = document.createTextNode(text);

  element.className = className;
  element.append(textElement);

  return element;
}

function createCard(task) {
  const card = createElement("div", "card");
  const cardHeader = createElement("div", "card__row");
  const cardTitle = createElement("h3", "card__row-title", task.title);
  const cardButtons = createElement("div", "card__row");
  const cardBtnEdit = createElement("button", "card__row-btn", "Edit");
  const cardBtnDelete = createElement("button", "card__row-btn", "Delete");
  cardButtons.append(cardBtnEdit, cardBtnDelete);
  cardBtnEdit.type = "button";
  cardBtnDelete.type = "button";
  cardHeader.append(cardTitle, cardButtons);
  const cardMain = createElement("div", "card__row");
  const cardDescription = createElement(
    "p",
    "card__row-description",
    task.description
  );
  const cardBtnArrow = createElement("button", "card__row-btn", ">");
  cardBtnArrow.type = "button";
  cardMain.append(cardDescription, cardBtnArrow);
  const cardFooter = createElement("div", "card__row");
  const cardUser = createElement("p", "card__row-user", task.user);
  const cardTime = createElement("p", "card__row-time", task.time);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);
  return card;
}

export { createCard };
