/**
 * The flippable tile component.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
  :host {
    display: inline-block;
    vertical-align: top;
    transform-style: preserve-3d;
    transition: transform 2s ease;
  }

  :host([flipped]) {
    transform: scaleX(-1)
  }

  :host([flipped]) #frontSide {
    box-shadow: 0px 0px 5px 4px gray;
  }

  :host([inactive]) #frontSide {
    transform: scale(0.95);
    border: 2px dashed;
  }

  :host([disabled]) div {
    visibility: hidden;
  }
  

  div {
    width: 120px;
    height: 140px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center; 
    border: 2px solid black;
    border-radius: 5%;
    margin: 5px;
    overflow: hidden;
    transition: transform 0.5s ease;
  }

  #backSide:hover,
  #backSide:focus {
    transform: scale(1.05);
  }

  #backSide {
    background-image: url("../../images/lnu-symbol.png");
    background-color: yellow;
  }

  img,
  ::slotted(img) {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    display: block;
  }

  .hidden {
    display: none;
  }

</style>

<div id="frontSide" part="front" class="hidden">
  <slot name="frontImage"></slot>
</div>

<div id="backSide" part="back"></div>
`

customElements.define('flipping-tile',
  /**
   * Represents a flipping-tile element
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.frontTile = this.shadowRoot.querySelector('#frontSide')
      this.backTile = this.shadowRoot.querySelector('#backSide')
    }

    /**
     * Observe if the attribute flipped is changed.
     *
     * @returns {Array} - an array containing a string representing the attribute 'flipped', 'inactive' or 'disabled'.
     */
    static get observedAttributes () {
      return ['flipped', 'disabled']
    }

    /**
     * Calls the flip method if it is the 'flipped' attribute being added to the component.
     *
     * @param {string} name - the name of the attribute to check.
     */
    attributeChangedCallback (name) {
      if (name === 'flipped') {
        this.flip()

        const alt = this.querySelector('img').getAttribute('alt')
        this.dispatchEvent(new CustomEvent('tileFlipped', {
          bubbles: true,
          composed: true,
          detail: { alt }
        }))
      }

      if (name === 'disabled') {
        this.dispatchEvent(new CustomEvent('disabledTile', {
          bubbles: true
        }))
      }
    }

    /**
     * Called after the element is removed from the DOM.
     */
    disconnectedCallback () {
      if (this.backTile.classList.contains('hidden')) {
        this.backTile.classList.remove('hidden')
      }
      if (this.hasAttribute('inactive')) {
        this.removeAttribute('inactive')
      }
      if (this.hasAttribute('disabled')) {
        this.removeAttribute('disabled')
      }
      if (!this.frontTile.classList.contains('hidden')) {
        this.frontTile.classList.add('hidden')
      }
    }

    /**
     * Method that 'flips' the card, showing the front instead of the back with a slight delay to match the rotating motion.
     */
    flip () {
      setTimeout(() => {
        this.backTile.classList.toggle('hidden')
        this.frontTile.classList.toggle('hidden')
      }, '500')

      setTimeout(() => {
        if (!this.frontTile.classList.contains('hidden')) {
          this.setAttribute('inactive', '')
        } else if (!this.backTile.classList.contains('hidden')) {
          this.removeAttribute('inactive')
        }
      }, '1500')
    }
  }
)
