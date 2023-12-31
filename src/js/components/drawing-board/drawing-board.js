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
            <button id="wipeAll"></button>
        </div>
    </div>
        <canvas id="canvas"></canvas>
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
      this.brushSize = 1
      this.activeColor = 'black'

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
      const buttonID = event.currentTarget.id

      if (buttonID === 'small') {
        this.brushSize = 1
      } else if (buttonID === 'medium') {
        this.brushSize = 2.5
      } else if (buttonID === 'big') {
        this.brushSize = 4.5
      }
    }

    /**
     * Handles the choice of color.
     *
     * @param {Event} event - When the button is clicked.
     */
    handleColorPicker (event) {

    }

    /**
     * Handles the start of the drawing.
     *
     * @param {Event} event - The mousedown action.
     */
    startDrawing (event) {
      this.isDrawing = true
      this.draw(event)
    }

    /**
     * Handles the active drawing action.
     *
     * @param {Event} event - The mousemove action.
     */
    draw (event) {
      if (!this.isDrawing) {
        return
      }

      // Get all the coordinates for the cursor and canvas
      const rect = this.canvas.getBoundingClientRect()
      const scaleX = this.canvas.width / rect.width
      const scaleY = this.canvas.height / rect.height

      const offsetX = (event.clientX - rect.left) * scaleX
      const offsetY = (event.clientY - rect.top) * scaleY

      this.context.fillStyle = this.activeColor
      this.context.beginPath()
      this.context.arc(offsetX, offsetY, this.brushSize, 0, 2 * Math.PI)
      this.context.fill()
    }

    /**
     * Handles when the cursor stops drawing.
     */
    stopDrawing () {
      this.isDrawing = false
    }
  })
