const drawingBoardStyles = `
#wrapper {
    width: 880px;
    height: 500px;
    background-color: #c4e0f7;
}

#picker {
    display: flex;
    height: 60px;
    width: 100%;
}

#brushPicker,
#colorPicker,
#extra {
    display: flex;
    background-color: transparent;
    margin: 5px;
    padding: 5px
    justify-content: space-between;
}

#brushPicker button,
#colorPicker button,
#extra button {
    width: 45px;
    cursor: pointer;
}

#brushPicker button {
    border: 2px solid black;
}

#brushPicker button,
#colorPicker button {
    border-radius: 50px;
    box-shadow: 2px 2px 5px 0px;
}

canvas {
    display: block;
    margin-left: 5px;
    background-color: white;
}

button {
    width: 100%;
    height: 100%;
    padding: 0;
    margin-left: 3px;
    border: 1px solid transparent;
}

#black {
    background-color: black;
}

#grey {
    background-color: grey;
}

#maroon {
    background-color: maroon; 
}

#red {
    background-color: red;    
}

#orange {
    background-color: orange;   
}

#yellow {
    background-color: yellow;
}

#green {
    background-color: green;   
}

#cyan {
    background-color: cyan;
}

#navy {
    background-color: navy;   
}

#purple {
    background-color: purple;  
}

#white {
    background-color: white;
}

#small {
    background: linear-gradient(70deg, white 42%, black 47%, black 53%, white 58%);
}

#medium {
    background: linear-gradient(70deg, white 35%, black 40%, black 60%, white 65%);
}

#big {
    background: linear-gradient(70deg, white 25%, black 30%, black 70%, white 75%);
}

#wipeAll {
    background-image: url("../../../images/wipeX.png");
    background-color: white;
    background-position: center;
    border: 2px solid white;
}

input[type="color"] {
    border: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 0;
}

#extra #setBackground {
    background-color: azure;
    width: min-content;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    font-size: 12px;
}

#brushPicker button:hover,
#colorPicker button:hover,
#extra button:hover {
    border: 2px solid #ffad42;  
}
`

export default drawingBoardStyles
