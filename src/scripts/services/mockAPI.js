import { getUsers } from "../services/placeholderAPI.js";

function postUsers(users) {
  const URL = "https://622514976c0e3966204d0bae.mockapi.io/trello";

  const usersName = users.map((user) => {
    return user.name;
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usersName),
  };

  const request = new Request(URL, options);

  fetch(request)
    .then((response) => response.json())
    .then((data) => data);
}

function handleGetUsers() {
  getUsers().then((users) => postUsers(users));
}

export { handleGetUsers };
