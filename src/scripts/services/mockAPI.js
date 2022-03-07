import { BASE_SERVISE } from "../services/localStorageAPI.js";

const URL = "https://622514976c0e3966204d0bae.mockapi.io/trello";
const tasks = BASE_SERVISE.getTodosData();

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(tasks),
};

const request = new Request(URL, options);

fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(data));

export { request };
