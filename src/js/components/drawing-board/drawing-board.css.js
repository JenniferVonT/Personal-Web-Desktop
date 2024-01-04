const drawingBoardStyles = `
#wrapper {
    width: 850px;
    height: 500px;
    background-color: #c4e0f7;
}

#picker {
    display: flex;
    height: 60px;
}

#brushPicker,
#colorPicker,
#extra {
    display: flex;
    background-color: white;
    margin: 5px;
    padding: 5px
    justify-content: space-between;
}

#brushPicker button,
#colorPicker button,
#extra button {
    width: 45px;
    min-width: 48px;
    cursor: pointer;
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
}

#black {
    background-color: black;
    border: 2px solid #c4e0f7;
}

#grey {
    background-color: grey;
    border: 2px solid #c4e0f7;    
}

#maroon {
    background-color: maroon;
    border: 2px solid #c4e0f7;    
}

#red {
    background-color: red;
    border: 2px solid #c4e0f7;    
}

#orange {
    background-color: orange;
    border: 2px solid #c4e0f7;    
}

#yellow {
    background-color: yellow;
    border: 2px solid #c4e0f7;    
}

#green {
    background-color: green;
    border: 2px solid #c4e0f7;    
}

#cyan {
    background-color: cyan;
    border: 2px solid #c4e0f7;    
}

#navy {
    background-color: navy;
    border: 2px solid #c4e0f7;    
}

#purple {
    background-color: purple;
    border: 2px solid #c4e0f7;    
}

#small {
    background-color: white;
    background: linear-gradient(70deg, white 42%, black 47%, black 53%, white 58%);
    border: 2px solid #c4e0f7;
}

#medium {
    background-color: white;
    background: linear-gradient(70deg, white 35%, black 40%, black 60%, white 65%);
    border: 2px solid #c4e0f7;
}

#big {
    background-color: white;
    background: linear-gradient(70deg, white 25%, black 30%, black 70%, white 75%);
    border: 2px solid #c4e0f7;
}

#white {
    background-color: white;
    border: 2px solid #c4e0f7;
}

#wipeAll {
    background-image: url("../../../images/wipeX.png");
    background-color: white;
    border: 2px solid #c4e0f7;
}

#bucket {
    border: 2px solid #c4e0f7;
}

#setBackground {
    background-color: azure;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    border: 2px solid #c4e0f7;
}

#brushPicker button:hover {
    border: 2px solid #ffad42;  
}

#colorPicker button:hover {
    border: 2px solid #ffad42;  
}

#extra button:hover {
    border: 2px solid #ffad42;  
}
`

export default drawingBoardStyles
