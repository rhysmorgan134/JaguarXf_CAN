var socket = io.connect('localhost:3000')
const remote = require('electron').remote;

function onDomReadyHandler(event) {
    socket.on('trip', (data) => {

        document.getElementById('cpu').innerHTML = data.cpu + "&#x2103"
    })
    socket.on('temp', (data) => {
        for(var k in data) {
            document.getElementById(k).innerHTML = data[k]
        }
    })
}