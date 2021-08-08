const Id968 = require('./968');
const Id904 = require('./904');
const Id680 = require('./680');
const Id40 = require('./40');
const Id72 = require('./72');
const Id360 = require('./360');
const Utils = require('./Utils');
const EventEmitter = require('events')

class MsInfo extends EventEmitter{
    constructor(canIds, outIds, dayGpio, nightGpio, exec, win) {
        super()
        this.bus = 'ms';
        this.canIds = canIds;
        this.outIds = outIds;
        this.IDs = [968, 904, 680, 40, 360, 72];
        this.data = {
            tripInfo: {
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
                }
            },
            settings: {

            },
            mode: {
                dark: false
            },
            brightness: {
                rawLightResistence: 0,
                adjustedLight: 255,
                ambientRaw: 0,
                adjustedAmbient: 255,

            },
            climate: {
                interiorTemp: 0
            }
        };
        this.utils = new Utils(this.data.brightness, this.brightnessValues, dayGpio, nightGpio, exec, win);
        this.utils.on("Light", () => {
            this.data.mode.dark = false
        });
        this.utils.on("Dark", () => {
            this.data.mode.dark = true
        })
        this.IdModules = {
            Id968: new Id968(),
            Id904: new Id904(),
            Id680: new Id680(this.canIds, this.outIds),
            Id40: new Id40(this.utils.brightnessValues, exec),
            Id360: new Id360(),
            Id72: new Id72()
        }

    }

    runAction(id, type, value) {
        console.log("running action for msbus: ", id, type, value)
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
