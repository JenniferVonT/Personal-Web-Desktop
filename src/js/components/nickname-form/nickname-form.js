/**
 * The nickname-form web component module.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 50px;
}
input {
    border: solid black 1px;
    text-decoration: none;
    margin-top: 30px;
}
p {
    padding: 5px;
}
</style>

<h2>Chat with random users!</h2>
<p>Write your username that other chatters will see!</p>

<form id="sendNickname" method="POST">
  <input type="text" id="nickname" autocomplete="off" placeholder="Write and press enter" autofocus />
</form>
`

customElements.define('nickname-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    /**
     * Represents the nickname.
     */
    #nickname

    /**
     * Represents the form element.
     */
    #form

    /**
     * Represents the nickname input field.
     */
    #input

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Bind the form and input element in the shadow root.
      this.#form = this.shadowRoot.querySelector('form')
      this.#input = this.shadowRoot.querySelector('#nickname')

      // Set the default nickname to anonymous.
      this.#nickname = 'anonymous'
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Set the eventlistener to save the nickname in the this.#nickname field.
      this.#form.addEventListener('submit', (event) => this.addNickname(event))
    }

    /**
     * Get the current nickname.
     *
     * @returns {string} - A string representing the player nickname.
     */
    get nickname () {
      return this.#nickname
    }

    /**
     * Sets the nickname when the submit event is fired.
     *
     * @param {SubmitEvent} event - Set off by the event.
     */
    addNickname (event) {
      event.preventDefault()

      const inputNickname = this.shadowRoot.querySelector('#nickname').value.toString()

      // Validate the input for length and some special characters for safety.
      if ((inputNickname.length !== 0 || inputNickname.lenght < 20) && !(inputNickname.includes('&') || inputNickname.includes('<'))) {
        this.#nickname = inputNickname
      }

      // Create a new 'submit' event.
      const submitEvent = new Event('submitNickname', {
        bubbles: true,
        composed: true
      })

      // And then dispatch it.
      this.dispatchEvent(submitEvent)
      // Finish by wiping the input field.
      this.#input.value = ''
    }
  })
