var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var can = require('socketcan');
var fs = require("fs");
var temp = require("pi-temperature");
var Gpio = require("onoff").Gpio

var fan = new Gpio(17, 'out')
var { exec } = require('child_process');
var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const power = new Gpio(3, 'in', 'rising', {debounceTimeout:10});
const home = new Gpio(5, 'in', 'rising', {debounceTimeout: 10});
const lights = new Gpio(22, 'out');
var serialPort = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});
const parser = serialPort.pipe(new Readline({delimiter: '\r\n'}))


//default array to use as the buffer to send can messages when no new changes
var def = [203, 0, 0, 0, 0, 0, 127, 127];
var staticAmb = 255;
var tempCar = {};
var info = {};
var tripInfo = {
    tripDistance: {
        pre: 'Distance',
        suf: 'Miles',
        val: 0
    },
    tripAvg: {
        pre: 'AVG Speed',
        suf: 'MPH',
        val: 0
    },
    tripMpg: {
        pre: 'Fuel',
        suf: 'MPG',
        val: 0
    },
    tripRange: {
        pre: 'Range',
        suf: 'Miles',
        val: 0
    },
};
//message object which is used to send can message
var msgOut = {
    'id': 712,
    'data': def

}

//console.log("bringing can up res: " + JSON.stringify(exec("sudo /sbin/ip link set can0 up type can bitrate 125000")))
var brightness = 255;
var day = true;
exec("sudo sh -c 'echo " + '"' + brightness + '"' + " > /sys/class/backlight/rpi_backlight/brightness'")

//read in config JSON files, canMap defines messages in, can out defines commands to send out
console.log(__dirname)
var canIds = fs.readFileSync(__dirname + "/resources/canMap.json")
var outIds = fs.readFileSync(__dirname + "/resources/canOut.json")

//create indicator object, this sends the status of all leds over the socket
var indicators = {};

//create settings object
var settings = {};

//parse json objects
canIds = JSON.parse(canIds)
outIds = JSON.parse(outIds)
console.log(canIds)

//create can channel
var channel = can.createRawChannel("can0", true);

//channel.setRxFilters = [{ id: 520, mask: 520 }, { id: 40, mask: 40 }, { id: 360, mask: 360 }]

parser.on('data', function (data) {
    key = parseInt(data.toString());
    console.log(data.toString());
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
})

home.watch((err, value) => {
	console.log("Home pressed");
	exec("/home/pi/Desktop/open.sh")	
})


// create listener for all can bus messages
channel.addListener("onMessage", function (msg) {
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
        tempCar.passTempText = passT.toString() + '&#x2103'
        tempCar.driverTempText = drivT.toString() + '&#x2103'
    } else if (msg.id === 40) {
        var arr = [...msg.data]
        var newBrightness = arr[3]
        if (newBrightness !== brightness) {
            brightness = newBrightness          
            if (brightness != 0) {
                var adjustedBrightness = brightness / 255
                adjustedBrightness = Math.floor((adjustedBrightness * 100) + 20)
                exec("sudo sh -c 'echo " + '"' + adjustedBrightness + '"' + " > /sys/class/backlight/rpi_backlight/brightness'")
            }
        }
    } else if (msg.id === 360) {
        if(brightness === 0) {
            var arr = [...msg.data]
            if(day) {
                lights.writeSync(1);
                lights.writeSync(0);
                day = false;
            }

            var newAmb = arr[3]
            if(staticAmb != newAmb) {
                staticAmb = newAmb
                var amb = 255 - arr[3]
                var perc = amb / 255
                var adjustedBrightness = Math.floor(perc * 100) + 150
                exec("sudo sh -c 'echo " + '"' + adjustedBrightness + '"' + " > /sys/class/backlight/rpi_backlight/brightness'")
            }
        } else {
            if(!day) {
                lights.writeSync(1);
                lights.writeSync(0);
                day = false;
            }

        }

    } else if (msg.id === 968) {
        tripInfo.tripDistance.val = msg.data.readUIntBE(5, 3) / 10.0;
        data = msg.data.readUIntBE(3, 2);
        val = data.toString(2);
        length = val.length;
        start = length -9;
        mpg = parseInt(val.slice(start, length), 2) / 10.0;
        //tripInfo.tripMpg.val = mpg
	tripInfo.tripAvg.val = mpg;
    } else if (msg.id === 904) {
        data = msg.data.readUIntBE(3, 2);
        val = data.toString(2);
        length = val.length;
        start = length -9;
        mpg = parseInt(val.slice(start, length), 2) / 10.0;
        tripInfo.tripMpg.val = mpg
    } else if (msg.id === 136) {
        data = msg.data.readUIntBE(0, 2)
        val = data.toString(2);
        length = val.length;
        start = length -9;
        mpg = parseInt(val.slice(start, length), 2);
        tripInfo.tripRange.val = mpg
    } else if (msg.id === 680) {

        //turn the id to string, so it can be used as the json object key
        var strId2 = msg.id.toString()

        //turn the message buffer to an array
        var arr2 = [...msg.data]

        //loop though each byte defined in the json
        for (var k in canIds[strId2]) {
            // console.log(k)

            //for each byte, set the relevant object key bit to the value set in the canbus message through bitwise operation
            for (i = 0; i < canIds[strId2][k].length; i++) {
                if(arr2[parseInt(k)] & canIds[strId2][parseInt(k)][i.toString()].val){
                settings[canIds[strId2][parseInt(k)][i.toString()].handle] = true;
            } else {
		settings[canIds[strId2][parseInt(k)][i.toString()].handle] = false
}
console.log(settings)
}
            // console.log(arr)
            // console.log(msg.data[k])
        }
    }
});

//can bus channel start
channel.start()

//server start
server.listen(3000)

//serve static html
app.use(express.static(__dirname + '/html'))

//on socket connection
io.on('connection', function (client) {

    //on client action over socket
    client.on('action', (data) => {

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
    io.emit('status', indicators);
    //console.log('emitting')
    io.emit('trip', tripInfo);

    // io.emit('settings', settings);
    var testSettings = {
        test_1_2: true,
        test2: true,
        test3: false,
        test4: true,
        test5: true,
        test6: true,
        test7: false,
        test8: true,
        test9: true,
        test10: true,
        test11: false,
        test12: true,
    }
    io.emit('settings', settings);

    //turn the canbus array to buffer object
    out.data = new Buffer(msgOut.data)
    // console.log(msgOut)
    // console.log(def)

    io.emit('temp', tempCar)
    //send the canbus message, commented out for now as not tested on vehicle
    //channel.send(out)
    //console.log(out)
}, 100)


setInterval(() => {
    temp.measure(function (err, temp) {
        if (err) console.error(err);
        else {
            info['cpu'] = temp
        }
    });
    io.emit('info', info);
}, 500)

