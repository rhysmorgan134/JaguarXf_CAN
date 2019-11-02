var socket = io.connect('http://localhost:3000')

buttonPress = function(name, event) {
    socket.emit("action", {"type": name, "func":"pressed"})
}

buttonRel = function(name, event) {
    socket.emit("action", {"type": name, "func":"rel"})
}

document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
    socket.on('status', (data) => {
        console.log(data)
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
    }