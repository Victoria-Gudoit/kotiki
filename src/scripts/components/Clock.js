const currentTime = setInterval(() => {
  const time = document.querySelector("#clock");
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  time.textContent = `${hours}:${minutes}`;
});

function clockInCard() {
  const date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
  setTimeout("timeCard()", 1000);
}

export { currentTime, clockInCard };
