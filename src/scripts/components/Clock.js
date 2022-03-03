function renderTime(){
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  
  document.querySelector('#clock').textContent = `${hours}:${minutes}`
}

function currentTime(){
  window.setInterval(() => {
      renderTime()
  }, 1)
}

currentTime()

function clockInCard() {
  const date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export { currentTime, clockInCard };
