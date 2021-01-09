class Id904 {
    constructor(canIds) {
        this.data = {
            tripInfo: {
                tripMpg: {
                    pre: 'AVG Speed',
                    suf: 'MPH',
                    val: 0
                }
            }
        }
    }

    parseMessage = (message, Id) => {
        let mpgData = message.readUIntBE(3, 2);
        let val = mpgData.toString(2);
        let length = val.length;
        let start = length - 9;
        this.data.tripInfo.tripMpg.val = parseInt(val.slice(start, length), 2) / 10.0 + 10;
        //tripInfo.tripMpg.val = mpg
        return this.data;
    };
}

module.exports = Id904;



