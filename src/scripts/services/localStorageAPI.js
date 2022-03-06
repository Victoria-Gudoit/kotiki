const BASE_SERVISE = {
  keys: {
    TODO_TASK_KEY: "todos-data",
    IN_PROGRESS_TASK_KEY: "in-progress-data",
  },
  setTodosData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getTodosData(key) {
    let data = JSON.parse(localStorage.getItem(key));
    return (data ??= []);
  },
};

export { BASE_SERVISE };
