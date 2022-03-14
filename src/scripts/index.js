import { modalWarning } from "./components/ModalWarning.js";
import { startTime } from "./components/Clock.js";
import { modalToDo } from "./components/ModalToDo.js";
import { toast } from "./components/Toast.js";
import { initCard } from "./components/Card.js";
import { modalAddingUser } from "./components/ModalAddingUser.js";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  initCard();
  startTime();
  modalToDo.init();
  modalWarning.init();
  toast.init();
  modalAddingUser.init();
}
