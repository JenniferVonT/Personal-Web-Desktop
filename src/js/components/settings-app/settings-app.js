/**
 * A component that represents a settings app for themes.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */
import settingsAppStyles from './settings-app.css'

const template = document.createElement('template')
template.innerHTML = `
<style>
    ${settingsAppStyles}
</style>
<div id="wrapper">

  <h1>Select a theme</h1>

  <section class="theme" id="red">
      <h2>RED</h2>
  </section>
  
  <section class="theme" id="green">
    <h2>GREEN</h2>
  </section>

  <section class="theme" id="blue">
    <h2>BLUE</h2>
  </section>

  <section class="theme" id="custom">
    <h2>CUSTOM</h2>
    <p>your latest drawing board image.</p>
  </section>
</div>
`

customElements.define('settings-app',
  /**
   * Represents a settings-app element.
   */
  class extends HTMLElement {
    /**
     * AbortController instance.
     *
     * @type {AbortController}
     */
    #abortController

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.red = this.shadowRoot.querySelector('#red')
      this.green = this.shadowRoot.querySelector('#green')
      this.blue = this.shadowRoot.querySelector('#blue')
      this.custom = this.shadowRoot.querySelector('#custom')

      // Get latest drawing board image for the custom theme.
      this.customImage = localStorage.getItem('savedCanvasImage')
      this.custom.style.backgroundImage = `url(${this.customImage})`

      this.#abortController = new AbortController()
    }

    /**
     * Called when inserted into the DOM.
     */
    connectecCallback () {
      this.red.addEventListener('click', () => this.setTheme('red'),
        { signal: this.#abortController.signal })

      this.green.addEventListener('click', () => this.setTheme('green'),
        { signal: this.#abortController.signal })

      this.blue.addEventListener('click', () => this.setTheme('blue'),
        { signal: this.#abortController.signal })

      this.custom.addEventListener('click', () => this.setTheme('custom'),
        { signal: this.#abortController.signal })
    }

    /**
     * Called when removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Handles the theme being selected.
     *
     * @param {string} theme - The theme to change to.
     */
    setTheme (theme) {}
  })
