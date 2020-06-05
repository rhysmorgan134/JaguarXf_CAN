var socket = io.connect('localhost:3000')
const remote = require('electron').remote;

document.getElementById("btn-min").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
     window.minimize();
});

document.getElementById("btn-close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
     window.close();
});


buttonPress = function(name, event) {
    socket.emit("action", {"type": name, "func":"pressed"})
}

buttonRel = function(name, event) {
    socket.emit("action", {"type": name, "func":"rel"})
}

loadUrl = function(name, event) {
    window.location.href = "/" + name
}

document.addEventListener("DOMContentLoaded", onDomReadyHandler);



function onDomReadyHandler(event) {
    socket.on('status', (data) => {
        //console.log('data')
        for (var k in data) {
            if (data[k] > 0) {
                //console.log("led on")
                document.getElementById(k).style.backgroundColor =  '#FF9933';
            } else {
                //console.log("led of")
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
