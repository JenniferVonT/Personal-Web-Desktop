/**
 * A component that represents a chat box.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */

import chatAppStyles from './chat-app.css.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
${chatAppStyles}
</style>
<div id="wrapper">
    <form id="userData">
        <h1>Write a name that the other user will see!</h1>
        <p>You will be paired with a random user</p>
        <input type="text" id="username" name="username" placeholder="Enter username here">
        <input type="submit" value="Connect" id="connect">
    </form>

    <form id="chat" class="hidden">
        <div id="chatWindow"></div>

        <label for="message">username</label>
        <textarea id="message" name="message" rows="10" cols="50" placeholder="Write your message here!"></textarea>
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
     * Represents the username input field.
     */
    #usernameInput

    /**
     * Represents the username input form.
     */
    #usernameForm

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
     * Represents the received message from the server/other user.
     */
    #recievedMessage

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#usernameInput = this.shadowRoot.querySelector('#username')
      this.#usernameForm = this.shadowRoot.querySelector('#userData')
      this.#chatWindow = this.shadowRoot.querySelector('#chatWindow')
      this.#message = this.shadowRoot.querySelector('#message')
      this.#sendMessage = this.shadowRoot.querySelector('#chat')
      this.#recievedMessage = ''

      // Create a websocket and put the appropriate event listeners.
      this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      this.socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event)
      })

      this.socket.addEventListener('message', (event) => {
        this.#recievedMessage = JSON.parse(event.data)
        console.log('Recieved message:', this.#recievedMessage)
      })

      this.socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event)
      })
    }
  })
