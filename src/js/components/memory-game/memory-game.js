/**
 * The memory-game component.
 *
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @version 1.1.0
 */

import '../flipping-tile/'
import memoryGameStyles from './memory-game.css.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
  ${memoryGameStyles}
</style>
  <div id="startBar">
    <button id="restart">Restart</button>
    <button id="easy" class="gameModes">Easy</button>
    <button id="medium" class="gameModes">Medium</button>
    <button id="hard" class="gameModes">Hard</button>
  </div>

  <div id="welcomeText" >
    <h1>Welcome to Memory!</h1>
    <p>To start press one of the difficulty modes above!</p>
    <ul>
      <li>Easy: 2x2</li>
      <li>Medium: 4x2</li>
      <li>Hard: 4x4</li>
    </ul>
  </div>

  <div id="results" class="disappear">
    <h1>Victory!</h1>
    <p>You completed the game in <b id="tries"> <!--Amount of tries--></b> tries!</p>
    <p>It took you <b id="time"> <!--Amount of seconds--></b> seconds to complete!</p>
  </div>
  
  <div id="board">
  <!--Append all tiles-->
  </div>
`

customElements.define('memory-game',
  /**
   * Represents a memory-game element.
   */
  class extends HTMLElement {
    /**
     * Represents the game board.
     */
    #board

    /**
     * Represents if the tiles are clickable of not.
     */
    #clickable

    /**
     * Represents the amount of tries taken.
     */
    #tries

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Bind all the URL's for the images used for the front tiles.
      this.allImages = [
        '../../images/bomb.png',
        '../../images/coin.png',
        '../../images/flag.png',
        '../../images/flower.png',
        '../../images/missile.png',
        '../../images/shell.png',
        '../../images/shroom.png',
        '../../images/star.png'
      ]

      this.flippedTilesAlt = []
      this.#board = this.shadowRoot.querySelector('#board')
      this.classes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
      this.#clickable = true
      this.#tries = 0

      this.easyButton = this.shadowRoot.querySelector('#easy')
      this.mediumButton = this.shadowRoot.querySelector('#medium')
      this.hardButton = this.shadowRoot.querySelector('#hard')
      this.restartButton = this.shadowRoot.querySelector('#restart')
      this.allButtons = this.shadowRoot.querySelectorAll('.gameModes')
      this.welcomeText = this.shadowRoot.querySelector('#welcomeText')
      this.result = this.shadowRoot.querySelector('#results')
      this.start = 0

      this.restartButton.tabIndex = 0
      this.easyButton.tabIndex = 0
      this.mediumButton.tabIndex = 0
      this.hardButton.tabIndex = 0
    }

    /**
     * Called when the element is inserted into the DOM.
     */
    connectedCallback () {
      // Set up the event listener for the restart button.
      this.restartButton.addEventListener('click', () => {
        this.restartGame()
      })

      // Set up the event listener for the easy mode button with a 2x2 grid.
      this.easyButton.addEventListener('click', () => {
        this.startGame('4')
      })

      // Set up the event listener for the medium mode button with a 4x2 grid.
      this.mediumButton.addEventListener('click', () => {
        this.startGame('8')
      })

      // Set up the event listener for the hard mode button with a 4x4 grid.
      this.hardButton.addEventListener('click', () => {
        this.startGame('16')
      })
    }

    /**
     * Starts an instance of a game based on the mode picked.
     *
     * @param {string} gameMode - Decide how many tiles are created bewteen 4, 8 and 16.
     */
    startGame (gameMode) {
      this.setAttribute('grid', gameMode)
      this.buildGame()
      this.shuffle()
      this.#handleTileClicks()

      this.welcomeText.classList.add('disappear')
      this.allButtons.forEach((button) => {
        button.classList.add('hidden')
      })

      // Set up to start a timer.
      this.start = Date.now()
    }

    /**
     * Handles all the events for the individual tiles on the board.
     */
    #handleTileClicks () {
      // Attach event listeners on all tiles and set the flipped attribute when clicked.
      this.shadowRoot.querySelectorAll('flipping-tile').forEach((tile, index) => {
        // Make the tile focusable
        tile.tabIndex = 0

        tile.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' && this.#clickable && !tile.hasAttribute('flipped') && !tile.hasAttribute('disabled')) {
            tile.setAttribute('flipped', '')
            this.#tries += 1
          } else if (event.key.startsWith('Arrow')) {
            this.handleTileArrowNavigation(event.key, index)
          }
        })

        tile.addEventListener('click', () => {
          if (this.#clickable) {
            tile.setAttribute('flipped', '')
            this.#tries += 1
          }
        })

        // Listen for the custom event 'tileFlipped' to check if more than one tile is flipped over.
        tile.addEventListener('tileFlipped', (event) => {
          const { alt } = event.detail
          this.flippedTilesAlt.push(alt)

          if (this.flippedTilesAlt.length === 2) {
            this.#clickable = false
            this.#checkMatch()
          }
        })

        // Listen for when the tiles become disabled (there has been a match!)
        tile.addEventListener('disabledTile', () => {
          const allTiles = this.shadowRoot.querySelectorAll('flipping-tile')
          const areAllTilesDisabled = [...allTiles].every(tile => tile.hasAttribute('disabled'))

          if (areAllTilesDisabled) {
            this.endGame()
          }
        })
      })
    }

    /**
     * Check if the flipped tiles are a match.
     */
    #checkMatch () {
      const tiles = this.flippedTilesAlt
      const tileElements = this.shadowRoot.querySelectorAll('flipping-tile[flipped]')

      setTimeout(() => {
        if (tiles[0] === tiles[1]) {
          tileElements.forEach((tile) => {
            tile.setAttribute('disabled', '')
            tile.removeAttribute('flipped')
            tile.tabIndex = -1
          })
          this.flippedTilesAlt = []
          this.#clickable = true
        } else {
          tileElements.forEach((tile) => {
            tile.removeAttribute('flipped')
          })
          this.flippedTilesAlt = []
          this.#clickable = true
        }
      }, '1750')
    }

    /**
     * Inserts and builds the board with the tiles.
     */
    buildGame () {
      this.#shuffleData(this.allImages)
      const grid = this.getAttribute('grid')
      // Check what number that value is between 4, 8 and 16 and start building.
      if (grid === '4') {
        for (let i = 0; i < 2; i++) {
          this.#appendTiles(i)
        }
      } else if (grid === '8') {
        for (let i = 0; i < 4; i++) {
          this.#appendTiles(i)
        }
      } else if (grid === '16') {
        for (let i = 0; i < 8; i++) {
          this.#appendTiles(i)
        }
      }

      const firstTile = this.shadowRoot.querySelector('flipping-tile')
      if (firstTile) {
        firstTile.focus()
      }
    }

    /**
     * Compile the created tiles and append them to the board.
     *
     * @param {number} i - The number that decides what image URL is chosen for the tile creation.
     */
    #appendTiles (i) {
      // Create a tile and it's copy and bind them to their own constant.
      const tiles = this.#createTiles(this.allImages[i])
      const tile1 = tiles[0]
      const tile2 = tiles[1]

      // Add the first two classes in the classes array.
      tile1.classList.add(this.classes[0])
      tile2.classList.add(this.classes[1])

      // After that remove those classes that are used from the array.
      this.classes.shift()
      this.classes.shift()

      // Insert the finished tiles into the board.
      this.#board.append(tile1)
      this.#board.append(tile2)

      tile1.tabIndex = 0
      tile2.tabIndex = 0
    }

    /**
     * Creates a tile with an image slottet inside.
     *
     * @param {string} imageURL - A string representing the tile image URL.
     * @returns {Array} - An array with two equal tiles.
     */
    #createTiles (imageURL) {
      // Get the name of the file which will become the alt text in the img element.
      const imageAlt = imageURL.match(/\/([^/]+)\.[^.]+$/)
      const alt = imageAlt[1]

      // Create a tile and img element.
      const tile = document.createElement('flipping-tile')
      const tileCopy = document.createElement('flipping-tile')
      const img = document.createElement('img')
      const imgCopy = document.createElement('img')

      // Set all the attributes for the img element.
      img.setAttribute('slot', 'frontImage')
      img.setAttribute('src', imageURL)
      img.setAttribute('alt', alt)
      imgCopy.setAttribute('slot', 'frontImage')
      imgCopy.setAttribute('src', imageURL)
      imgCopy.setAttribute('alt', alt)

      tile.append(img)
      tileCopy.append(imgCopy)

      return [tile, tileCopy]
    }

    /**
     * Shuffles the images in the tiles.
     */
    shuffle () {
      const allImageElements = Array.from(this.#board.querySelectorAll('img'))
      const shuffledData = this.#shuffleData(allImageElements.map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt')
      })))

      allImageElements.forEach((img, index) => {
        img.setAttribute('src', shuffledData[index].src)
        img.setAttribute('alt', shuffledData[index].alt)
      })
    }

    /**
     * Shuffles an array of data using the Fisher-Yates algorithm.
     *
     * @param {Array} data - An array of objects representing the data to be shuffled.
     * @returns  {Array} - Shuffled array.
     */
    #shuffleData (data) {
      for (let i = data.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[data[i], data[randomIndex]] = [data[randomIndex], data[i]]
      }
      return data
    }

    /**
     * Resets the game to the start screen.
     */
    restartGame () {
      this.#board.textContent = ''
      this.start = 0

      this.welcomeText.classList.remove('disappear')
      this.allButtons.forEach((button) => {
        if (button.classList.contains('hidden')) {
          button.classList.remove('hidden')
        }
      })

      if (!this.result.classList.contains('disappear')) {
        this.result.classList.add('disappear')
      }

      this.classes = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
      this.flippedTilesAlt = []
      this.#tries = 0
    }

    /**
     * Shows the result of the game.
     */
    endGame () {
      // End the timer.
      const endTime = Math.floor((Date.now() - this.start) / 1000)

      // Bind the 'i' element with the tries and insert the result.
      const result = this.shadowRoot.querySelector('#tries')
      const resultTime = this.shadowRoot.querySelector('#time')
      const tries = parseInt(this.#tries) / 2

      result.innerHTML = `${tries}`
      resultTime.innerHTML = `${endTime}`

      // Remove all the tiles completely since they are just 'invisible'.
      this.#board.textContent = ''

      this.result.classList.remove('disappear')
    }
  }
)
