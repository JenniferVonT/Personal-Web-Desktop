# &lt;settings-app&gt;

A web component representing a settings window for themes.

## Methods

### `setTheme(theme)`

A method that dispatches a custom event based on chosen theme and sends the theme name.

#### Parameters

`theme` - the selected theme name.

## Custom Events

| Event Name | Fired When |
|------------|------------|
|`newThemeSet`|One of the themes are clicked/chosen|

## Example

```html
<settings-app></settings-app>
```