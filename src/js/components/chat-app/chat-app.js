/**
 * A component that represents a chat box.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */

import chatAppStyles from './chat-app.css.js'
import '../nickname-form/index.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
${chatAppStyles}
</style>
<div id="wrapper">
    <nickname-form></nickname-form>

    <form id="chat" method="POST" class="hidden">
        <div id="chatWindow"></div>

        <label for="message" id="showUser"></label>
        <textarea id="message" name="message" rows="10" cols="50" placeholder="Write your message here!" autocomplete="off"></textarea>
        <input type="submit" value="Send" id="send">
    </form>    
</div>
`

customElements.define('chat-app',
  /**
   * Represents a chat-app element.
   */
  class extends HTMLElement {
    /**
     * Represents the username.
     */
    #username

    /**
     * Represents the nickname form component
     */
    #nicknameComp

    /**
     * Represents the tag that shows the username
     */
    #usernameTag

    /**
     * Represents the window that shows the chat conversation.
     */
    #chatWindow

    /**
     * Represents the message input.
     */
    #message

    /**
     * Represents the chat form.
     */
    #sendMessage

    /**
     * Represents the latest received message from the server/other user.
     */
    #recievedMessage

    /**
     * Represents the last 20 messages both sent and recieved
     */
    #conversation

    /**
     * Represents the websocket.
     */
    #socket

    /**
     * Represents the stored username.
     */
    #storedUsername

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#nicknameComp = this.shadowRoot.querySelector('nickname-form')
      this.#chatWindow = this.shadowRoot.querySelector('#chatWindow')
      this.#usernameTag = this.shadowRoot.querySelector('#showUser')
      this.#message = this.shadowRoot.querySelector('#message')
      this.#sendMessage = this.shadowRoot.querySelector('#chat')
      this.#recievedMessage = ''
      this.#conversation = JSON.parse(localStorage.getItem('chatlog')) || []

      // Create a websocket and put the appropriate event listeners.
      this.#socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      this.#socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event)
      })

      this.#socket.addEventListener('message', (event) => {
        this.#recievedMessage = JSON.parse(event.data)
        console.log('Recieved message:', this.#recievedMessage)

        this.#handleRecievedMessages(this.#recievedMessage)
      })

      this.#socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event)
      })

      this.#socket.addEventListener('error', (event) => {
        console.error('WebSocket encountered an error:', event)
      })

      this.#message.addEventListener('keydown', (event) => this.#handleKeyDown(event))
      this.#nicknameComp.addEventListener('submitNickname', () => this.#handleStart())
      this.#sendMessage.addEventListener('submit', (event) => this.#sendMessages(event))
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
    // Check if the username is already stored, and if it is continue without the start screen.
      this.#storedUsername = localStorage.getItem('chatAppUsername')
      this.#username = this.#storedUsername || ''

      if (this.#storedUsername) {
        this.#usernameTag.textContent = this.#username
        this.#sendMessage.classList.remove('hidden')
        this.#nicknameComp.classList.add('hidden')
      }

      this.#renderConversation()
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
    }

    /**
     * Handles the event when the 'enter' key is clicked.
     *
     * @param {Event} event - keydown event.
     */
    #handleKeyDown (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.#sendMessages(event)
      }
    }

    /**
     * Handles the username and switches to the chat window.
     */
    #handleStart () {
      // Save the submittet username.
      this.#username = this.#nicknameComp.nickname

      localStorage.setItem('chatAppUsername', this.#username)

      this.#usernameTag.textContent = this.#username

      // Remove the nickname form and show the chat window instead.
      this.#nicknameComp.classList.add('hidden')
      this.#sendMessage.classList.remove('hidden')
    }

    /**
     * Sends the submitted message to the server.
     *
     * @param {Event} event - The submit event.
     */
    #sendMessages (event) {
      event.preventDefault()

      const messageToSend = {
        // eslint-disable-next-line quote-props, quotes
        "type": "message",
        // eslint-disable-next-line quote-props, quotes
        "data": `${this.#message.value.toString()}`,
        // eslint-disable-next-line quote-props, quotes
        "username": `${this.#username}`,
        // eslint-disable-next-line quote-props, quotes
        "key": "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"
      }

      this.#socket.send(JSON.stringify(messageToSend))

      this.#message.value = ''
    }

    /**
     * Handles all the recieved messages from the server.
     *
     * @param {object} message - a parsed JSON object.
     */
    #handleRecievedMessages (message) {
      if (message.type === 'message') {
        const username = message.username
        const messageData = message.data
        const userMessage = {
          // eslint-disable-next-line object-shorthand
          username: username,
          message: messageData
        }

        this.#conversation.unshift(userMessage)

        this.#conversation = this.#conversation.slice(0, 30)

        localStorage.setItem('chatlog', JSON.stringify(this.#conversation))

        this.#renderConversation()
      }
    }

    /**
     * Renders the conversation in the chat window.
     */
    #renderConversation () {
      const shouldScrollToBottom = this.#chatWindow.scrollTop + this.#chatWindow.clientHeight === this.#chatWindow.scrollHeight

      this.#chatWindow.innerHTML = ''
      const length = this.#conversation.length

      for (let i = 0; i < length; i++) {
        const pElement = document.createElement('p')

        pElement.textContent = `${this.#conversation[i].username}:\n \u00A0 ${this.#conversation[i].message}`

        this.#chatWindow.prepend(pElement)
      }

      if (shouldScrollToBottom) {
        this.#chatWindow.scrollTop = this.#chatWindow.scrollHeight
      }
    }
  })
