const BASE_SERVISE = {
  keys: {
    TODO_TASK_KEY: "todos-data",
    IN_PROGRESS_TASK_KEY: "in-progress-data",
  },
  setTodosData(data) {
    localStorage.setItem(this.keys.TODO_TASK_KEY, JSON.stringify(data));
  },
  getTodosData() {
    let data = JSON.parse(localStorage.getItem(this.keys.TODO_TASK_KEY));
    return (data ??= []);
  },
  setTodosInProgressData(data) {
    localStorage.setItem(this.keys.IN_PROGRESS_TASK_KEY, JSON.stringify(data));
  },
  getTodosInProgressData() {
    let data = JSON.parse(localStorage.getItem(this.keys.IN_PROGRESS_TASK_KEY));
    return (data ??= []);
  },
};

export { BASE_SERVISE };
