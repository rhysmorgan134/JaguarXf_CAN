var socket = io.connect('http://192.168.0.88:3000')

buttonPress = function(name, event) {
    console.log(event)
}

document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
    socket.on('status', (data) => {
        for (var k in data) {
            if (data[k] === 1) {
                document.getElementById(k).style.backgroundColor =  '#FF9933';
            } else {
                document.getElementById(k).style.backgroundColor =  '#161625';
            }
        }
        })
    }