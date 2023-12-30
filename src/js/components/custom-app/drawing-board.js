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
            <button class="color" id="crimson"></button>
            <button class="color" id="red"></button>
            <button class="color" id="orange"></button>
            <button class="color" id="yellow"></button>
            <button class="color" id="green"></button>
            <button class="color" id="blue"></button>
            <button class="color" id="navy"></button>
            <button class="color" id="purple"></button>
        </div>
        <div id="canvas"></div>
    </div>
</div>
`

customElements.define('chat-app',
  /**
   * Represents a chat-app element.
   */
  class extends HTMLElement {})
