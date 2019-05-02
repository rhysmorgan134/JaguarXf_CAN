var can = require('socketcan');
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function() {
	console.log('connected to IoT')
	client.publish('command', 'skipForward')
})

var channel = can.createRawChannel("can0", true);

channel.addListener("onMessage", function(msg) {
	if(msg.id == 712) {
		if(msg.data[4] == 4) {
			console.log("skip forward")
		} else if (msg.data[4] == 16) {
			console.log("skip backwards")
		}

		if(msg.data[7] == 126) {
			console.log("volume down")
		} else if (msg.data[7] == 128) {
			console.log("volume up")
		}
	}
});



channel.start();
