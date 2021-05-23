console.log('Client site JS')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      console.log(data)
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.temp
        // console.log(data.location)
        // console.log(data.temp)
        // console.log(data.description)
      }
    })
  })
})