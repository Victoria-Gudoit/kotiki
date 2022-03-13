const SERVICE_SERVER = {
  url: "https://622da2d58d943bae34835a90.mockapi.io",
  endPoints: {
    users: "/users",
  },
  getUser() {
    return this.url + this.endPoints.users;
  },
  postUser(inputValue) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${inputValue}` }),
    };
    const request = new Request(this.getUser(), options);
    fetch(request)
      .then((response) => response.json())
      .then((data) => data);
  },
  getUsers() {
    return fetch(this.getUser()).then((response) => response.json());
  },
};

export { SERVICE_SERVER };
