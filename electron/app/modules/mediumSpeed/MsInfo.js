const Id126 = require('./126');
const Id384 = require('./384');
const Utils = require('./Utils');

class MsInfo {
    constructor(reverseGpio, homeGpio, nightGpio, dayGpio, exec, win) {
        this.bus = 'ms';
        this.IDs = [126, 384];
        this.data = {
            brightness: {
                rawLightResistence: 0,
                adjustedLight: 255,
                ambientRaw: 0,
                adjustedAmbient: 255,

            },
            night: 0,
            reverse: false
        };
        this.utils = new Utils(this.dataObj, dayGpio, nightGpio, exec, win);
        this.IdModules = {
            Id126: new Id126(reverseGpio, homeGpio),
            Id384: new Id384(nightGpio, dayGpio)
        }

    }

    get dataObj() {
        return this.data;
    };

    get nightValue() {
        console.log("night requested", this.data.night)
        return this.data.night;
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
                    //console.log(this.data)
                }
            }
        }
    }
}

module.exports = MsInfo;
