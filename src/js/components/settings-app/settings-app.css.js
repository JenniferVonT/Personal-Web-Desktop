const settingsAppStyles = `
#wrapper {
    width: 400px;
    height: 100%;
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
    background-color: black;
    color: white;
}
`
export default settingsAppStyles
