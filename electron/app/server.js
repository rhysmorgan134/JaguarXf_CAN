var express = require('express');
var app=express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var can = require('socketcan');
var fs = require("fs");
var temp = require("pi-temperature");
var Gpio = require("onoff").Gpio
var fan = new Gpio(17, 'out')
var {exec} = require('child_process');
//default array to use as the buffer to send can messages when no new changes
var def = [203, 0, 0, 0, 0, 0, 127, 127]
var tempCar = {}
var info = {}
var fanOn = fan.readSync()
//message object which is used to send can message
var msgOut = {
    'id': 712,
    'data': def

}
console.log("bringing can up res: " + JSON.stringify(exec("sudo /sbin/ip link set can0 up type can bitrate 125000")))
var brightness = 255
exec("sudo sh -c 'echo " + '"' + brightness +'"' +" > /sys/class/backlight/rpi_backlight/brightness'")

//read in config JSON files, canMap defines messages in, can out defines commands to send out
console.log(__dirname)
var canIds = fs.readFileSync(__dirname + "/resources/canMap.json")
var outIds = fs.readFileSync(__dirname + "/resources/canOut.json")

//create indicator object, this sends the status of all leds over the socket
var indicators = {}

//parse json objects
canIds = JSON.parse(canIds)
outIds = JSON.parse(outIds)
console.log(canIds)

//create can channel
var channel = can.createRawChannel("can0", true);

// create listener for all can bus messages
channel.addListener("onMessage", function(msg) {
    //check if message id = 520, hex - 0x208, this contains the statuses sent to the panel
    if(msg.id === 520) {
        
        //turn the id to string, so it can be used as the json object key
        var strId = msg.id.toString()
        
        //turn the message buffer to an array
        var arr = [...msg.data]
        
        //loop though each byte defined in the json
        for(var k in canIds[strId]) {
           // console.log(k)

            //for each byte, set the relevant object key bit to the value set in the canbus message through bitwise operation
            for(i=0;i<canIds[strId][k].length;i++) {
                    indicators[canIds[strId][parseInt(k)][i.toString()].handle] = arr[parseInt(k)] & canIds[strId][parseInt(k)][i.toString()].val
		//console.log(indicators)            
}
            // console.log(arr)
            // console.log(msg.data[k])
        }
        var passT = (arr[7] - 128) /2
        var drivT = arr[6] /2
        tempCar.passTempText = passT.toString() + '&#x2103'
        tempCar.driverTempText = drivT.toString() + '&#x2103'
    } else if (msg.id === 40) {
        var arr = [...msg.data]
        var newBrightness = arr[3]
        if (newBrightness !== brightness) {
            brightness = newBrightness        
//		console.log("new brightness is " + brightness)            
		if(brightness != 0) {
		exec("sudo sh -c 'echo " + '"' + brightness +'"' +" > /sys/class/backlight/rpi_backlight/brightness'")
    }
        }
    }
} );

//can bus channel start
channel.start()

//server start
server.listen(3000)

//serve static html
app.use(express.static(__dirname + '/html'))

//on socket connection
io.on('connection', function(client) {
    
    //on client action over socket
    client.on('action', (data) => {

        //lookup in the canout json the matching data.type ie rearHeater, get the value and the byte
        value = outIds[data.type].val
        byte = outIds[data.type].byte
        
        //check if button is pressed
        if(data.func === "pressed"){
            
            //create a copy of the defulat array
            var newD = def
            if(data.type.includes("vol") || data.type.includes("fan")) {
                newD[byte] = value
            }else {
                //turn on the defined bit of the byte
                newD[byte] |= value
            }
            //set the message out data array to the newly modified version
            msgOut.data = newD
            console.log("pressed ", newD)
        } else if(data.func === "rel") {
            //if button has been released clear the bit
            var newD = def
            if("off" in outIds[data.type]) {
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
       // channel.send(canMsg)
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
    io.emit('status',indicators);
    
    //turn the canbus array to buffer object
    out.data = new Buffer(msgOut.data)
    // console.log(msgOut)
    // console.log(def)
    
    io.emit('temp', tempCar)
    //send the canbus message, commented out for now as not tested on vehicle
    channel.send(out)
    console.log(out)
}, 100)

setInterval(() => {
    temp.measure(function(err, temp) {
        if (err) console.error(err);
        else {
            info['cpu'] = temp
        }
    });

    io.emit('info', info);
}, 500)
