function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`
}

function renderTime() {
  const currentTime = getCurrentTime();
  document.querySelector("#clock").textContent = currentTime;
  return currentTime;
}

function startTime() {
  setInterval(() => {
    renderTime();
  }, 1000);
}

export { startTime, renderTime };
