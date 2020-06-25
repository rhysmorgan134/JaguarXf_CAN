class Id360 {
    constructor() {
        this.data = {
            brightness: {
                ambientRaw: 0,
                adjustedAmbient: 0
            }
        }
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        this.data.brightness.ambientRaw = arr[3];
        let amb = 255 - arr[3];
        let perc = amb / 255
        this.data.brightness.adjustedAmbient = Math.floor(perc * 100) + 150
        return this.data;
    };
}

module.exports = Id360;



