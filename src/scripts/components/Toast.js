const toast = new Toast(document.querySelector("#toast"));

function Toast(root) {
  this.root = root;
  this.showToast = new Promise((resolve) => {
    setTimeout(() => {
      resolve(this.root.classList.add("toast-visible"));
    }, 15000);
  });
  this.showToast.then(() => {
    setTimeout(() => {
      this.root.classList.remove("toast-visible");
    }, 5000);
  });
  this.btnClose = this.root.querySelector(".toast__button-close");
  this.btnClose.addEventListener("click", (event) => {
    if (event.target.closest("#toast")) {
      this.root.classList.remove("toast-visible");
    }
  });
}

export { toast };
