/**
 * A component that represents a settings app for themes.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    #wrapper {
        width: 400px;
        height: 300px;
        background-color: white;
    }
</style>
<div id="wrapper">
 
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
