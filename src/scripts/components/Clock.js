const currentTime = setInterval(() => {
    const time = document.querySelector('#clock')
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    
    time.textContent = `${hours}:${minutes}`
})

export {currentTime}