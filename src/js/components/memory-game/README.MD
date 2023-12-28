# &lt;memory-game&gt;

A web component representing a memory game made [HERE](https://gitlab.lnu.se/1dv025/student/jv222th/exercises/exercise-memory-game)

Uses the flipping-tile custom component from [HERE](https://gitlab.lnu.se/1dv025/student/jv222th/exercises/exercise-flipping-tile).

## Attributes

### `grid`

The `grid` attribute controls the grid size of the board. You can set the grid to these three values:

- `grid="4"` : Creates a grid with 2x2 memory tiles.
- `grid="8"` : Creates a grid with 4x2 memory tiles.
- `grid="16"` : Creates a grid with 4x4 memory tiles.

**Usage:**

```html
<memory-game grid="4"></memory-game>
<memory-game grid="8"></memory-game>
<memory-game grid="16"></memory-game>
```

## Methods

### `shuffle()`

Shuffles the images on the tiles around.

### `endGame()`

Ends the game by removing all the tiles and showing the result.

### `buildGame()`

Builds the game board based on the `grid` attribute.