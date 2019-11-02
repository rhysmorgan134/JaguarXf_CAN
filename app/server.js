var express = require('express');
var app=express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var can = require('socketcan');
var fs = require("fs");


//default array to use as the buffer to send can messages when no new changes
var def = [203, 0, 0, 0, 0, 0, 127, 127]

//message object which is used to send can message
var msgOut = {
    'id': '2c8',
    'data': def

}

//read in config JSON files, canMap defines messages in, can out defines commands to send out
var canIds = fs.readFileSync("./resources/canMap.json")
var outIds = fs.readFileSync("./resources/canOut.json")

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
            console.log(k)

            //for each byte, set the relevant object key bit to the value set in the canbus message through bitwise operation
            for(i=0;i<canIds[strId][k].length;i++) {
                    indicators[canIds[strId][parseInt(k)][i.toString()].handle] = arr[parseInt(k)] & canIds[strId][parseInt(k)][i.toString()].val
		console.log(indicators)            
}
            
            // console.log(arr)
            // console.log(msg.data[k])
        }
    }
} );

//can bus channel start
channel.start()

//server start
server.listen(3000)

//serve static html
app.use(express.static('html'))

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

            //turn on the defined bit of the byte
            newD[byte] |= value

            //set the message out data array to the newly modified version
            msgOut.data = newD
            console.log("pressed ", newD)
        } else if(data.func === "rel") {
            //if button has been released clear the bit
            var newD = def
            newD[byte] &= ~value
            msgOut.data = newD
            console.log("released ", newD)
        }
    })
    console.log('Client connected....');

})


setInterval(() => {
    //create output object for the canbus message
    var out = {}

    //set the canbus id
    out.id = msgOut.id

    //emit the indicators object over sockets to the client
    io.emit('status',indicators);

    //turn the canbus array to buffer object
    out.data = new Buffer(msgOut.data)
    // console.log(msgOut)
    // console.log(def)

    //send the canbus message, commented out for now as not tested on vehicle
//    channel.send(out)
    // console.log(out)
}, 100)
