var Id217 = require('./217');
var Id953 = require('./953');
var Id153 = require('./153');
var Id377 = require('./377.js');

class HsInfo {
    constructor() {
        this.bus = 'hs';
        this.IDs = [217, 953, 153, 377];
        this.data = {
            coolant: 0,
            oil: 0,
            speed: 0,
            revs: 0
        };
        this.IdModules = {
            Id217: new Id217(),
            Id953: new Id953(),
            Id153: new Id153(),
            Id377: new Id377()
        }
    }

    get dataObj() {
        return this.data;
    };

    parseMessage(message) {
        if(this.IDs.includes(message.id)) {
            let newData = this.IdModules['Id' + message.id].parseMessage(message.data);
            for (const [key, value] of Object.entries(newData)) {
                this.data[key] = value;
            }
            //console.log(this.data);
        }
    }

}

module.exports = HsInfo;
