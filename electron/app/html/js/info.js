var socket = io.connect('localhost:3000')

loadUrl = function(name, event) {
    window.location.href = "/" + name
};

document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
    getHs();
    setInterval(() => {
        getHs();
    }, 300);

    socket.on('trip', (data) => {
            for (var k in data) {
                document.getElementById(k).innerText =  data[k].pre + ": " + data[k].val + " " + data[k].suf
            }
        })
    }

getHs = () => {
    fetch('http://localhost:3000/hs')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
            document.getElementById('coolant').innerHTML = data.coolant + " &#8451";
        })
        .catch(function(error) {
            console.log(error);
        });
}
