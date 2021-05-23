const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  messageThree.textContent = ''
  messageFour.textContent = ''
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      console.log(data)
      if (data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ""
        messageThree.textContent = ""
        messageFour.textContent = ""
      } else {
        messageOne.textContent = ""
        messageTwo.textContent = "Location: " + data.location
        messageThree.textContent = "Temperature: " + data.temp
        messageFour.textContent = "Weather: " + data.description
        // console.log(data.location)
        // console.log(data.temp)
        // console.log(data.description)
      }
    })
  })
})