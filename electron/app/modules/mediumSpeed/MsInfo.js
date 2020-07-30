const Id126 = require('./126');;
//const Utils = require('./Utils');

class MsInfo {
    constructor(reverseGpio, homeGpio, exec, win) {
        this.bus = 'ms';
        this.IDs = [126];
        this.data = {
            brightness: {
                rawLightResistence: 0,
                adjustedLight: 255,
                ambientRaw: 0,
                adjustedAmbient: 255,

            },
            reverse: false
        };
        //this.utils = new Utils(this.data.brightness, this.brightnessValues, dayGpio, nightGpio, exec, win);
        this.IdModules = {
            Id126: new Id126(reverseGpio, homeGpio)
        }

    }

    get dataObj() {
        return this.data;
    };

    get brightnessValues() {
        return this.data.brightness;
    }

    parseMessage(message) {
        if(this.IDs.includes(message.id)) {
            let newData = this.IdModules['Id' + message.id].parseMessage(message.data, message.id);
            for (const [key, value] of Object.entries(newData)) {
                if(typeof value === "object") {
                    for(const [key2, value2] of Object.entries(value)) {
                        this.data[key][key2] = value2
                    }
                } else {
                    this.data[key] = value;
                }
            }
        }
    }
}

module.exports = MsInfo;
