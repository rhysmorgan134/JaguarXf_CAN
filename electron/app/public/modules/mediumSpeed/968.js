class Id968 {
    constructor() {
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
                }
            }
        }
    }

    parseMessage = (message, Id) => {
        this.data.tripInfo.tripDistance.val = message.readUIntBE(5, 3) / 10.0;
        let mpgData = message.readUIntBE(3, 2);
        let val = mpgData.toString(2);
        let length = val.length;
        let start = length - 9;
        this.data.tripInfo.tripAvg.val = parseInt(val.slice(start, length), 2) / 10.0 + 10;
        return this.data;
    };
}

module.exports = Id968;



