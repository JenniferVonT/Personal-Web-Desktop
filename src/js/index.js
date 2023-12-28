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
let appCounter = 0

memoryIcon.addEventListener('click', () => {
  appCounter += 1
  // Create all the neccessary elements and add classes.
  const app = document.createElement('div')
  const appBar = document.createElement('div')
  const exit = document.createElement('p')
  exit.textContent = '✖'
  exit.classList.add('exit')
  appBar.classList.add('appBar')
  app.classList.add('app')

  // Make the appBar draggable.
  appBar.setAttribute('draggable', 'true')

  // Bring all the elements together.
  appBar.append(exit)
  app.append(appBar)
  app.append(document.createElement('memory-game'))
  main.append(app)

  // Make the 'X' remove the app.
  exit.addEventListener('click', () => {
    main.removeChild(app)
  })

  let initialX
  let initialY

  // Handle the start of the drag.
  appBar.addEventListener('dragstart', (event) => {
    // Store the initial position relative to the cursor
    const appBarRect = appBar.getBoundingClientRect()
    initialX = event.clientX - appBarRect.left
    initialY = event.clientY - appBarRect.top

    // Set the data being dragged.
    event.dataTransfer.setData('text/plain', '')
    event.dataTransfer.effectAllowed = 'none'

    app.style.zIndex = appCounter++
  })

  // Handle the active drag event.
  appBar.addEventListener('drag', (event) => {
    const x = event.clientX - initialX
    const y = event.clientY - initialY

    // Set the new position of the app.
    app.style.position = 'absolute'
    app.style.left = `${x}px`
    app.style.top = `${y}px`
  })

  // Handle the end of the dragging.
  appBar.addEventListener('dragend', (event) => {
    const x = event.clientX - initialX
    const y = event.clientY - initialY

    app.style.position = 'absolute'
    app.style.left = `${x}px`
    app.style.top = `${y}px`
  })

  // Prevent default drag-and-drop behaviour.
  appBar.addEventListener('dragenter', (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'none'
  })
  appBar.addEventListener('dragover', (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'none'
  })

  app.addEventListener('click', () => {
    app.style.zIndex = appCounter++
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
  app.setAttribute('draggable', 'true')

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
  app.setAttribute('draggable', 'true')

  appBar.append(exit)
  app.append(appBar)
  app.append(document.createElement('custom-app')) // EV ÄNDRA NAMNET PÅ APPEN.
  main.append(app)

  exit.addEventListener('click', () => {
    main.removeChild(app)
  })
})
