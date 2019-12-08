var socket = io.connect('http://192.168.0.92:3000')


buttonPress = function(name, event) {
    socket.emit("action", {"type": name, "func":"pressed"})
}

buttonRel = function(name, event) {
    socket.emit("action", {"type": name, "func":"rel"})
}

document.addEventListener("DOMContentLoaded", onDomReadyHandler);



function onDomReadyHandler(event) {
    socket.on('status', (data) => {
        for (var k in data) {
            if (data[k] > 0) {
                console.log("led on")
                document.getElementById(k).style.backgroundColor =  '#FF9933';
            } else {
                console.log("led of")
                document.getElementById(k).style.backgroundColor =  '#161625';
            }
        }
        })
        socket.on('info', (data) => {
            document.getElementById('cpu').innerHTML = data.cpu + "&#x2103"
        })
        socket.on('temp', (data) => {
            for(var k in data) {
                document.getElementById(k).innerHTML = data[k]
            }
        })
    } 