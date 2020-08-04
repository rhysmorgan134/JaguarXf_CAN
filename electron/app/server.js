module.exports = function(window) {
    var express = require('express');
    var app = express();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    var can = require('socketcan');
    var fs = require("fs");
    var temp = require("pi-temperature");
    var Gpio = require("onoff").Gpio;
    var bodyParser = require('body-parser');


    var fan = new Gpio(17, 'out');
    var {exec} = require('child_process');
    const power = new Gpio(3, 'in', 'rising', {debounceTimeout: 10});
    const home = new Gpio(5, 'out');
    const reverse = new Gpio(22, 'out');
    const nightGpio = new Gpio(6, 'out');
    const dayGpio = new Gpio(13, 'out');



    const changeWindowColor = (colour) => {
        console.log("changing colour to" + colour)
        window.setBackgroundColor(colour);
        // window.blur();
        // window.focus();
    }

    //read in config JSON files, canMap defines messages in, can out defines commands to send out
    // console.log(__dirname)
    // var canIds = fs.readFileSync(__dirname + "/resources/canMap.json");
    // var outIds = fs.readFileSync(__dirname + "/resources/canOut.json");
    // canIds = JSON.parse(canIds);
    // outIds = JSON.parse(outIds);

    // new class methods
    const MsInfo = require('./modules/mediumSpeed/MsInfo');
    let msInfo = new MsInfo(reverse, home, nightGpio, dayGpio, exec, changeWindowColor);
    const Kodi = require('./modules/kodi');
    let kodi = new Kodi();

    // const mainWindow = BrowserWindow.getCurrentWindow();
    window.setBackgroundColor('#EEEEEE');
    window.blur();
    window.focus();

    var info = {}

//create indicator object, this sends the status of all leds over the socket
    var indicators = {};

//create can channel
    var channel0 = can.createRawChannel("can0", true);

    channel0.setRxFilters = [{ id: 126, mask: 126}, {id:384, mask:384}];
    channel0.addListener("onMessage", function (msg) {
        msInfo.parseMessage(msg);
    });

    power.watch((err, value) => {
        exec("sudo shutdown -h now")


    });

    app.use(bodyParser());
// create listener for all can bus messages
//     channel.addListener("onMessage", function (msg) {
//         msInfo.parseMessage(msg);
//
//     });

    app.get('/theme', (req, res) => {
        res.json({theme: !(msInfo.utils.checkNight)});
    });

    app.get('/getFilms', (req, res) => {
        res.json(kodi.getFilms())
    })

    app.post('/play', function (req, res) {
        var film = req.body.film
        kodi.play(film)

    });

//can bus channel start
    channel0.start();



//serve static html
    app.use(express.static(__dirname + '/html'))

//on socket connection
    io.on('connection', function (client) {

        //on client action over socket
        client.on('action', (data) => {
         console.log('Client connected....');

    })


    setInterval(() => {
        temp.measure(function (err, temp) {
            if (err) console.error(err);
            else {
                info['cpu'] = temp
            }
        });
        io.emit('info', info);
    }, 500)

})
//server start
    server.listen(3000);
}


