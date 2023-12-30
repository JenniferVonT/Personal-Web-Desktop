/**
 * A component that represents a drawing board.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.0.0
 */

import drawingBoardStyles from './drawing-board.css'

const template = document.createElement('template')
template.innerHTML = `
<style>
${drawingBoardStyles}
</style>
<div id="wrapper">
    <div id="picker">
        <div id="brushPicker">
            <button class="brush" id="small"></button>
            <button class="brush" id="medium"></button>
            <button class="brush" id="big"></button>
        </div>
        <div id="colorPicker">
            <button class="color" id="black"></button>
            <button class="color" id="grey"></button>
            <button class="color" id="maroon"></button>
            <button class="color" id="red"></button>
            <button class="color" id="orange"></button>
            <button class="color" id="yellow"></button>
            <button class="color" id="green"></button>
            <button class="color" id="cyan"></button>
            <button class="color" id="navy"></button>
            <button class="color" id="purple"></button>
        </div>
        <div id="eraser">
            <button class="color" id="eraserBtn"></button>
        </div>
    </div>
        <div id="canvas"></div>
</div>
`

customElements.define('drawing-board',
  /**
   * Represents a chat-app element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the element.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.canvas = this.shadowRoot.querySelector('#canvas')
      this.colors = this.shadowRoot.querySelectorAll('.color')
      this.brushes = this.shadowRoot.querySelectorAll('.brush')
      this.eraser = this.shadowRoot.querySelector('#eraserBtn')

      this.isDrawing = false
      this.context = this.canvas.getContext('2d')

      this.colors.forEach((color) => {
        color.addEventListener('click', (event) => this.handleColorPicker(event))
      })

      this.brushes.forEach((brush) => {
        brush.addEventListener('click', (event) => this.handleBrushPicker(event))
      })

      this.canvas.addEventListener('mousedown', (event) => this.startDrawing(event))
      this.canvas.addEventListener('mousemove', (event) => this.draw(event))
      this.canvas.addEventListener('mouseup', () => this.stopDrawing())
      this.canvas.addEventListener('mouseleave', () => this.stopDrawing())
    }

    /**
     * Handles the choice of brush size.
     *
     * @param {Event} event - When the button is clicked.
     */
    handleBrushPicker (event) {
      event.preventDefault()
    }

    /**
     * Handles the choice of color.
     *
     * @param {Event} event - When the button is clicked.
     */
    handleColorPicker (event) {
      event.preventDefault()
    }

    /**
     * Handles the start of the drawing.
     *
     * @param {Event} event - The mousedown action.
     */
    startDrawing (event) {}

    /**
     * Handles the active drawing action.
     *
     * @param {Event} event - The mousemove action.
     */
    draw (event) {}

    /**
     * Handles when the cursor stops drawing.
     */
    stopDrawing () {}
  })
