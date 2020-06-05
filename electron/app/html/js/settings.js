document.addEventListener("DOMContentLoaded", onDomReadyHandler);
var socket = io.connect('localhost:3000');
var firstRun = true;
function onDomReadyHandler(event) {
    socket.on('settings', (data) => {
        if(firstRun) {
            var html = []
            for (var k in data) {
                var settings = {};
                settings.friendlyName = k.replace(/_/g, " ");
                settings.id = k;
                html.push(settings);
            }
            const htmlSettings = `${html.map(setting => `
             <div class="settingsGroup">
                <p class="settingsLabel">${setting.friendlyName}</p>
                <div class="spacer" ></div>
                <label class="switch">
                    <input id="${setting.id}" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
            <hr>
        `)}`
            document.getElementById('settingsStack').innerHTML = htmlSettings;
            firstRun = false
        }
        for (var k in data) {
            document.getElementById(k).checked = data[k]
        }
    })
}
