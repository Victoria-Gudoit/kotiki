// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/services/localStorageAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE_SERVISE = void 0;
var BASE_SERVISE = {
  keys: {
    TODO_TASK_KEY: "new-todos",
    IN_PROGRESS_TASK_KEY: "todos-in-progress",
    DONE_TASK_KEY: "todos-done"
  },
  setNewTodos: function setNewTodos(todos) {
    localStorage.setItem(this.keys.TODO_TASK_KEY, JSON.stringify(todos));
  },
  getNewTodos: function getNewTodos() {
    var _todos;

    var todos = JSON.parse(localStorage.getItem(this.keys.TODO_TASK_KEY));
    return (_todos = todos) !== null && _todos !== void 0 ? _todos : todos = [];
  },
  setTodosInProgress: function setTodosInProgress(todos) {
    localStorage.setItem(this.keys.IN_PROGRESS_TASK_KEY, JSON.stringify(todos));
  },
  getTodosInProgress: function getTodosInProgress() {
    var _todos2;

    var todos = JSON.parse(localStorage.getItem(this.keys.IN_PROGRESS_TASK_KEY));
    return (_todos2 = todos) !== null && _todos2 !== void 0 ? _todos2 : todos = [];
  },
  setTodosInColumnDone: function setTodosInColumnDone(todos) {
    localStorage.setItem(this.keys.DONE_TASK_KEY, JSON.stringify(todos));
  },
  getTodosInColumnDone: function getTodosInColumnDone() {
    var _todos3;

    var todos = JSON.parse(localStorage.getItem(this.keys.DONE_TASK_KEY));
    return (_todos3 = todos) !== null && _todos3 !== void 0 ? _todos3 : todos = [];
  }
};
exports.BASE_SERVISE = BASE_SERVISE;
},{}],"scripts/components/Clock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTime = renderTime;
exports.startTime = startTime;

function getCurrentTime() {
  var date = new Date();
  var hours = date.getHours().toString().padStart(2, "0");
  var minutes = date.getMinutes().toString().padStart(2, "0");
  return "".concat(hours, ":").concat(minutes);
}

function renderTime() {
  var currentTime = getCurrentTime();
  document.querySelector("#clock").textContent = currentTime;
  return currentTime;
}

function startTime() {
  setInterval(function () {
    renderTime();
  }, 1000);
}
},{}],"scripts/utils/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUUID = getUUID;
exports.getValueOption = getValueOption;

function getUUID() {
  var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return id;
}

function getValueOption() {
  var select = document.querySelector("#users");
  var value = select.options[select.selectedIndex].text;
  return value;
}
},{}],"scripts/templates/templates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCard = createCard;
exports.createCardInColumnDone = createCardInColumnDone;
exports.createCardInProgress = createCardInProgress;
exports.createElement = createElement;
exports.createInput = createInput;

function createElement(tag, className) {
  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var element = document.createElement(tag);
  var textElement = document.createTextNode(text);
  element.className = className;
  element.append(textElement);
  return element;
}

function createCard(task) {
  var card = createElement("li", "card card--blue");
  var cardHeader = createElement("div", "card__content");
  var cardTitle = createElement("h3", "card__content-title", task.title);
  var cardButtons = createElement("div", "card__content");
  var cardBtnEdit = createElement("button", "card__content-btn", "Edit");
  var cardBtnDelete = createElement("button", "card__content-btn", "Delete");
  var cardMain = createElement("div", "card__content");
  var cardDescription = createElement("p", "card__content-description", task.description);
  var cardBtnArrow = createElement("button", "card__content-btn card__content-btn--arrow");
  var cardFooter = createElement("div", "card__content");
  var cardUser = createElement("p", "card__content-user", task.user);
  var cardTime = createElement("p", "card__content-time", task.time);
  card.id = task.id;
  cardHeader.id = "headercard";
  cardBtnEdit.id = "edit";
  cardMain.id = "maincard";
  cardBtnEdit.type = "button";
  cardBtnDelete.type = "button";
  cardBtnArrow.type = "button";
  cardBtnEdit.setAttribute("data-edit", "edit");
  cardBtnArrow.setAttribute("data-arrow", "moving");
  cardBtnDelete.setAttribute("data-delete", "delete");
  cardMain.append(cardDescription, cardBtnArrow);
  cardButtons.append(cardBtnEdit, cardBtnDelete);
  cardHeader.append(cardTitle, cardButtons);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);
  return card;
}

function createCardInProgress(task) {
  var card = createElement("li", "card card--pink");
  var cardHeader = createElement("div", "card__content");
  var cardTitle = createElement("h3", "card__content-title", task.title);
  var cardButtons = createElement("div", "card__content");
  var cardBtnBack = createElement("button", "card__content-btn", "Back");
  var cardBtnComplete = createElement("button", "card__content-btn", "Complete");
  var cardMain = createElement("div", "card__content");
  var cardDescription = createElement("p", "card__content-description", task.description);
  var cardFooter = createElement("div", "card__content");
  var cardUser = createElement("p", "card__content-user", task.user);
  var cardTime = createElement("p", "card__content-time", task.time);
  cardBtnBack.type = "button";
  cardBtnComplete.type = "button";
  card.id = task.id;
  cardHeader.id = "headercard";
  cardMain.id = "maincard";
  cardBtnBack.setAttribute("data-action", "back");
  cardBtnComplete.setAttribute("data-complete", "btn");
  cardHeader.append(cardTitle, cardButtons);
  cardButtons.append(cardBtnBack, cardBtnComplete);
  cardMain.append(cardDescription);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);
  return card;
}

function createCardInColumnDone(task) {
  var card = createElement("li", "card card--orange");
  var cardHeader = createElement("div", "card__content");
  var cardTitle = createElement("h3", "card__content-title", task.title);
  var cardButtons = createElement("div", "card__content");
  var cardBtnDelete = createElement("button", "card__content-btn", "Delete");
  var cardMain = createElement("div", "card__content");
  var cardDescription = createElement("p", "card__content-description", task.description);
  var cardFooter = createElement("div", "card__content");
  var cardUser = createElement("p", "card__content-user", task.user);
  var cardTime = createElement("p", "card__content-time", task.time);
  cardBtnDelete.type = "button";
  card.id = task.id;
  cardHeader.id = "headercard";
  cardMain.id = "maincard";
  cardBtnDelete.setAttribute("data-remove", "done");
  cardHeader.append(cardTitle, cardButtons);
  cardButtons.append(cardBtnDelete);
  cardMain.append(cardDescription);
  cardFooter.append(cardUser, cardTime);
  card.append(cardHeader, cardMain, cardFooter);
  return card;
}

function createInput() {
  var inputEdit = createElement("input", "card__input");
  inputEdit.type = "text";
  return inputEdit;
}
},{}],"scripts/components/Counter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = exports.column = void 0;
var column = new ColumnTodos();
exports.column = column;
var keys = {
  counterTodo: document.querySelector("#counter-todo"),
  counterProgress: document.querySelector("#counter-progress"),
  counterDone: document.querySelector("#counter-done")
};
exports.keys = keys;

function ColumnTodos() {
  this.cardsInColumn = function (tasks, counterId) {
    var amountOfCards = tasks.length;
    counterId.textContent = amountOfCards;

    if (!amountOfCards) {
      counterId.textContent = "";
    }
  };
}
},{}],"scripts/components/Card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = Card;
exports.initCard = initCard;

var _localStorageAPI = require("../services/localStorageAPI.js");

var _Clock = require("./Clock.js");

var _utils = require("../utils/utils.js");

var _templates = require("../templates/templates.js");

var _Counter = require("../components/Counter.js");

var _ModalWarning = require("../components/ModalWarning.js");

function initCard() {
  var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

  tasks.forEach(function (task) {
    var card = new Card(task);
    card.render();
    card.stopMovingCards();
  });

  var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

  tasksInProgress.forEach(function (task) {
    var cardInProgress = new Card(task);
    cardInProgress.renderCardInProgress();
  });

  var tasksInColumnDone = _localStorageAPI.BASE_SERVISE.getTodosInColumnDone();

  tasksInColumnDone.forEach(function (task) {
    var cardInColumnDone = new Card(task);
    cardInColumnDone.renderCardInColumnDone();
  });
}

function Card(title, description) {
  var _this2 = this;

  this.id = (0, _utils.getUUID)();
  this.title = title;
  this.description = description;
  this.user = (0, _utils.getValueOption)();
  this.time = (0, _Clock.renderTime)();

  this.render = function () {
    var _this = this;

    var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

    var todosWrapper = document.querySelector("#column-cards");
    todosWrapper.innerHTML = "";

    if (tasks.length) {
      tasks.forEach(function (task) {
        var card = (0, _templates.createCard)(task);
        card.addEventListener("click", _this.handleCardTodo);
        todosWrapper.appendChild(card);

        _Counter.column.cardsInColumn(tasks, _Counter.keys.counterTodo);
      });
    }
  };

  this.handleCardTodo = function (_ref) {
    var target = _ref.target;

    switch (target.dataset && target.textContent.toLowerCase()) {
      case "edit":
        _this2.edit();

        break;

      case "save":
        _this2.save();

        break;
    }

    if (target.dataset.arrow) {
      _this2.moveCardInProgress();

      _this2.renderCardInProgress();

      _this2.stopMovingCards();

      _this2.showModalWarning();
    }

    if (target.dataset.delete) {
      _this2.delete();
    }
  };

  this.edit = function () {
    this.card = event.target.closest(".card");
    this.id = this.card.id;
    this.headerCard = this.card.querySelector("#headercard");
    this.cardTitle = this.card.querySelector(".card__content-title");
    this.textTitle = this.card.querySelector(".card__content-title").textContent;
    this.inputEditTitleCard = (0, _templates.createInput)();
    this.headerCard.prepend(this.inputEditTitleCard);
    this.inputEditTitleCard.value = this.textTitle;
    this.cardTitle.classList.add("card__content-title--hidden");
    this.mainCard = this.card.querySelector("#maincard");
    this.cardDescription = this.card.querySelector(".card__content-description");
    this.textDescription = this.card.querySelector(".card__content-description").textContent;
    this.inputEditDescriptionCard = (0, _templates.createInput)();
    this.mainCard.prepend(this.inputEditDescriptionCard);
    this.inputEditDescriptionCard.value = this.textDescription;
    this.cardDescription.classList.toggle("card__content-description--hidden");
    this.cardBtnEdit = this.card.querySelector("#edit");
    this.cardBtnEdit.textContent = "Save";
  };

  this.save = function () {
    var _this3 = this;

    this.cardTitle.classList.toggle("card__content-title--hidden");
    this.cardTitle.textContent = this.inputEditTitleCard.value;
    this.inputEditTitleCard.remove();
    this.cardDescription.classList.toggle("card__content-description--hidden");
    this.cardDescription.textContent = this.inputEditDescriptionCard.value;
    this.inputEditDescriptionCard.remove();
    this.cardBtnEdit.textContent = "Edit";

    var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

    tasks.forEach(function (element) {
      if (element.id === _this3.id) {
        element.title = _this3.cardTitle.textContent;
        element.description = _this3.cardDescription.textContent;
      }
    });

    _localStorageAPI.BASE_SERVISE.setNewTodos(tasks);
  };

  this.delete = function () {
    var _this4 = this;

    this.card = event.target.closest(".card");
    this.id = this.card.id;

    var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

    tasks.map(function (task, index) {
      if (task.id === _this4.id) {
        tasks.splice(index, 1);
      }
    });

    _localStorageAPI.BASE_SERVISE.setNewTodos(tasks);

    this.render();

    _Counter.column.cardsInColumn(tasks, _Counter.keys.counterTodo);
  };

  this.renderCardInProgress = function () {
    var _this5 = this;

    var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

    var columnInProgress = document.querySelector("#column-cards-progress");
    columnInProgress.innerHTML = "";
    tasksInProgress.forEach(function (task) {
      var cardInProgress = (0, _templates.createCardInProgress)(task);
      cardInProgress.addEventListener("click", _this5.handleCardInProgress);
      columnInProgress.appendChild(cardInProgress);

      _Counter.column.cardsInColumn(tasksInProgress, _Counter.keys.counterProgress);
    });
  };

  this.handleCardInProgress = function (_ref2) {
    var target = _ref2.target;

    if (target.dataset.action) {
      _this2.moveCardBack();

      _this2.renderCardInProgress();

      _this2.render();
    } else if (target.dataset.complete) {
      _this2.moveCardInColumnDone();

      _this2.renderCardInColumnDone();
    }
  };

  this.moveCardInProgress = function () {
    var _this6 = this;

    this.card = event.target.closest(".card");
    this.id = this.card.id;

    var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

    var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

    tasks.map(function (task, index) {
      if (task.id === _this6.id) {
        tasksInProgress.push(task);
        tasks.splice(index, 1);
      }
    });

    _localStorageAPI.BASE_SERVISE.setNewTodos(tasks);

    this.render();

    _Counter.column.cardsInColumn(tasks, _Counter.keys.counterTodo);

    _localStorageAPI.BASE_SERVISE.setTodosInProgress(tasksInProgress);
  };

  this.moveCardBack = function () {
    var _this7 = this;

    this.card = event.target.closest(".card");
    this.id = this.card.id;

    var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

    var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

    tasksInProgress.map(function (task, index) {
      if (task.id === _this7.id) {
        tasks.push(task);
        tasksInProgress.splice(index, 1);
      }
    });
    this.renderCardInProgress;

    _Counter.column.cardsInColumn(tasksInProgress, _Counter.keys.counterProgress);

    _localStorageAPI.BASE_SERVISE.setTodosInProgress(tasksInProgress);

    _localStorageAPI.BASE_SERVISE.setNewTodos(tasks);
  };

  this.stopMovingCards = function () {
    var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

    if (tasksInProgress.length >= 6) {
      var arrowBtns = document.querySelectorAll("[data-arrow=moving]");
      arrowBtns.forEach(function (btn) {
        btn.disabled = true;
      });
    }
  };

  this.showModalWarning = function () {
    var modalWindow = document.querySelector("#modal-warning");
    var modalWarningText = modalWindow.querySelector(".card__content-description");
    var btnConfirm = document.querySelector("#confirm-delete-all");

    var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

    if (tasksInProgress.length >= 6) {
      _ModalWarning.modalWarning.open();

      modalWarningText.textContent = "Sorry! You can't add more than 6 cards!";
      btnConfirm.classList.add("card__content-btn--hidden");
    }
  };

  this.moveCardInColumnDone = function () {
    var _this8 = this;

    this.card = event.target.closest(".card");
    this.id = this.card.id;

    var tasksInProgress = _localStorageAPI.BASE_SERVISE.getTodosInProgress();

    var tasksInColumnDone = _localStorageAPI.BASE_SERVISE.getTodosInColumnDone();

    tasksInProgress.map(function (task, index) {
      if (task.id === _this8.id) {
        tasksInColumnDone.push(task);
        tasksInProgress.splice(index, 1);
      }
    });

    _localStorageAPI.BASE_SERVISE.setTodosInProgress(tasksInProgress);

    this.renderCardInProgress();

    _Counter.column.cardsInColumn(tasksInProgress, _Counter.keys.counterProgress);

    _localStorageAPI.BASE_SERVISE.setTodosInColumnDone(tasksInColumnDone);
  };

  this.renderCardInColumnDone = function () {
    var _this9 = this;

    var tasksDone = _localStorageAPI.BASE_SERVISE.getTodosInColumnDone();

    var columnTodoDone = document.querySelector("#column-cards-done");
    columnTodoDone.innerHTML = "";
    tasksDone.forEach(function (task) {
      var cardInColumnDone = (0, _templates.createCardInColumnDone)(task);
      cardInColumnDone.addEventListener("click", _this9.handleCardInColumnDone);
      columnTodoDone.appendChild(cardInColumnDone);

      _Counter.column.cardsInColumn(tasksDone, _Counter.keys.counterDone);
    });
  };

  this.handleCardInColumnDone = function (_ref3) {
    var target = _ref3.target;

    if (target.dataset.remove) {
      _this2.removeCardDone();
    }
  };

  this.removeCardDone = function () {
    var _this10 = this;

    this.card = event.target.closest(".card");
    this.id = this.card.id;

    var tasksDone = _localStorageAPI.BASE_SERVISE.getTodosInColumnDone();

    tasksDone.map(function (task, index) {
      if (task.id === _this10.id) {
        tasksDone.splice(index, 1);
      }
    });

    _localStorageAPI.BASE_SERVISE.setTodosInColumnDone(tasksDone);

    this.renderCardInColumnDone();

    _Counter.column.cardsInColumn(tasksDone, _Counter.keys.counterDone);
  };
}
},{"../services/localStorageAPI.js":"scripts/services/localStorageAPI.js","./Clock.js":"scripts/components/Clock.js","../utils/utils.js":"scripts/utils/utils.js","../templates/templates.js":"scripts/templates/templates.js","../components/Counter.js":"scripts/components/Counter.js","../components/ModalWarning.js":"scripts/components/ModalWarning.js"}],"scripts/components/ModalWarning.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalWarning = void 0;

var _localStorageAPI = require("../services/localStorageAPI.js");

var _Card = require("./Card.js");

var _Counter = require("../components/Counter.js");

var options = {
  message: "Are you sure that you want to delete every completed task?",
  root: document.querySelector("#modal-warning")
};

function ModalWarning(_ref) {
  var _this = this;

  var root = _ref.root,
      message = _ref.message;
  this.root = root;
  this.message = message;
  this.btnCancelModal = this.root.querySelector("#cancel-modal");
  this.btnConfirmModal = this.root.querySelector("#confirm-delete-all");
  this.btnDeleteAll = document.querySelector("#delete-all");

  this.init = function () {
    this.btnDeleteAll.addEventListener("click", this.handleBtnDelete);
    this.btnCancelModal.addEventListener("click", this.handleBtnCancel);
    this.btnConfirmModal.addEventListener("click", this.handleBtnConfirm);
  };

  this.handleBtnDelete = function (event) {
    if (event.target.id === "delete-all") {
      _this.open();

      _this.render();
    }
  };

  this.handleBtnCancel = function (event) {
    if (event.target.id === "cancel-modal") {
      _this.close();
    }
  };

  this.handleBtnConfirm = function (event) {
    if (event.target.id === "confirm-delete-all") {
      _this.deleteAll();

      _this.close();
    }
  };

  this.open = function () {
    this.root.classList.add("modal--open");
    this.btnConfirmModal.classList.remove("card__content-btn--hidden");
  };

  this.close = function () {
    this.root.classList.remove("modal--open");
  };

  this.render = function () {
    root.querySelector(".card__content-description").textContent = this.message;
  };

  this.deleteAll = function () {
    var tasksDone = _localStorageAPI.BASE_SERVISE.getTodosInColumnDone();

    tasksDone.length = 0;

    _localStorageAPI.BASE_SERVISE.setTodosInColumnDone(tasksDone);

    var cardInColumnDone = new _Card.Card(tasksDone);
    cardInColumnDone.renderCardInColumnDone();

    _Counter.column.cardsInColumn(tasksDone, _Counter.keys.counterDone);
  };
}

var modalWarning = new ModalWarning(options);
exports.modalWarning = modalWarning;
modalWarning.init();
},{"../services/localStorageAPI.js":"scripts/services/localStorageAPI.js","./Card.js":"scripts/components/Card.js","../components/Counter.js":"scripts/components/Counter.js"}],"scripts/services/mockAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOCK_API = void 0;
var MOCK_API = {
  url: "https://622da2d58d943bae34835a90.mockapi.io/users",
  postUser: function postUser(inputValue) {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "".concat(inputValue)
      })
    };
    var request = new Request(this.url, options);
    fetch(request).then(function (response) {
      return new Promise(function (resolve, reject) {
        if (response.ok) {
          var users = response.json();
          resolve(users);
        } else {
          reject(new Error("Ошибка!"));
        }
      });
    }).then(function (data) {
      return data;
    });
  },
  getUsers: function getUsers() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      return fetch(_this.url).then(function (response) {
        if (response.ok) {
          var users = response.json();
          resolve(users);
        } else {
          reject(new Error("Ошибка!"));
        }
      });
    });
  }
};
exports.MOCK_API = MOCK_API;
},{}],"scripts/components/ModalAddUser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalAddUser = void 0;

var _mockAPI = require("../services/mockAPI.js");

var ModalAddUser = new ModalAdd(document.querySelector("#modal-adding"));
exports.ModalAddUser = ModalAddUser;

function ModalAdd(root) {
  var _this = this;

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

  this.handleBtnAddUser = function (_ref) {
    var target = _ref.target;

    if (target.id === "btn-add-user") {
      _this.open();
    }
  };

  this.handleBtnCancel = function (_ref2) {
    var target = _ref2.target;

    if (target.id === "cancel-modal-adding") {
      _this.close();
    }
  };

  this.handleBtnConfirm = function (_ref3) {
    var target = _ref3.target;

    if (target.id === "confirm-modal-adding") {
      var modalInput = _this.root.querySelector("#modal-adding-input").value;

      _mockAPI.MOCK_API.postUser(modalInput);

      _this.close();

      _this.clearInput(_this.modalInput);
    }
  };

  this.open = function () {
    this.root.classList.add("modal--open");
  };

  this.close = function () {
    this.root.classList.remove("modal--open");
  };

  this.clearInput = function (text) {
    text.value = "";
  };

  this.deleteOptions = function () {
    var list = document.querySelector("#users");
    list.innerHTML = "";
  };

  this.printUsers = function (users) {
    var list = document.querySelector("#users");
    users.forEach(function (user) {
      var item = document.createElement("option");
      item.id = "option";
      item.textContent = user.name;
      list.append(item);
    });
  };

  this.printUsersInModal = function () {
    var _this2 = this;

    _mockAPI.MOCK_API.getUsers().then(function (users) {
      return _this2.printUsers(users);
    });
  };
}
},{"../services/mockAPI.js":"scripts/services/mockAPI.js"}],"scripts/components/ModalToDo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalToDo = void 0;

var _Card = require("./Card.js");

var _localStorageAPI = require("../services/localStorageAPI.js");

var _ModalAddUser = require("./ModalAddUser.js");

var modalToDo = new ModalToDo(document.querySelector(".modal-window"));
exports.modalToDo = modalToDo;

function ModalToDo(root) {
  this.root = root;
  this.btnCancel = this.root.querySelector(".modal-window__button-cancel");
  this.btnAdd = document.querySelector("#btn-add");
  this.btnConfirm = this.root.querySelector(".modal-window__button-confirm");
  this.overlayModal = document.querySelector(".modal-window");

  this.init = function () {
    this.btnCancel.addEventListener("click", this.handleModalClose);
    this.btnAdd.addEventListener("click", this.handleModalOpen);
    this.btnConfirm.addEventListener("click", this.handleAddTask);
    this.overlayModal.addEventListener("click", this.handleModalCloseOverlay);
  };

  this.handleModalOpen = function () {
    _ModalAddUser.ModalAddUser.deleteOptions();

    _ModalAddUser.ModalAddUser.printUsersInModal();

    modalToDo.open();
  };

  this.handleModalClose = function () {
    modalToDo.close();
  };

  this.handleAddTask = function () {
    modalToDo.addTask();
  };

  this.handleModalCloseOverlay = function (_ref) {
    var target = _ref.target;

    if (target.id === "modal-window") {
      modalToDo.close();
    }
  };

  this.open = function () {
    this.root.classList.add("modal-window--active");
    document.querySelector("body").classList.add("modal-window--hidden");
  };

  this.close = function () {
    this.root.classList.remove("modal-window--active");
    document.querySelector("body").classList.remove("modal-window--hidden");
  };

  this.clearInputs = function (titleInput, descriptionInput) {
    titleInput.value = "";
    descriptionInput.value = "";
  };

  this.addTask = function () {
    var tasks = _localStorageAPI.BASE_SERVISE.getNewTodos();

    var titleTask = document.querySelector("#modal-title");
    var descriptionTask = document.querySelector("#modal-text");
    var card = new _Card.Card(titleTask.value, descriptionTask.value);
    tasks.push(card);

    if (titleTask.value && descriptionTask.value) {
      _localStorageAPI.BASE_SERVISE.setNewTodos(tasks);

      card.render();
      this.clearInputs(titleTask, descriptionTask);
      modalToDo.close();
    } else {
      alert("Вы ничего не ввели! :( ");
    }
  };
}
},{"./Card.js":"scripts/components/Card.js","../services/localStorageAPI.js":"scripts/services/localStorageAPI.js","./ModalAddUser.js":"scripts/components/ModalAddUser.js"}],"scripts/components/Toast.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toast = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var options = {
  root: document.querySelector("#toast"),
  message: 'Привет, это приложение Trello:)',
  OPEN_DELAY: 15000,
  CLOSE_DELAY: 20000
};

var Toast = /*#__PURE__*/function () {
  function Toast(_ref) {
    var _this = this;

    var root = _ref.root,
        message = _ref.message,
        OPEN_DELAY = _ref.OPEN_DELAY,
        CLOSE_DELAY = _ref.CLOSE_DELAY;

    _classCallCheck(this, Toast);

    _defineProperty(this, "handleToast", function (event) {
      if (event.target.closest('#toast')) {
        _this.close();
      }

      ;
    });

    this.root = root;
    this.message = message;
    this.OPEN_DELAY = OPEN_DELAY;
    this.CLOSE_DELAY = CLOSE_DELAY;
  }

  _createClass(Toast, [{
    key: "init",
    value: function init() {
      this.root.addEventListener("click", this.handleToast);
      this.render();
      this.open();
      this.closeTimeout();
    }
  }, {
    key: "open",
    value: function open() {
      var _this2 = this;

      setTimeout(function () {
        _this2.root.classList.add("toast--visible");
      }, this.OPEN_DELAY);
    }
  }, {
    key: "close",
    value: function close() {
      this.root.classList.remove("toast--visible");
    }
  }, {
    key: "closeTimeout",
    value: function closeTimeout() {
      var _this3 = this;

      setTimeout(function () {
        _this3.root.classList.remove("toast--visible");
      }, this.CLOSE_DELAY);
    }
  }, {
    key: "render",
    value: function render() {
      this.root.querySelector(".toast__message").textContent = this.message;
    }
  }]);

  return Toast;
}();

;
var toast = new Toast(options);
exports.toast = toast;
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _ModalWarning = require("./components/ModalWarning.js");

var _Clock = require("./components/Clock.js");

var _ModalToDo = require("./components/ModalToDo.js");

var _Toast = require("./components/Toast.js");

var _Card = require("./components/Card.js");

var _ModalAddUser = require("./components/ModalAddUser.js");

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  (0, _Card.initCard)();
  (0, _Clock.startTime)();

  _ModalToDo.modalToDo.init();

  _ModalWarning.modalWarning.init();

  _Toast.toast.init();

  _ModalAddUser.ModalAddUser.init();
}
},{"./components/ModalWarning.js":"scripts/components/ModalWarning.js","./components/Clock.js":"scripts/components/Clock.js","./components/ModalToDo.js":"scripts/components/ModalToDo.js","./components/Toast.js":"scripts/components/Toast.js","./components/Card.js":"scripts/components/Card.js","./components/ModalAddUser.js":"scripts/components/ModalAddUser.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49247" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map