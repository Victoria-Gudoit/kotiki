import { modalWarning } from "./components/ModalWarning.js";
import { currentTime } from "./components/Clock.js";
import { modalToDo } from "./components/ModalToDo.js";
import { toast } from "./components/Toast.js";
import { counter } from "./components/Counter.js";
import { request } from "./services/mockAPI.js";
import { initCard } from "./components/Card.js";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  initCard();
  currentTime();
  modalToDo.init();
}
