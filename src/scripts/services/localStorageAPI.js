const BASE_SERVISE = {
  keys: {
    TODO_TASK_KEY: "new-todos",
    IN_PROGRESS_TASK_KEY: "todos-in-progress",
    DONE_TASK_KEY: "todos-done",
  },
  setNewTodos(todos) {
    localStorage.setItem(this.keys.TODO_TASK_KEY, JSON.stringify(todos));
  },
  getNewTodos() {
    let todos = JSON.parse(localStorage.getItem(this.keys.TODO_TASK_KEY));
    return (todos ??= []);
  },

  setTodosInProgress(todos) {
    localStorage.setItem(this.keys.IN_PROGRESS_TASK_KEY, JSON.stringify(todos));
  },
  getTodosInProgress() {
    let todos = JSON.parse(
      localStorage.getItem(this.keys.IN_PROGRESS_TASK_KEY)
    );
    return (todos ??= []);
  },

  setTodosInColumnDone(todos) {
    localStorage.setItem(this.keys.DONE_TASK_KEY, JSON.stringify(todos));
  },
  getTodosInColumnDone() {
    let todos = JSON.parse(localStorage.getItem(this.keys.DONE_TASK_KEY));
    return (todos ??= []);
  },
};

export { BASE_SERVISE };
