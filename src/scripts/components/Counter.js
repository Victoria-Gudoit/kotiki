const columnTodo = new CounterCards(document.querySelector("#column-cards"));
const columnInProgress = new CounterCards(
  document.querySelector("#column-progress")
);
const columnDone = new CounterCards(document.querySelector("#column-done"));

function CounterCards(root) {
  this.root = root;
  this.counter = document.querySelector(".column__counter");
  this.showAmountOfCards = () => {
    this.amountOfCards = this.root.children.length;
    this.counter.textContent = this.amountOfCards;
  };
}

export { columnTodo, columnInProgress, columnDone };
