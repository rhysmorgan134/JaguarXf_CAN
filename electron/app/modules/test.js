var HsInfo = require('./highSpeed/HsInfo.js');

const hsInfo = new HsInfo();

var can = require('socketcan');

var channel1 = can.createRawChannel("can0", true);

channel1.addListener("onMessage", function (msg) {
    hsInfo.parseMessage(msg);
});

channel1.start();