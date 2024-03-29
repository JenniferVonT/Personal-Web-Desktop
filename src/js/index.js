/**
 * The main script file of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu>
 * @version 1.0.0
 */

import './components/chat-app/'
import './components/memory-game/'
import './components/drawing-board/'
import './components/settings-app/'

const main = document.querySelector('main')
const body = document.querySelector('body')
const memoryIcon = document.querySelector('#memory')
const chatIcon = document.querySelector('#chat')
const drawingIcon = document.querySelector('#drawing')
const settings = document.querySelector('#settings')
const currentTheme = localStorage.getItem('theme')
const taskBar = document.querySelector('#taskbar')

let appCounter = 0

memoryIcon.addEventListener('click', () => {
  createApp('Memory', 'memory-game')
})

memoryIcon.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    createApp('Memory', 'memory-game')
  }
})

chatIcon.addEventListener('click', () => {
  createApp('Chat', 'chat-app')
})

chatIcon.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    createApp('Chat', 'chat-app')
  }
})

drawingIcon.addEventListener('click', () => {
  createApp('Drawing board', 'drawing-board')
})

drawingIcon.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    createApp('Drawing board', 'drawing-board')
  }
})

settings.addEventListener('click', () => {
  createApp('Settings', 'settings-app')
})

settings.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    createApp('Settings', 'settings-app')
  }
})

// Check what theme was last set and put that on.
if (currentTheme) {
  setNewTheme(currentTheme)
} else {
  setNewTheme('blue')
}

/**
 * Sets the new theme of the page.
 *
 * @param {string} theme - The name of the theme.
 */
function setNewTheme (theme) {
  const customImage = localStorage.getItem('savedCanvasImage')

  if (theme !== 'custom') {
    // Set the background theme.
    body.style.backgroundImage = ''
    body.removeAttribute('class')
    body.classList.add(theme)

    // Set the taskbar theme.
    taskBar.removeAttribute('class')
    taskBar.classList.add(`${theme}Bar`)
  } else {
    // Set the custom theme.
    body.removeAttribute('class')
    body.style.backgroundColor = 'white'
    body.style.backgroundImage = `url(${customImage})`

    taskBar.removeAttribute('class')
    taskBar.classList.add('customBar')
  }
}

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
  const customComponent = document.createElement(component)

  appName.textContent = name
  exit.textContent = '✖'

  exit.classList.add('exit')
  appName.classList.add('name')
  appBar.classList.add('appBar')
  app.classList.add('app')
  app.classList.add(component)
  app.tabIndex = 0

  // Make the appBar draggable.
  appBar.setAttribute('draggable', 'true')

  // Make every new app window slightly offset everytime it is added in the DOM.
  const offset = 20 * appCounter

  app.style.position = 'absolute'
  app.style.left = `${offset}px`
  app.style.top = `${offset}px`

  // Bring all the elements together.
  appBar.append(appName)
  appBar.append(exit)
  app.append(appBar)
  app.append(customComponent)
  main.append(app)

  // Make the 'X' remove the app and lower the appCounter.
  exit.addEventListener('click', () => {
    appCounter = appCounter - 1
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
    app.style.zIndex = appCounter + 1
  })

  // Listen for the paint application to set an image as a background.
  app.addEventListener('savedImage', () => setNewTheme('custom'))

  // Listen for when the settings application changes themes.
  app.addEventListener('newThemeSet', (event) => {
    setNewTheme(event.detail)
    localStorage.setItem('theme', event.detail)
  })

  if (app.querySelector('chat-app')) {
    customComponent.focus()
  } else {
    app.focus()
  }
}
