# &lt;drawing-board&gt;

A web component that represents a drawing board where the user can free hand draw.

## Methods

### `draw()`

Renders the imaging when the canvas is being actively drawn on.

### `saveCanvasImage()`

Saves one (the lates) image from the canvas in the localStorage.

### `handleBrushPicker()`

Sets the size of the brush.

### `handleColorPicker()`

Sets the color of the brush.

## Custom Events

### `savedImage`

Dispatched when an image is being saved.

#### Example

```javascript
// Get the current saved image.
const savedImage = localStorage.getItem('savedCanvasImage')
```