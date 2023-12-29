const chatAppStyles = `
#wrapper {
    display: flex;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    width: 450px;
    height: 450px;
}

#chatWindow {
    width: 430px;
    height: 300px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
    background-color: white;
}

#message {
    font-size: 18px;
    width: 425px;
    height: 80px;
    margin-left: 10px;
    resize: none;
}

#username {
    width: 400px;
    margin: 22px;
}

label {
    margin: 10px;
    background-color: light blue;
}

#send {
    margin-left: 10px;
}

#connect {
    margin-left: 180px;
    padding: 10px;
}

.hidden {
    display: none;
}

h1, 
p {
    text-align: center;
    margin-top: 50px;
}
`

export default chatAppStyles
