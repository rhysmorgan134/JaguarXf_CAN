const remote = require('electron').remote;

document.getElementById("btn-close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
});

loadUrl = function(name, event) {
    window.location.href = "/" + name
}