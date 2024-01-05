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
  
  <section class="theme" id="blue">
    <h2>BLUE</h2>
  </section>
  
  <section class="theme" id="green">
    <h2>GREEN</h2>
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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  })
