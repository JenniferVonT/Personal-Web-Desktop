/**
 * The main script file of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu>
 * @version 1.0.0
 */

import './components/chat-app/'
import './components/memory-game/'
import './components/custom-app/'

const main = document.querySelector('main')
const memoryIcon = document.querySelector('#memory')
const chatIcon = document.querySelector('#chat')
const customIcon = document.querySelector('#custom')

memoryIcon.addEventListener('click', () => {
  const app = document.createElement('div')
  const appBar = document.createElement('div')
  const exit = document.createElement('p')
  exit.textContent = '✖'
  exit.classList.add('exit')
  appBar.classList.add('appBar')
  app.classList.add('app')

  appBar.append(exit)
  app.append(appBar)
  app.append(document.createElement('memory-game'))
  main.append(app)

  exit.addEventListener('click', () => {
    main.removeChild(app)
  })
})

chatIcon.addEventListener('click', () => {
  const app = document.createElement('div')
  const appBar = document.createElement('div')
  const exit = document.createElement('p')
  exit.textContent = '✖'
  exit.classList.add('exit')
  appBar.classList.add('appBar')
  app.classList.add('app')

  appBar.append(exit)
  app.append(appBar)
  app.append(document.createElement('chat-app'))
  main.append(app)

  exit.addEventListener('click', () => {
    main.removeChild(app)
  })
})

customIcon.addEventListener('click', () => {
  const app = document.createElement('div')
  const appBar = document.createElement('div')
  const exit = document.createElement('p')
  exit.textContent = '✖'
  exit.classList.add('exit')
  appBar.classList.add('appBar')
  app.classList.add('app')

  appBar.append(exit)
  app.append(appBar)
  app.append(document.createElement('custom-app')) // EV ÄNDRA NAMNET PÅ APPEN.
  main.append(app)

  exit.addEventListener('click', () => {
    main.removeChild(app)
  })
})
