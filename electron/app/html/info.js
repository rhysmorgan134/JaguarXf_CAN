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

loadUrl = function(name, event) {
    window.location.href = "/" + name
};

document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
    socket.on('trip', (data) => {
        for (var k in data) {
            document.getElementById(k).innerText =  data[k].pre + ": " + data[k].val + " " + data[k].suf
        }
    })
    socket.on('temp', (data) => {
        for(var k in data) {
            document.getElementById(k).innerHTML = data[k]
        }
    })
}