const settingsAppStyles = `
#wrapper {
    width: 400px;
    height: 400px;
    background-color: transparent;
    margin: 2px;
    margin-top: 0;
    display: grid;
}

h1 {
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    height: 25px;
}

.theme {
    text-align: center;
    margin: 1px;
}

#red {
    background-color: #fc8279;
    background: radial-gradient(circle, #000000 48%, #fc8279 100%);
    color: red;
}

#blue {
    background-color: #00eeff;
    background: linear-gradient(45deg, #000000 35%, #00edff 50%, #000000 65%);
    color: blue;
}

#green {
    background-color: #73ff40;
    background: radial-gradient(circle, #000000 35%, #73ff40 50%, #000000 65%);
    color: green;
}

#custom {
    display: block;
    text-align: center;
    padding-top: 20px;
    color: yellow;
    height: 70px;
    background-color: #ffffff;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat; 
}

#custom h2,
#custom p {
    margin: auto;
    width: max-content;
    background-color: #0000009a;
    padding: 3px;
    border-radius: 15px;
    cursor: default;
}

h2 {
    cursor: default;
}

.theme:hover {
    border: 2px solid red;
}
`
export default settingsAppStyles
