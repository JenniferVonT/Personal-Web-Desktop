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
      grid-column: 1;
      grid-row: 2;
  }

  .three {
      grid-column: 2;
      grid-row: 1;
  }

  .four {
      grid-column: 2;
      grid-row: 2;
  }

  .five {
      grid-column: 3;
      grid-row: 1;
  }

  .six {
      grid-column: 4;
      grid-row: 1;
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
      grid-column: 1;
      grid-row: 4;
  }

  .eleven {
      grid-column: 2;
      grid-row: 3;
  }

  .twelve {
      grid-column: 2;
      grid-row: 4;
  }

  .thirteen {
      grid-column: 3;
      grid-row: 3;
  }

  .fourteen {
      grid-column: 3;
      grid-row: 4;
  }

  .fifteen {
      grid-column: 4;
      grid-row: 3;
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
    padding: 10px;
    margin: 10px;
}

div {
    font-weight: bold;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    
}

#welcomeText ul {
    list-style: none;
}

h1 {
    text-decoration: underline;
}

p {
    font-size: 20px;
}

#tries,
#time {
    text-decoration: underline;
    color: red;
}
`
export default memoryGameStyles
