const TODO_TASK_KEY = "todos-data";

function setTodosData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getTodosData(key) {
  let data = JSON.parse(localStorage.getItem(key));
  return (data ??= []);
}

////////////////////

const IN_PROGRESS_TASK_KEY = "in-progress-data";

function setTodosInProgressData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getTodosInProgressData(key) {
  let data = JSON.parse(localStorage.getItem(key));
  return (data ??= []);
}

export {
  TODO_TASK_KEY,
  setTodosData,
  getTodosData,
  IN_PROGRESS_TASK_KEY,
  setTodosInProgressData,
  getTodosInProgressData,
};
