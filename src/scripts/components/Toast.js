const options = {
  root: document.querySelector("#toast"),
  message: 'Привет, это приложение Trello:)',
  OPEN_DELAY : 15000,
  CLOSE_DELAY: 20000,
};

class Toast {
  constructor({root, message, OPEN_DELAY, CLOSE_DELAY}) {
    this.root = root;
    this.message = message;
    this.OPEN_DELAY = OPEN_DELAY;
    this.CLOSE_DELAY = CLOSE_DELAY;
  };
  
  init() {
    this.root.addEventListener("click", this.handleToast);
    this.render();
    this.open();
    this.closeTimeout();
  };

  handleToast = (event) => {
    if (event.target.closest('#toast')) {
      this.close();
    };
  };
  
  open() {
    setTimeout(() => {
      this.root.classList.add("toast--visible");
    }, this.OPEN_DELAY);
  };
  
  close() {
    this.root.classList.remove("toast--visible");
  };

  closeTimeout() {
    setTimeout(() => {
      this.root.classList.remove("toast--visible");
    }, this.CLOSE_DELAY);
  };

  render() {
    this.root.querySelector(".toast__message").textContent = this.message;
  };
};

const toast = new Toast(options);

export { toast };
