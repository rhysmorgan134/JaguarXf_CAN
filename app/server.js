var express = require('express');
var app=express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var can = require(socketcan);


server.listen(3000)

app.use(express.static('html'))

io.on('connection', function(client) {
    console.log('Client connected....');

})

// app.get('/',function(req,res)
// {
//     res.send('Hello World!');
// });
heater = 0
defrost = 1
setInterval(() => {
    io.emit('status',{'frontHeater': heater, 'defrost':defrost});
    if (heater === 1) {
        heater =0
    } else {
        heater = 1
    }
    if (defrost === 1) {
        defrost = 0
    } else {
        defrost = 1
    }
}, 500)

// var server=app.listen(3000,function() {
//     console.log("server started")
// });