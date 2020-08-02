class Id384 {
    constructor(nightGpio, dayGpio) {
        this.data = {
            night: false
        };
    }

    parseMessage = (message, Id) => {
        let arr = [...message];
        let lights = arr[4] & 16;
        if(lights !== this.data.night) {
            this.data.night = lights
        }
        return this.data;
    };
}

module.exports = Id384;



