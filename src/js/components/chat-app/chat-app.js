/**
 * A component that represents a chat box.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    #wrapper {
        display: flex;
        justify-content: center;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        width: 450px;
        height: 450px;
    }

    #chatWindow {
        width: 430px;
        height: 280px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 15px;
        background-color: white;
    }
    #message {
        width: 425px;
        height: 115px;
        margin-left: 10px;
        resize: none;
    }

    #username {
        width: 400px;
        margin: 22px;
    }

    label {
        margin: 10px;
        background-color: light blue;
    }

    #send {
        margin-left: 10px;
    }

    #connect {
        margin-left: 180px;
        padding: 10px;
    }

    .hidden {
        display: none;
    }

    h1, 
    p {
        padding-left: 50px;
        padding-top: 20px;
    }

</style>
<div id="wrapper">
    <form id="userData" class="hidden">
        <h1>Write a name that the other user will see!</h1>
        <p>You will be paired with a random user</p>
        <input type="text" id="username" name="username" placeholder="Enter username here">
        <input type="submit" value="Connect" id="connect">
    </form>

    <form id="chat">
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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  })
