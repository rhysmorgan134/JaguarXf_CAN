module.exports = function(window) {
    var express = require('express');
    var app = express();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    var can = require('socketcan');
    var fs = require("fs");
    var temp = require("pi-temperature");
    var Gpio = require("onoff").Gpio;
    var robot = require("robotjs");

    var {exec} = require('child_process');
    var SerialPort = require('serialport');
    const Readline = require('@serialport/parser-readline');
    const power = new Gpio(3, 'in', 'rising', {debounceTimeout: 100});
    const home = new Gpio(5, 'in', 'falling', {debounceTimeout: 100});
    const lights = new Gpio(22, 'out');
    const noLights = new Gpio(6, 'out');
    
    try {
        var serialPort = new SerialPort('/dev/SWC', {
            baudRate: 9600
        });
    } catch {
        console.log("SWC not detected")
	var serialPort = new SerialPort('/dev/ttyAMA0', {baudRate: 9600})
    }


    const changeWindowColor = (colour) => {
        console.log("changing colour to" + colour)
        //window.setBackgroundColor(colour);
        //window.blur();
        //window.focus();
    }

    //read in config JSON files, canMap defines messages in, can out defines commands to send out
    console.log(__dirname)
    var canIds = fs.readFileSync(__dirname + "/resources/canMap.json");
    var outIds = fs.readFileSync(__dirname + "/resources/canOut.json");
    canIds = JSON.parse(canIds);
    outIds = JSON.parse(outIds);

    // new class methods
    const HsInfo = require('./modules/highSpeed/HsInfo');
    let hsInfo = new HsInfo();

    const MsInfo = require('./modules/mediumSpeed/MsInfo');
    let msInfo = new MsInfo(canIds, outIds, noLights, lights, exec, changeWindowColor, robot);

    // const mainWindow = BrowserWindow.getCurrentWindow();
    //window.setBackgroundColor('#EEEEEE');
    //window.blur();
    //window.focus();

    const parser = serialPort.pipe(new Readline({delimiter: '\r\n'}))


//default array to use as the buffer to send can messages when no new changes
    var def = [203, 0, 0, 0, 0, 0, 127, 127];
    var staticAmb = 255;
    var tempCar = {};
    var info = {};

//message object which is used to send can message
    var msgOut = {
        'id': 712,
        'data': def

    }


//create indicator object, this sends the status of all leds over the socket
    var indicators = {};

//create can channel
    var channel = can.createRawChannel("can0", true);
    var channel1 = can.createRawChannel("can1", true);

//channel.setRxFilters = [{ id: 520, mask: 520 }, { id: 40, mask: 40 }, { id: 360, mask: 360 }]
    channel1.setRxFilters = [{id: 1273, mask: 1273}];
    channel1.addListener("onMessage", function (msg) {
        hsInfo.parseMessage(msg);
    });


    parser.on('data', function (data) {
        key = parseInt(data.toString());
        //console.log(typeof (key));
        if (key === 43) {
            console.log(43)
            var canMsg = {}
            canMsg.id = 712
            var tempArr = def
            tempArr[7] = 128
            canMsg.data = new Buffer(tempArr)
            channel.send(canMsg)
        } else if (key === 45) {
            console.log(45)
            var canMsg = {}
            canMsg.id = 712
            var tempArr = def
            tempArr[7] = 126
            canMsg.data = new Buffer(tempArr)
            console.log("sent")
            channel.send(canMsg)
        } else {
            console.log("none")
//	console.log(key)
        }
    });

    power.watch((err, value) => {
        exec("sudo shutdown -h now")


    });

    home.watch((err, value) => {
        robot.typeString('h');
    });


// create listener for all can bus messages
    channel.addListener("onMessage", function (msg) {
        msInfo.parseMessage(msg);
        //check if message id = 520, hex - 0x208, this contains the statuses sent to the panel
        if (msg.id === 520) {

            //turn the id to string, so it can be used as the json object key
            var strId = msg.id.toString()

            //turn the message buffer to an array
            var arr = [...msg.data]

            //loop though each byte defined in the json
            for (var k in canIds[strId]) {
                // console.log(k)

                //for each byte, set the relevant object key bit to the value set in the canbus message through bitwise operation
                for (i = 0; i < canIds[strId][k].length; i++) {
                    indicators[canIds[strId][parseInt(k)][i.toString()].handle] = arr[parseInt(k)] & canIds[strId][parseInt(k)][i.toString()].val
                    //console.log(indicators)
                }
                // console.log(arr)
                // console.log(msg.data[k])
            }
            var passT = (arr[7] - 128) / 2
            var drivT = arr[6] / 2
            tempCar.passTempText = passT
            tempCar.driverTempText = drivT
        }
    });

    app.get('/hs', (req, res) => {
        res.json(hsInfo.dataObj);
    });

    app.get('/theme', (req, res) => {
        res.json({theme: !(msInfo.utils.isNight)});
    });


//can bus channel start
    channel.start();
    channel1.start();

//server start
    server.listen(3000);

//serve static html
    app.use(express.static(__dirname + '/html'))

//on socket connection
    io.on('connection', function (client) {

        client.on('join', (data) => {
            client.join(data.room)
            io.emit('joining', data)
        })

        client.on('leave', (data) => {
            client.leave(data.room)
            io.emit('leaving', data)
        })

        client.on('newAction', (data) => {
            console.log("newaction received", data)
            if (data.bus === 'ms') {
                msInfo.runAction(data.id, data.type, data.value)
            }
        })

        //on client action over socket
        client.on('action', (data) => {
            console.log("ids are", outIds)
            console.log("data received on action", data)
            //lookup in the canout json the matching data.type ie rearHeater, get the value and the byte
            value = outIds[data.type].val
            byte = outIds[data.type].byte

            //check if button is pressed
            if (data.func === "pressed") {

                //create a copy of the defulat array
                var newD = def
                if (data.type.includes("vol") || data.type.includes("fan")) {
                    newD[byte] = value
                } else {
                    //turn on the defined bit of the byte
                    newD[byte] |= value
                }
                //set the message out data array to the newly modified version
                msgOut.data = newD
                console.log("pressed ", newD)
            } else if (data.func === "rel") {
                //if button has been released clear the bit
                var newD = def
                if ("off" in outIds[data.type]) {
                    newD[byte] = outIds[data.type].off
                } else {
                    newD[byte] &= ~value
                    msgOut.data = newD
                }

                console.log("released ", newD)
            }

            var canMsg = {}
            canMsg.id = 712
            canMsg.data = new Buffer(msgOut.data)
            channel.send(canMsg)

            // console.log(canMsg)
        })
        console.log('Client connected....');

    })


    setInterval(() => {
        //create output object for the canbus message
        var out = {}


        //set the canbus id
        out.id = 712

        //emit the indicators object over sockets to the client
        //io.emit('status', indicators);
        //console.log('emitting')
        io.to('vehicleInfo').emit('trip', Object.assign(hsInfo.dataObj, msInfo.dataObj.tripInfo));

        // io.emit('settings', settings);
        io.to('climate').emit('climate', Object.assign(msInfo.dataObj.climate, tempCar));
        io.to('climate').emit('climate', indicators)

        io.to('settings').emit('settings', msInfo.dataObj.settings);

        //turn the canbus array to buffer object
        out.data = new Buffer(msgOut.data)
        // console.log(msgOut)
        // console.log(def)

        io.to('climate').emit('temp', tempCar)
        //send the canbus message, commented out for now as not tested on vehicle
        //channel.send(out)
        //console.log(out)
    }, 100)


    setInterval(() => {
        temp.measure(function (err, temp) {
            if (err) console.error("temperature read error", err);
            else {
                info['cpu'] = temp
            }
        });
        io.emit('info', info);
    }, 500)

}

