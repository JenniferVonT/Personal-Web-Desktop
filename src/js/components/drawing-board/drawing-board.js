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
        <div id="extra">
            <button class="color" id="white"></button>
            <button id="wipeAll"></button>
            <button id="setBackground">Set as back- ground</button>
        </div>
    </div>
        <canvas id="canvas" width="840px" height="435px"></canvas>
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
      this.wipe = this.shadowRoot.querySelector('#wipeAll')
      this.background = this.shadowRoot.querySelector('#setBackground')
      this.canvasImageDataURL = ''

      this.isDrawing = false
      this.context = this.canvas.getContext('2d')
      this.brushSize = 2.5
      this.activeColor = 'black'

      this.colors.forEach((color) => {
        color.addEventListener('click', (event) => this.handleColorPicker(event))
      })

      this.brushes.forEach((brush) => {
        brush.addEventListener('click', (event) => this.handleBrushPicker(event))
      })

      this.wipe.addEventListener('click', () => { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) })

      this.background.addEventListener('click', () => this.saveCanvasImage())

      this.canvas.addEventListener('mousedown', (event) => this.startDrawing(event))
      this.canvas.addEventListener('mousemove', (event) => this.draw(event))
      this.canvas.addEventListener('mouseup', () => this.stopDrawing())
      this.canvas.addEventListener('mouseleave', () => this.stopDrawing())
    }

    /**
     * Saves the latest image in localStorage (only one) and dispatch an event that a new image is saved.
     */
    saveCanvasImage () {
      this.canvasImageDataURL = this.canvas.toDataURL()
      localStorage.setItem('savedCanvasImage', this.canvasImageDataURL)

      this.dispatchEvent(new CustomEvent('savedImage', {
        bubbles: true
      }))
    }

    /**
     * Handles the choice of brush size.
     *
     * @param {Event} event - When the button is clicked.
     */
    handleBrushPicker (event) {
      const buttonID = event.currentTarget.id

      if (buttonID === 'small') {
        this.brushSize = 2.5
      } else if (buttonID === 'medium') {
        this.brushSize = 6
      } else if (buttonID === 'big') {
        this.brushSize = 10
      }
    }

    /**
     * Handles the choice of color.
     *
     * @param {Event} event - When the button is clicked.
     */
    handleColorPicker (event) {
      const buttonID = event.currentTarget.id

      this.activeColor = buttonID
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

      // Get all the coordinates for the cursor and canvas.
      const rect = this.canvas.getBoundingClientRect()
      const scaleX = this.canvas.width / rect.width
      const scaleY = this.canvas.height / rect.height
      const offsetX = (event.clientX - rect.left) * scaleX
      const offsetY = (event.clientY - rect.top) * scaleY

      // Set the colors and brush size on the canvas.
      this.context.strokeStyle = this.activeColor
      this.context.lineWidth = this.brushSize * 2
      this.context.lineCap = 'round'
      this.context.lineJoin = 'round'

      // See if the cursor has jumped a significant amount (shows that the drawing has stopped and continued after)
      // If not make a line between the points that are made to make the drawing smoother.
      if (this.lastX !== undefined && this.lastY !== undefined) {
        this.context.beginPath()
        this.context.moveTo(this.lastX, this.lastY)
        this.context.lineTo(offsetX, offsetY)
        this.context.stroke()
      }

      // Continously save the coordinates to check if the cursor has "jumped".
      this.lastX = offsetX
      this.lastY = offsetY
    }

    /**
     * Handles when the cursor stops drawing.
     */
    stopDrawing () {
      this.isDrawing = false

      // When the drawing stops, set the "coordinates" for the cursor as undefined.
      this.lastX = undefined
      this.lastY = undefined
    }
  })
