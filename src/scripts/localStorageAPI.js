const TODO_TASK_KEY = "todos-data";

function setTodosData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getTodosData(key) {
  let data = JSON.parse(localStorage.getItem(key));
  return (data ??= []);
}

export { TODO_TASK_KEY, setTodosData, getTodosData };
