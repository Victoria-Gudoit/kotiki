const options = {
  root: document.querySelector("#toast"),
  message: 'Привет, это приложение Trello:)',
};

function Toast({root, message}){
  this.root = root;
  this.message = message;
  this.OPEN_DELAY = 15000;
  this.CLOSE_DELAY = 20000;
  
  this.init = function(){
    this.root.addEventListener("click", this.handleToast);
    this.render()
    this.open();
    this.closeTimeout();
  };

  this.handleToast = (event) => {
    if (event.target.closest('#toast')) {
      this.close();
    };
  };
  
  this.open = function() {
    setTimeout(() => {
      this.root.classList.add("toast--visible");
    }, this.OPEN_DELAY);
  };
  
  this.close = function() {
    this.root.classList.remove("toast--visible");
  };

  this.closeTimeout = function() {
    setTimeout(() => {
      this.root.classList.remove("toast--visible");
    }, this.CLOSE_DELAY);
  };

  this.render = function() {
    root.querySelector(".toast__message").textContent = this.message;
  };
};

const toast = new Toast(options);

export { toast };
