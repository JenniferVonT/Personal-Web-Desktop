const memoryGameStyles = `
flipping-tile::part(front) {
    background-color: azure;
  }

  #board {
      display: grid;
      grid-template-columns: repeat(4, min-content);
      gap: 5px;
      grid-auto-rows: minmax(100px, auto);
      justify-content: center;
  }

  .one {
      grid-column: 1;
      grid-row: 1;
  }

  .two {
      grid-column: 2;
      grid-row: 1;
  }

  .three {
      grid-column: 3;
      grid-row: 1;
  }

  .four {
      grid-column: 4;
      grid-row: 1;
  }

  .five {
      grid-column: 1;
      grid-row: 2;
  }

  .six {
      grid-column: 2;
      grid-row: 2;
  }

  .seven {
      grid-column: 3;
      grid-row: 2;
  }

  .eight {
      grid-column: 4;
      grid-row: 2;
  }

  .nine {
      grid-column: 1;
      grid-row: 3;
  }

  .ten {
      grid-column: 2;
      grid-row: 3;
  }

  .eleven {
      grid-column: 3;
      grid-row: 3;
  }

  .twelve {
      grid-column: 4;
      grid-row: 3;
  }

  .thirteen {
      grid-column: 1;
      grid-row: 4;
  }

  .fourteen {
      grid-column: 2;
      grid-row: 4;
  }

  .fifteen {
      grid-column: 3;
      grid-row: 4;
  }

  .sixteen {
      grid-column: 4;
      grid-row: 4;
  }

.hidden {
    visibility: hidden;
}

.disappear {
    display: none;
}

button {
    padding: 10px;
    margin: 5px;
    width: 80px;
    border: 2px solid black;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    background-color: #b3eaff;
    box-shadow: 4px 4px 8px 1px #868686;
}

button:hover,
button:focus {
    background-color: #7ad7fc;
    box-shadow: 1px 1px 6px 1px #868686;
}

#startBar {
    display: block;
    width: 410px;
    padding: 10px;
}

div {
    font-weight: bold;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    
}

#welcomeText ul {
    list-style: none;
}

#welcomeText {
    margin-top: 100px;
    width: 430px;
}

h1 {
    display: inline-block;
    border: 4px solid black;
    padding: 10px;
    box-shadow: 0px 10px 15px 5px #868686;
    background-color: #b3eaff;
}

p {
    font-size: 20px;
}

#tries,
#time {
    color: red;
    background-color: #b3eaff;
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    border: 2px solid red;
}

#results {
    margin-top: 100px;
}
`
export default memoryGameStyles
