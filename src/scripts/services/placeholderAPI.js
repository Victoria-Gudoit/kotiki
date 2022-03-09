function getUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users/").then((response) =>
    response.json()
  );
}

function printUsers(users) {
  const list = document.querySelector("#users");
  users.forEach((user) => {
    const item = document.createElement("option");
    item.textContent = user.name;
    list.append(item);
  });
}

function printUsersInModal() {
  getUsers().then((users) => printUsers(users));
}

export { getUsers, printUsersInModal };
