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
  createApp('Memory', 'memory-game')
})

chatIcon.addEventListener('click', () => {
  createApp('Chat', 'chat-app')
})

customIcon.addEventListener('click', () => {
  createApp('custom', 'custom-app') // EV BYTA NAMN PÅ CUSTOM APP.
})

/**
 * Create an instance of the given application.
 *
 * @param {string} name - The name of the application that shows at the top of the window.
 * @param {string} component - The name of the component to use inside the app window.
 */
function createApp (name, component) {
  appCounter += 1

  // Create all the neccessary elements and add classes and text content.
  const app = document.createElement('div')
  const appBar = document.createElement('div')
  const exit = document.createElement('p')
  const appName = document.createElement('p')

  appName.textContent = name
  exit.textContent = '✖'

  exit.classList.add('exit')
  appName.classList.add('name')
  appBar.classList.add('appBar')
  app.classList.add('app')
  app.classList.add(component)

  // Make the appBar draggable.
  appBar.setAttribute('draggable', 'true')

  // Bring all the elements together.
  appBar.append(appName)
  appBar.append(exit)
  app.append(appBar)
  app.append(document.createElement(component))
  main.append(app)

  // Make the 'X' remove the app.
  exit.addEventListener('click', () => {
    main.removeChild(app)
    appCounter -= 1
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
    event.preventDefault()

    const x = event.clientX - initialX
    const y = event.clientY - initialY

    // Set the new position of the app.
    app.style.position = 'absolute'
    app.style.left = `${x}px`
    app.style.top = `${y}px`
  })

  // Handle the end of the drag movement.
  appBar.addEventListener('dragend', (event) => {
    const x = event.clientX - initialX
    const y = event.clientY - initialY

    // Set the final position of the app.
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

  // Move the clicked window to the front.
  app.addEventListener('click', () => {
    app.style.zIndex = appCounter++
    app.focus()
  })
}
