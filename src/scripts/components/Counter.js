const column = new ColumnTodos();

const keys = {
  counterTodo: document.querySelector("#counter-todo"),
  counterProgress: document.querySelector("#counter-progress"),
  counterDone: document.querySelector("#counter-done"),
};

function ColumnTodos() {
  this.cardsInColumn = function (tasks, counterId) {
    const amountOfCards = tasks.length;
    counterId.textContent = amountOfCards;
    if (!amountOfCards) {
      counterId.textContent = "";
    }
  };
}

export { column, keys };
