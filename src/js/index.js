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
  main.append(document.createElement('memory-game'))
})

chatIcon.addEventListener('click', () => {
  main.append(document.createElement('chat-app'))
})

customIcon.addEventListener('click', () => {
  main.append(document.createElement('custom-app'))
})
