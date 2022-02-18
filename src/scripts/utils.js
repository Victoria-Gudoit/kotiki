const currentTime = setInterval(() => {
    const time = document.querySelector('.header__time')
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    time.textContent = hours + ':' + minutes
})

export {currentTime}