const { remote } = require('electron');

document.getElementById("btn-close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
});

loadUrl = function(name, event) {
    window.location.href = "/" + name
};

document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
    //getTheme();
   // setInterval(() => {
    //    getTheme();
    //}, 300);

}


document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        remote.getCurrentWindow().toggleDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});

getTheme = () => {
    fetch('http://localhost:3000/theme')
        .then((resp) => resp.json())
        .then(function (data) {
            if(data.theme) {
                    document.documentElement.setAttribute('data-theme', 'light');
            } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
