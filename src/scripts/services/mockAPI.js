const MOCK_API = {
  url: "https://622da2d58d943bae34835a90.mockapi.io/users",

  postUser(inputValue) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${inputValue}` }),
    };
    const request = new Request(this.url, options);

    fetch(request)
      .then(
        (response) =>
          new Promise((resolve, reject) => {
            if (response.ok) {
              const users = response.json();
              resolve(users);
            } else {
              reject(new Error("Ошибка!"));
            }
          })
      )
      .then((data) => data);
  },
  getUsers() {
    return new Promise((resolve, reject) => {
      return fetch(this.url).then((response) => {
        if (response.ok) {
          const users = response.json();
          resolve(users);
        } else {
          reject(new Error("Ошибка!"));
        }
      });
    });
  },
};

export { MOCK_API };
