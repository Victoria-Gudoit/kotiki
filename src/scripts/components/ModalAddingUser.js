import { SERVICE_SERVER } from "../services/mockAPI.js";

const modalAddingUser = new ModalAdding(
  document.querySelector("#modal-adding")
);

function ModalAdding(root) {
  this.root = root;
  this.btnCancelModal = this.root.querySelector("#cancel-modal-adding");
  this.btnConfirmModal = this.root.querySelector("#confirm-modal-adding");
  this.btnAddUser = document.querySelector("#btn-add-user");
  this.modalInput = this.root.querySelector("#modal-adding-input");
  this.init = function () {
    this.btnAddUser.addEventListener("click", this.handleBtnAddUser);
    this.btnCancelModal.addEventListener("click", this.handleBtnCancel);
    this.btnConfirmModal.addEventListener("click", this.handleBtnConfirm);
  };
  this.handleBtnAddUser = ({ target }) => {
    if (target.id === "btn-add-user") {
      this.open();
    }
  };

  this.handleBtnCancel = ({ target }) => {
    if (target.id === "cancel-modal-adding") {
      this.close();
    }
  };

  this.handleBtnConfirm = ({ target }) => {
    if (target.id === "confirm-modal-adding") {
      const modalInput = this.root.querySelector("#modal-adding-input").value;
      SERVICE_SERVER.postUser(modalInput);
      this.close();
      this.clearInput(this.modalInput);
    }
  };

  this.open = function () {
    this.root.classList.add("modal-adding--open");
  };
  this.close = function () {
    this.root.classList.remove("modal-adding--open");
  };
  this.clearInput = function (text) {
    text.value = "";
  };
  this.printUsers = function (users) {
    const list = document.querySelector("#users");
    users.forEach((user) => {
      const item = document.createElement("option");
      item.textContent = user.name;
      list.append(item);
    });
  };
  this.printUsersInModal = function () {
    SERVICE_SERVER.getUsers().then((users) => this.printUsers(users));
  };
}

export { modalAddingUser };
